'use client';

import { useState, useEffect } from 'react';

export type SpeechStatus = 'idle' | 'loading' | 'speaking';

type Listener = (id: string | null, status: SpeechStatus) => void;
type UnsupportedListener = (reason?: string) => void;

const unsupportedListeners = new Set<UnsupportedListener>();

export const onVoiceUnsupported = (fn: UnsupportedListener) => {
  unsupportedListeners.add(fn);
  return () => {
    unsupportedListeners.delete(fn);
  };
};

export const triggerVoiceUnsupported = (reason?: string) => {
  unsupportedListeners.forEach((fn) => fn(reason));
};

class VoiceManager {
  private activeId: string | null = null;
  private status: SpeechStatus = 'idle';
  private listeners: Set<Listener> = new Set();
  private loadTimeout: ReturnType<typeof setTimeout> | null = null;
  private keepAliveInterval: ReturnType<typeof setInterval> | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      this.voices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
      };
    } catch {
      // Ignorar restricciones en entornos aislados
    }
  }

  public isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      'SpeechSynthesisUtterance' in window &&
      window.speechSynthesis !== null
    );
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.activeId, this.status);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(id: string | null, status: SpeechStatus) {
    this.activeId = id;
    this.status = status;
    this.listeners.forEach((l) => l(id, status));
  }

  public getStatus(id: string): SpeechStatus {
    return this.activeId === id ? this.status : 'idle';
  }

  public stop() {
    if (this.loadTimeout) {
      clearTimeout(this.loadTimeout);
      this.loadTimeout = null;
    }
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
    if (this.isSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        console.error(e);
      }
    }
    this.notify(null, 'idle');
  }

  public speak(id: string, text: string, onUnsupported?: (reason?: string) => void) {
    // Si ya está reproduciendo o cargando este mismo ID, pausar/detener
    if (this.activeId === id && this.status !== 'idle') {
      this.stop();
      return;
    }

    // Detener cualquier mensaje que estuviera sonando previamente
    this.stop();

    if (!this.isSupported()) {
      if (onUnsupported) onUnsupported('unsupported_browser');
      triggerVoiceUnsupported('unsupported_browser');
      return;
    }

    // Entrar inmediatamente en estado de carga ('loading')
    // Esto muestra el spinner animado en el parlante mientras Android prepara el motor de voz
    this.notify(id, 'loading');

    try {
      // Descongelar pipeline de síntesis en Android Chrome si quedó pausado
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);

      // Selección de la voz más adecuada en español
      if (!this.voices || this.voices.length === 0) {
        this.voices = window.speechSynthesis.getVoices();
      }

      const spanishVoice = this.voices.find((v) => {
        const lang = v.lang.toLowerCase();
        return lang.startsWith('es') || lang.includes('spanish');
      });

      if (spanishVoice) {
        utterance.voice = spanishVoice;
        utterance.lang = spanishVoice.lang;
      } else {
        utterance.lang = 'es-ES';
      }

      utterance.rate = 0.93;
      utterance.pitch = 1.0;

      // Timeout de seguridad: si el motor de voz de Android no inicia tras 7 segundos
      this.loadTimeout = setTimeout(() => {
        if (this.activeId === id && this.status === 'loading') {
          this.stop();
          if (onUnsupported) onUnsupported('timeout');
          triggerVoiceUnsupported('timeout');
        }
      }, 7000);

      utterance.onstart = () => {
        if (this.loadTimeout) {
          clearTimeout(this.loadTimeout);
          this.loadTimeout = null;
        }
        this.notify(id, 'speaking');

        // Keep-alive para Android Chrome (evita que el motor pause narraciones largas)
        this.keepAliveInterval = setInterval(() => {
          if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
          }
        }, 7000);
      };

      utterance.onend = () => {
        if (this.keepAliveInterval) {
          clearInterval(this.keepAliveInterval);
          this.keepAliveInterval = null;
        }
        if (this.activeId === id) {
          this.notify(null, 'idle');
        }
      };

      utterance.onerror = (event) => {
        if (this.loadTimeout) {
          clearTimeout(this.loadTimeout);
          this.loadTimeout = null;
        }
        if (this.keepAliveInterval) {
          clearInterval(this.keepAliveInterval);
          this.keepAliveInterval = null;
        }

        const errType = event?.error;
        // Si fue una cancelación voluntaria por parte del usuario, no mostrar modal de error
        if (errType === 'canceled' || errType === 'interrupted') {
          if (this.activeId === id) {
            this.notify(null, 'idle');
          }
          return;
        }

        console.warn('Speech synthesis error on device:', errType);
        this.stop();
        if (onUnsupported) onUnsupported(errType || 'synthesis_error');
        triggerVoiceUnsupported(errType || 'synthesis_error');
      };

      // Disparar síntesis y forzar resume inmediato en Android
      window.speechSynthesis.speak(utterance);
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (err: any) {
      console.error('Error starting speech synthesis:', err);
      this.stop();
      if (onUnsupported) onUnsupported(err?.message || 'exception');
      triggerVoiceUnsupported(err?.message || 'exception');
    }
  }
}

export const voiceManager = new VoiceManager();

/**
 * Hook para sincronizar el estado del icono del parlante con el motor de voz
 */
export const useVoiceStatus = (id: string): SpeechStatus => {
  const [status, setStatus] = useState<SpeechStatus>(voiceManager.getStatus(id));

  useEffect(() => {
    const unsub = voiceManager.subscribe((activeId, currentStatus) => {
      setStatus(activeId === id ? currentStatus : 'idle');
    });
    return unsub;
  }, [id]);

  return status;
};

