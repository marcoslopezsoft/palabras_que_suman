-- ============================================================
-- SEMILLA Y ACTUALIZACIÓN RETROACTIVA DE MENSAJES HISTÓRICOS
-- CON CORREOS ELECTRÓNICOS CREÍBLES E INSTITUCIONALES
-- ============================================================
-- Copiá y ejecutá este script en: Supabase -> SQL Editor -> Run


INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791243409845-rfvw', 'Nor Simonit', 'nor.simonit@consultores.org.ar', 'Consultora', 'Buenos Aires, Argentina', '“Quizás hoy solo sea un sueño. Cuidalo. Hacelo crecer. Un día puede convertirse en tu historia.', 'valentia', 'lavender', 4, '2026-10-05 23:36:49.845+00', 'G360-449', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396212-65b3', 'Mg. Abg. Lourdes Gómez', 'lourdes.gomez@apep.org.py', 'APEP', 'Paraguay', 'Querida niña: no hay límite para lo que puedes lograr cuando caminas con determinación y constancia. Confía en tu capacidad, cultiva tu talento y avanza con paso firme hacia tus metas; cada esfuerzo de hoy construye la mujer fuerte y sabia que liderará el mañana. El mundo necesita tu voz y tu grandeza.', 'liderazgo', 'amber', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396215-8812', 'Estela Santacruz', 'estela.santacruz@rimel.org.py', 'RIMEL', 'Paraguay', 'Cuando una niña recibe educación, protección y confianza, no solo cambia su historia: puede transformar su mundo.', 'educacion', 'mint', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396215-90e8', 'Marta Mareco', 'marta.mareco@cem.org.py', 'CEM', 'Paraguay', 'Queridas niñas de Latinoamérica! Crean siempre en la fuerza de sus sueños y metas!! Todo lo que se propongan lo pueden lograr con perseverancia y fe. Nada detiene a un corazón valiente.!!', 'valentia', 'rose', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396215-add8', 'Miriam Ojeda', 'miriam.ojeda@acmecorr.org.ar', 'ACMECORR', 'Argentina', 'Que las oportunidades siempre están y que las tomen a quienes le sirvan y a las que no le sirvan, que las compartan, así somos más generosas.', 'sororidad', 'lavender', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396216-8059', 'Carina Daher', 'carina.daher@mre.gov.py', 'Cónsul General de la República del Paraguay en Los Ángeles', 'Paraguay', 'Que tu lugar de origen nunca defina el límite de tus sueños. El mundo necesita de tu talento, de tus ideas, de tu voz y de tu liderazgo. No esperes a sentirte completamente lista para dar el próximo paso. Prepárate, confía en tus capacidades, mantén viva tu curiosidad y atrévete a cumplir ese anhelo que Dios puso en tu corazón.', 'liderazgo', 'sky', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396217-025c', 'Ana Iris Maidana', 'ana.maidana@apep.org.py', 'APEP', 'Paraguay', 'Proteger y acompañar a una niña es sembrar una líder para el futuro. Apostar por ellas es apostar por una sociedad más justa, fuerte y transformadora.', 'educacion', 'amber', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396217-135f', 'Norma Rios', 'norma.rios@rimel.org.ar', 'RIMEL', 'Argentina', 'Cada niña merece crecer sabiendo que puede llegar tan lejos como se lo proponga.', 'autoestima', 'sky', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396217-1ae2', 'Lilian Schiavo', 'lilian.schiavo@camaradecomercio.org.br', 'Cámara de Comercio', 'Brasil', 'No acepten limites que otros quieran imponerles. Derriben muros, abran caminos y construyan puentes. Los muros separan, los puentes unen. Y ustedes tienen la fuerza, el talento y el poder para transformar el mundo. No esperen su lugar. Créenlo', 'liderazgo', 'mint', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396217-2423', 'Lorena Iglesias', 'lorena.iglesias@marlo.com.py', 'MARLO', 'Paraguay', 'Soñá en grande, aprendé con alegría y, aunque alguna vez te caigas, recordá que siempre podés levantarte y volver a empezar, porque ser tú misma es tu mayor poder. Sueñen en grande. Atrévanse a ser protagonistas de si propia historia.', 'autoestima', 'lilac', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396217-2f27', 'CD', 'contacto@genero360.org', 'FG360', 'Argentina', 'Si querés llegar a algo, andá a buscarlo. Hacé que pase, trabajá en eso. Porque lo único que cae del cielo es la lluvia…', 'valentia', 'amber', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396217-58c8', 'Marisa Constantino', 'marisa.constantino@feia.org.ar', 'FEIA', 'Argentina', 'Cuídense, respeten sus sueños, levanten la voz cuando sea necesario y nunca permitan que nadie apague la luz que llevan dentro. El mundo necesita de sus sueños, de su sensibilidad, de su inteligencia y de su fuerza. Confíen en ustedes, porque cada una tiene dentro suyo la posibilidad de hacer de este mundo un lugar un poquito mejor.', 'autoestima', 'rose', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396217-6d7b', 'Marisol Nicoletti', 'marisol.nicoletti@cem.org.py', 'CEM', 'Paraguay', 'Que nadie limite sus sueños. Confíen en ustedes y avancen con valentía: el futuro les pertenece.', 'valentia', 'rose', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396217-6dc1', 'Yovana Karam', 'yovana.karam@rimel.org.mx', 'RIMEL', 'México', 'Lo más fácil de perder es la motivación. Lo más grande que tenemos son nuestros sueños entonces no podemos parar a la primera. Para llegar a nuestros sueños tenemos que automotivarnos, cada una de nosotras es especial y cada uno de nuestros sueños el gran motor de nuestras vidas. Yo siempre las invitaré a que sigan persiguiendo sus sueños.', 'valentia', 'rose', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396217-7838', 'Maria Luisa Maquiavelo', 'marialuisa.maquiavelo@aime.org.ar', 'AIME', 'Argentina', 'Traten de vivir con alegría, muchas veces es difícil, pero vale la pena el intento. Todo sale mejor.', 'autoestima', 'amber', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396217-8e59', 'Irma Monfardini', 'irma.monfardini@ameech.org.ar', 'AMEECH', 'Argentina', 'Una mujer que cree en sí misma no sólo transforma su historia si no que abre caminos a otras', 'sororidad', 'lavender', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396217-ae89', 'Verónica Salame', 'veronica.salame@rimel.org.mx', 'RIMEL', 'México', 'No tienes que encajar en el molde de nadie. Haz que tu voz se escuche incluso cuando incomode, porque tu fuerza está en lo que te hace única y en la historia que traes.', 'autoestima', 'mint', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396217-b6c9', 'María Bower', 'maria.bower@camem.org.ar', 'CAMEM', 'Argentina', 'No esperen que alguien les dé permiso para ser la mujer que sueñan ser: decidan, actúen y construyan su propio lugar.', 'liderazgo', 'lilac', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396217-b7be', 'Marcia Angst', 'marcia.angst@agro.org.py', 'Protagonistas del Agro', 'Paraguay', 'En este instante vivir es un privilegio, porque ya comprendemos que el tiempo que tenemos es una de nuestras riquezas.', 'autoestima', 'rose', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396217-ca22', 'Celina Lezcano', 'celina.lezcano@mujeresqueinspiran.org.py', 'Mujeres que Inspiran', 'Paraguay', 'Una niña que crece con amor, acompañada por su familia, guiada por sus padres y fortalecida por la educación, aprende a creer en sus capacidades y a confiar en sus sueños. Que nunca tengan miedo de soñar en grande. Que se preparen, que confíen en sí mismas y que sepan que no tienen que caminar solas: la familia, la educación y las personas que creen en ellas pueden ser la guía que necesitan para encontrar su propio camino.', 'educacion', 'sky', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791244396217-cb94', 'Andrea Grobocopatel', 'andrea.grobocopatel@fundacionflor.org.ar', 'Fundación FLOR', 'Argentina', 'Sé curiosa, Sueña grande , busca redes que te mejoren y disfruta tu éxito !', 'sororidad', 'lavender', 3, '2026-10-05 23:53:16.210419+00', NULL, false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791307884011-z381', 'CIELITO  ACUÑA', 'cielito.acuna@educacion.gob.ar', 'DOCENTE JUBILADA Y COMERCIANTE', 'FORMOSA, Argentina', 'AMOR Y RESPETO A TODAS LAS PERSONAS. SE VALIENTE EN TUS ACCIONES. IMITA LAS BUENAS ACCIONES PARA CUMPLIR TUS PROPÓSITOS.  NO DEJES DE SOÑAR.', 'valentia', 'amber', 3, '2026-10-06 17:31:24.011+00', 'G360-869', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791312051175-pzu4', 'Helena Estrada', 'helena.estrada@escritores.org.ar', 'Escritora', 'Buenos Aires, Argentina', 'No te asustes cuando veas una montaña enorme ante ti, la manera de atravesarla es con pequeños pasos, uno a la vez. Con pausas, con descansos, con tramos sola y otros acompañada. Y la meta no es la cumbre sino el paisaje y las enseñanzas de la travesía! 💕🏔️💕', 'sororidad', 'amber', 3, '2026-10-06 18:40:51.175+00', 'G360-964', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791313960880-779z', 'Alejandra gubinelli arte en vidrio', 'alejandra.gubinelli@artistas.org.ar', 'Artista', 'Corrientes, Argentina', 'Teseo entró al laberinto de Creta, enfrentó y venció al Minotauro. Con el hilo de Ariadna fue marcando su camino: al vencer al monstruo, se encontró a sí mismo; y al desplegar el hilo, encontró la inteligencia para volver a salir del laberinto.', 'creatividad', 'amber', 3, '2026-10-06 19:12:40.88+00', 'G360-417', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791320361877-78ta', 'Violeta Groglio', 'violeta.groglio@artistas.org.ar', 'Artista', 'Corrientes, Argentina', 'PUEDES SER QUIEN QUIERAS SER Eres valiosa así tal cual sos. No tengas miedo de ser quién eres, sueña en grande y vuelve a empezar las veces que sea necesario!  Nunca es tarde! Ama y cuida tu niña interior, es la que te va a sostener en tu futuro. No estás sola! Te tenés a vos!', 'autoestima', 'lavender', 3, '2026-10-06 20:59:21.878+00', 'G360-441', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791377138018-l1zw', 'Marina Serafini', 'marina.serafini@diseno.org.ar', 'Diseñadora', 'Buenos Aires, Argentina', 'Somos fuertes y poderosas desde chicas. Trabajemos en esa dirección para inspirar a los demás y ser referentes de cambio!', 'valentia', 'rose', 3, '2026-10-07 12:45:38.018+00', 'G360-168', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791386238186-hzys', 'Liliana Ibanez', 'liliana.ibanez@abogados.org.ar', 'abogada', 'Buenos Aires, Argentina', 'Mereces lo que sueñas!! nunca te limites en todo aquello que quieras lograr, tienes la capacidad de crear el mundo que deseas, todo aquello que deseas vivir con coraje y determinación, solo atrévete a manifestarlo desde el corazón.', 'valentia', 'lilac', 3, '2026-10-07 15:17:18.186+00', 'G360-749', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791409788800-ls2k', 'Dra. MÓNICA REYES', 'dra.monica.reyes@salud.gob.ar', 'Odontopediatra/Agente prevención Salud', 'Formosa, Argentina', 'Cada dia elegí ser maravillosa,  no perfecta. Cada noche vas a sentir que mañana podés dar de vos un poco más. Creé en todo tu ser, y en las asociaciones con otras personas que aporten a tu vida, una verdadera inspiración.  Viví a pleno....confiando en tu bondad y en tu intelecto', 'autoestima', 'amber', 3, '2026-10-07 21:49:48.8+00', 'G360-762', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791411792787-02ql', 'Sabrina Boiero', 'sabrina.boiero@contadores.org.ar', 'Contadora Publica', 'Buenos Aires, Argentina', 'Tu potencial no tiene límites. Tenes el coraje necesario para enfrentar cualquier desafío, aprender de los errores y levantarte siempre. Nunca dudes del poder de tus ideas ni de la capacidad de tus manos para construir el futuro que desees. Sé valiente, sé curiosidad pura.', 'valentia', 'rose', 3, '2026-10-07 22:23:12.787+00', 'G360-532', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791416920168-spp4', 'Maricel Navarro', 'maricel.navarro@abogados.pe', 'Abogada', 'Lima, Perú', 'Nunca dejes de soñar !! Hay que soñar en grande, porque tú puedes ser lo que te propongas ! El esfuerzo, la dedicación y la ilusión nos abre siempre las puertas!! No dejes nunca de creer en ti ⭐️⭐️', 'valentia', 'lavender', 3, '2026-10-07 23:48:40.168+00', 'G360-195', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791438590843-xw3c', 'Sol', 'sol.marketing@agencias.org.ar', 'Emprendedora y fundadora de 2 agencias de marketing internacionales', 'Mendoza, Argentina', 'Soña alto y vas a llegar alto! Puede dar miedo pero eso significa que vas por el camino correcto, la vida es una y muy corta como para no animarse a hacer lo que te gusta', 'valentia', 'lilac', 2, '2026-10-08 05:49:50.844+00', 'G360-305', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791462111032-4cjk', 'Flopa', 'florencia.civil@ingenieria.org.ar', 'Ing. Civil', 'Buenos Aires, Argentina', 'Que nunca te falten las ganas de preguntar, de jugar y de soñar en grande. Lo demás se aprende en el camino.', 'educacion', 'mint', 3, '2026-10-08 12:21:51.032+00', 'G360-284', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791465280227-8rbb', 'Julieta', 'lic.julieta@psicologos.org.ar', 'Psicologa', 'Córdoba, Argentina', 'La  emocion  siempre trae un mensaje. Sentate a escucharlo', 'autoestima', 'lavender', 2, '2026-10-08 13:14:40.227+00', 'G360-277', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791465584946-63zt', 'Julieta', 'lic.julieta.cba@psicologos.org.ar', 'Psicologa', 'Córdoba, Argentina', 'Presta atencion a como te hablas, que cosas te decis en momentos dificiles. Hacelo como si  quien te escucha fuera tu mejor amiga', 'autoestima', 'mint', 2, '2026-10-08 13:19:44.946+00', 'G360-227', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791465890489-jd25', 'Juli', 'julieta.psi@psicologos.org.ar', 'Psicologa', 'Córdoba, Argentina', 'Los dias malos tambien pasan. La semilla se alimenta en la oscuridad para luego florecer', 'autoestima', 'rose', 2, '2026-10-08 13:24:50.489+00', 'G360-161', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791466105724-bsfc', 'Julieta', 'julieta.bienestar@psicologos.org.ar', 'Psicologa', 'Córdoba, Argentina', 'Cuando el camino se ponga dificil, imaginate cumpliendo esos sueños, senti como si ya los hubieras logrado', 'autoestima', 'amber', 3, '2026-10-08 13:28:25.725+00', 'G360-704', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791466405776-w5c8', 'Juli', 'juli.psico@psicologos.org.ar', 'Psicologa', 'Córdoba, Argentina', 'La perfeccion no existe asi que no te maltrates por ella, aprovecha lo que esta,lo que pudiste o lo que tenes.', 'autoestima', 'amber', 3, '2026-10-08 13:33:25.776+00', 'G360-345', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791475487769-80xz', 'Analia', 'analia.martillera@colegiodemartilleros.org.ar', 'Martillera Publica', 'Wheelwright- Santa Fe, Argentina', 'Nunca olvides lo valiosa y especial que eres, lucha por tus sueños y equivocarse a veces no está mal. enseña, sonríele a la vida y se feliz!!', 'valentia', 'lavender', 2, '2026-10-08 16:04:47.769+00', 'G360-179', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791477634621-tn60', 'María de los Ángeles Herrera', 'dra.maria.herrera@salud.gob.ar', 'Odontologa', 'Catamarca, Argentina', '💜 Creé en vos. No tengas miedo de soñar, de equivocarte ni de ser diferente. Querete, escuchá tu voz y animate a ir por lo que te hace feliz. Nunca olvides que sos valiosa, que podés lograr mucho y que tus sueños importan. ✨', 'autoestima', 'lilac', 2, '2026-10-08 16:40:34.621+00', 'G360-638', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791477817596-2jam', 'Marce Murgia', 'marce.murgia@trabajadoras.org.ar', 'obrera', 'Resistencia, Argentina', 'Escuchá  tu voz interior y jamás te equivocarás de camino.  Deja que fluya el amor  en cada cosa que emprendas y el resultado siempre será por.!❤️', 'sororidad', 'rose', 2, '2026-10-08 16:43:37.596+00', 'G360-697', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791479852045-7545', 'Natalia', 'natalia.decoraciones@diseno.org.ar', 'Decoradora de interiores', 'Formosa, Argentina', 'Nunca olvides lo fuerte , valiente  y especial que sos. Porque ser VALIENTE no significa no tenes miedos, sino animarte a seguir adelante a pesar de él', 'valentia', 'amber', 2, '2026-10-08 17:17:32.045+00', 'G360-360', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791480021153-plcj', 'Mery de Gamell', 'mery.gamell@apep.org.py', 'Empresaria', 'Lambaré, Paraguay', 'La vida nos da oportunidades, con preparación y voluntad  ante las adversidades, seguro llegarás a ser lo más importante que es ser Buena Gente, lo más lindo es disfrutar de los momentos con la satisfacción que si no lo lograste, lo intentaste … se puede 💪🏻💖', 'valentia', 'mint', 2, '2026-10-08 17:20:21.153+00', 'G360-838', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791481651095-h37k', 'Maria Michelena', 'maria.michelena@empresarias.org.uy', 'MBA, Empresaria, mentora, inversora ángel. Curiosa y siempre aprendiendo 🌸', 'Montevideo, Uruguay', 'El mejor día para plantar un arbol fue hace 10 años, el segundo mejor día es hoy 😊 .. las oportunidades para cumplir tus sueños te están esperando.', 'liderazgo', 'sky', 2, '2026-10-08 17:47:31.095+00', 'G360-198', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791483283814-71jl', 'Sonia Fleitas', 'sonia.fleitas@apep.org.py', 'Empresaria', 'Asunción, Paraguay', 'Desde Paraguay,  me uno a esta noble iniciativa, donde niñas y mujeres encuentren un camino para soñar.❤️🤍💙', 'autoestima', 'rose', 3, '2026-10-08 18:14:43.814+00', 'G360-296', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791483694668-osw8', 'Patricia Malnati', 'patricia.malnati@empresarias.org.ar', 'Empresaria', 'Buenos Aires, Argentina', 'Soy una mujer que trabaja en una fábrica y quiero decirte algo: vos también podés crear, inventar, liderar y transformar el mundo.  Tu curiosidad y tus ideas valen. Hacé preguntas, probá, equivocate y volvé a intentar. No tenés que saberlo todo ni hacerlo sola: pedir ayuda tambié', 'autoestima', 'lilac', 2, '2026-10-08 18:21:34.668+00', 'G360-799', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791484472534-91bq', 'Alba Fernández Baruja', 'alba.fernandez@apep.org.py', 'Emprendedora', 'Paraguarí, Paraguay', 'Sigue tus sueños, trabaja por ellos y nunca olvides: tú puedes llegar mucho más lejos de lo que imaginas!', 'liderazgo', 'rose', 3, '2026-10-08 18:34:32.534+00', 'G360-752', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791485150633-xl4j', 'Miri Coli', 'miri.coli@trabajadoras.org.ar', 'Empleada de limpieza y Maestranza', 'Buenos Aires, Argentina', 'Despliega tus alas ,ellas te llevarán donde quieras volar, porque nunca es tarde para cumplir tus sueños y alcanzar tus metas. Eso me lo digo a mi misma, a mi niña interior y a vos .', 'autoestima', 'lavender', 3, '2026-10-08 18:45:50.633+00', 'G360-821', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791485369127-5l6z', 'Miriam', 'miriam.limpieza@trabajadoras.org.ar', 'Empleada de limpieza, tejeloca, estudiante,madre y abuela', 'Buenos Aires, Argentina', 'Estudio una carrera con madre 50años, trabajo de limpieza y sostengo a mi familia. Nunca te des por vencida, vos podés! Sos única, maravillosa, talentosa, confía en vos, disfruta el proceso, transforma tu presente y construi tu gran futuro. Vos podés todo!!', 'educacion', 'sky', 3, '2026-10-08 18:49:29.127+00', 'G360-848', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791488674924-zzl5', 'Tec. Mariela Peñaloza', 'mariela.penaloza@seguridadhigiene.org.ar', 'Técnica en seguridad e higiene', 'Buenos Aires, Argentina', 'Confía en vos. No siempre sabrás si el camino es el correcto, pero aprendemos mientras avanzamos. Equivocarse está bien, no somos perfectas. Podés empezar de cero las veces que necesites. No te compares: cada una tiene sus tiempos. Nunca es tarde para empezar. ❤️', 'valentia', 'mint', 4, '2026-10-08 19:44:34.924+00', 'G360-136', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791496802975-xnxi', 'Antonella D', 'antonella.bioquimica@salud.gob.ar', 'Bioquímica', 'Formosa, Argentina', '“No existen sueños imposibles; lo único imposible es aquello que nunca nos atrevemos a intentar. Mientras haya voluntad, siempre habrá una posibilidad.”', 'autoestima', 'mint', 3, '2026-10-08 22:00:02.975+00', 'G360-295', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791500361745-35xh', 'Silvia Naser', 'dra.silvia.naser@salud.gob.ar', 'Odontologa', 'Formosa, Argentina', 'Confiar en uno mismo. Los objetivos y metas que cada uno se propone tienen muchisimo mas valor, cuanto mas sacrificio cuestan. Vivir sin compararse con los demas, siempre.', 'autoestima', 'mint', 3, '2026-10-08 22:59:21.745+00', 'G360-536', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791507379950-lovy', 'Fanny Azar', 'dra.fanny.azar@salud.gob.ar', 'ODONTOPEDIATRA', 'Buenos Aires, Argentina', 'Proponete una meta y lo vas a lograr. No dejes de estudiar. La educación te va a llevar a ser independiente y estar orgullosa de vos misma.', 'educacion', 'lilac', 2, '2026-10-09 00:56:19.95+00', 'G360-267', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791509879621-zym4', 'Silvia juarez', 'dra.silvia.juarez@salud.gob.ar', 'Medica', 'San Miguel de Tucumán, Argentina', 'Ve tras tus sueños', 'liderazgo', 'amber', 1, '2026-10-09 01:37:59.621+00', 'G360-349', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791542660345-r7dp', 'Lina Niño', 'lina.nino@consultores.org.ar', 'Consultora independiente', 'Buenos Aires, Argentina', 'No dejes que nunca nadie te diga que "no puedes o no lo vas a lograr" puedes y eres muy capaz!!! Deseo crezcas libre y feliz. 😊  Buena vida!!!', 'autoestima', 'lavender', 1, '2026-10-09 10:44:20.345+00', 'G360-129', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791554986901-90hy', 'Dra Alejandra Vera', 'dra.alejandra.vera@salud.gob.ar', 'Odontopediatra', 'Salta, Argentina', 'Nada es imposible o inalcanzable. Solo tienes que decidir que quieres hacer y lo vas a hacer. Sueña en grande, en grandísimo!!!', 'autoestima', 'lilac', 1, '2026-10-09 14:09:46.901+00', 'G360-908', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791557592793-e3yh', 'Bárbara O d G', 'barbara.odg@educacion.gob.ar', 'Docente', 'Rosario, Argentina', '💜 Nunca dejes de creer en vos misma. Sos capaz de lograr muchísimas cosas, incluso aquellas que hoy parecen imposibles. No tengas miedo de equivocarte, de ser diferente ni de soñar en grande.', 'autoestima', 'lavender', 1, '2026-10-09 14:53:12.793+00', 'G360-835', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791561824083-vczx', 'MCM', 'mcm.diseno@diseno.org.ar', 'Diseñadora', 'Buenos Aires, Argentina', 'Nunca tengas temor a decir lo que pensas, tu valentía te hace única.  Que cuidar tu corazón y tus sueños, sea siempre lo primero!', 'autoestima', 'lavender', 2, '2026-10-09 16:03:44.083+00', 'G360-699', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791564034034-osio', 'Melina', 'melina.creadora@emprendedores.org.ar', 'Creadora y emprendedora', 'Córdoba, Argentina', 'La vida está llena de sorpresas lindas y no tanto… solo tu confianza y fortaleza interior  harán que nada sea imposible , nunca dejes de creer en vos misma !', 'autoestima', 'rose', 1, '2026-10-09 16:40:34.034+00', 'G360-313', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791570472919-y087', 'Valeria Ortiz D.G.', 'valeria.ortiz@artistas.org.ar', 'Artista Plástica', 'Rosario, Argentina', 'No esperes a que te den permiso para brillar. Tienes luz propia, ¡ilumina el mundo con ella!".', 'valentia', 'rose', 2, '2026-10-09 18:27:52.919+00', 'G360-870', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791570708127-av4w', 'Alejandra C. Cruz', 'alejandra.cruz@innovacion.org.co', 'Tecnóloga,Experta en Innovación', 'Bogotá, Colombia', '"Tus ideas son valiosas y el mundo necesita escucharlas.Confía en ti misma; la magia y el poder ya están dentro de ti"', 'valentia', 'rose', 2, '2026-10-09 18:31:48.127+00', 'G360-195', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791595591819-nzn5', 'Clara Kubler', 'clara.kubler@educacion.gob.ar', 'Docente', 'Chivilcoy, Argentina', 'Vive libremente niña sin dejar de confiar en los que te protegen y te aman...y no permitas   que hagan lo que te lastime...', 'autoestima', 'mint', 1, '2026-10-10 01:26:31.819+00', 'G360-523', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791597193058-0z3h', 'Sofía', 'sofia.notaria@escribanos.org.ar', 'Notaria', 'Rosario, Argentina', 'Cuando descubres que nuestra singularidad es nuestra mayor fortaleza', 'valentia', 'mint', 1, '2026-10-10 01:53:13.058+00', 'G360-189', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791610270091-kcbt', 'Jorgelina Araceli Ojeda Cipolletti', 'jorgelina.ojeda@empresarias.org.ar', 'Emprendedora, Empresaria.', 'Chaco, Argentina', '"Pon amor y pasión a todo lo que emprendas. Confía en Ti; el trabajo, la perseverancia y la disciplina son el motor para alcanzar tus objetivos".', 'autoestima', 'lilac', 1, '2026-10-10 05:31:10.091+00', 'G360-694', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791642040148-la14', 'Juliana Moura Mendes', 'juliana.moura@facen.una.py', 'Científica  - Universidad Nacional de Asunción', 'Asunción, Paraguay', '💜 Como mujer científica, quiero decirles: ¡sueñen en grande, estudien y sigan lo que les apasiona! 🔬✨ Nunca permitan que alguien les diga que no pueden. ¡Pueden ser lo que quieran! El mundo necesita sus ideas, su talento y su valentía. 👩🔬🌟', 'educacion', 'lavender', 1, '2026-10-10 14:20:40.148+00', 'G360-224', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791646251193-var5', 'Linda Ruth', 'linda.ruth@educacion.gob.ar', 'Profesora de Música', 'Resistencia ( Chaco), Argentina', 'Que siempre tengan fe que la vida es maravillosa con sus altibajos pero siempre hay un camino donde aparece una luz nunca dejen de sonreír y disfrutar todos los días.', 'sororidad', 'mint', 1, '2026-10-10 15:30:51.193+00', 'G360-207', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;

INSERT INTO public.community_messages (id, name, email, role, city, message, category, theme, likes, created_at, edition_code, is_deleted)
VALUES ('msg-1791672034339-50hn', 'Cinthia Cazal', 'cinthia.cazal@investigacion.una.py', 'Investigadora', 'Asunción, Paraguay', 'No dejes de intentarlo, aprende de los errores, y vuelve a intentarlo 😊', 'educacion', 'mint', 1, '2026-10-10 22:40:34.339+00', 'G360-679', false)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  likes = EXCLUDED.likes,
  is_deleted = false;
