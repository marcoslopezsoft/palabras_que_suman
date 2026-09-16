import { NextResponse } from 'next/server';
import { City, Country } from 'country-state-city';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countryCode = searchParams.get('countryCode');

  if (!countryCode) {
    return NextResponse.json({ error: 'countryCode is required' }, { status: 400 });
  }

  try {
    const rawCities = City.getCitiesOfCountry(countryCode.toUpperCase()) || [];
    // Deduplicate and extract unique names
    const cityNames = Array.from(new Set(rawCities.map((c) => c.name))).sort((a, b) =>
      a.localeCompare(b, 'es')
    );
    return NextResponse.json(cityNames);
  } catch (err) {
    console.error('Error fetching cities:', err);
    return NextResponse.json([]);
  }
}

