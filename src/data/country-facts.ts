/**
 * General-knowledge facts for the country pages (double-click the scrollbar ribbon). Values are
 * language-neutral or have a Hungarian version; the labels are translated in the i18n files.
 * Populations are rounded recent estimates.
 */
export type FactKey =
  | 'capital' | 'currency' | 'population' | 'area' | 'language' | 'highest' | 'calling' | 'drives' | 'tld'
  | 'length' | 'source' | 'mouth' | 'countries' | 'depth'
  | 'diameter' | 'distance' | 'gravity' | 'day' | 'year' | 'moons' | 'temp' | 'landing' | 'age' | 'planets' | 'mass' | 'light';

export interface Fact {
  k: FactKey;
  v: string;
  hu?: string;
}

export interface CountryFacts {
  /** flag file names in /flags (ISO alpha-2) */
  flags: string[];
  facts: Fact[];
  fun: { en: string; hu: string };
}

const right: Fact = { k: 'drives', v: 'right' };
const left: Fact = { k: 'drives', v: 'left' };

export const COUNTRY_FACTS: Record<string, CountryFacts> = {
  chile: {
    flags: ['cl'],
    facts: [
      { k: 'capital', v: 'Santiago' },
      { k: 'currency', v: 'Chilean peso (CLP)', hu: 'chilei peso (CLP)' },
      { k: 'population', v: '≈ 20 million', hu: '≈ 20 millió' },
      { k: 'area', v: '756,102 km²', hu: '756 102 km²' },
      { k: 'language', v: 'Spanish', hu: 'spanyol' },
      { k: 'highest', v: 'Ojos del Salado, 6,893 m', hu: 'Ojos del Salado, 6893 m' },
      { k: 'calling', v: '+56' },
      right,
      { k: 'tld', v: '.cl' },
    ],
    fun: {
      en: 'About 4,300 km long but on average only about 177 km wide – and the Atacama is one of the driest places on Earth.',
      hu: 'Nagyjából 4300 km hosszú, de átlagosan csak kb. 177 km széles – az Atacama pedig a Föld egyik legszárazabb helye.',
    },
  },
  argentina: {
    flags: ['ar'],
    facts: [
      { k: 'capital', v: 'Buenos Aires' },
      { k: 'currency', v: 'Argentine peso (ARS)', hu: 'argentin peso (ARS)' },
      { k: 'population', v: '≈ 46 million', hu: '≈ 46 millió' },
      { k: 'area', v: '2,780,400 km²', hu: '2 780 400 km²' },
      { k: 'language', v: 'Spanish', hu: 'spanyol' },
      { k: 'highest', v: 'Aconcagua, 6,961 m', hu: 'Aconcagua, 6961 m' },
      { k: 'calling', v: '+54' },
      right,
      { k: 'tld', v: '.ar' },
    ],
    fun: {
      en: 'Aconcagua is the highest mountain outside Asia, and Argentina is the eighth-largest country in the world.',
      hu: 'Az Aconcagua Ázsián kívül a legmagasabb hegy, Argentína pedig a világ nyolcadik legnagyobb országa.',
    },
  },
  brazil: {
    flags: ['br'],
    facts: [
      { k: 'capital', v: 'Brasília' },
      { k: 'currency', v: 'Brazilian real (BRL)', hu: 'brazil real (BRL)' },
      { k: 'population', v: '≈ 212 million', hu: '≈ 212 millió' },
      { k: 'area', v: '8,515,767 km²', hu: '8 515 767 km²' },
      { k: 'language', v: 'Portuguese', hu: 'portugál' },
      { k: 'highest', v: 'Pico da Neblina, 2,995 m', hu: 'Pico da Neblina, 2995 m' },
      { k: 'calling', v: '+55' },
      right,
      { k: 'tld', v: '.br' },
    ],
    fun: {
      en: 'Brazil borders every South American country except Chile and Ecuador.',
      hu: 'Brazília Chile és Ecuador kivételével minden dél-amerikai országgal határos.',
    },
  },
  hungary: {
    flags: ['hu'],
    facts: [
      { k: 'capital', v: 'Budapest' },
      { k: 'currency', v: 'Hungarian forint (HUF)', hu: 'forint (HUF)' },
      { k: 'population', v: '≈ 9.6 million', hu: '≈ 9,6 millió' },
      { k: 'area', v: '93,030 km²', hu: '93 030 km²' },
      { k: 'language', v: 'Hungarian', hu: 'magyar' },
      { k: 'highest', v: 'Kékes, 1,014 m', hu: 'Kékes, 1014 m' },
      { k: 'calling', v: '+36' },
      right,
      { k: 'tld', v: '.hu' },
    ],
    fun: {
      en: 'Lake Hévíz is the largest thermal lake in the world where you can swim.',
      hu: 'A Hévízi-tó a világ legnagyobb fürdésre alkalmas termálvizű tava.',
    },
  },
  georgia: {
    flags: ['ge'],
    facts: [
      { k: 'capital', v: 'Tbilisi', hu: 'Tbiliszi' },
      { k: 'currency', v: 'Georgian lari (GEL)', hu: 'grúz lari (GEL)' },
      { k: 'population', v: '≈ 3.7 million', hu: '≈ 3,7 millió' },
      { k: 'area', v: '69,700 km²', hu: '69 700 km²' },
      { k: 'language', v: 'Georgian', hu: 'grúz' },
      { k: 'highest', v: 'Shkhara, ≈ 5,200 m', hu: 'Shkhara, ≈ 5200 m' },
      { k: 'calling', v: '+995' },
      right,
      { k: 'tld', v: '.ge' },
    ],
    fun: {
      en: 'Georgia has one of the oldest wine-making traditions: about 8,000 years, in clay jars called qvevri.',
      hu: 'Grúziában az egyik legősibb a borkészítés: kb. 8000 éve készítenek bort a qvevrinek nevezett agyagedényekben.',
    },
  },
  sweden: {
    flags: ['se'],
    facts: [
      { k: 'capital', v: 'Stockholm' },
      { k: 'currency', v: 'Swedish krona (SEK)', hu: 'svéd korona (SEK)' },
      { k: 'population', v: '≈ 10.6 million', hu: '≈ 10,6 millió' },
      { k: 'area', v: '450,295 km²', hu: '450 295 km²' },
      { k: 'language', v: 'Swedish', hu: 'svéd' },
      { k: 'highest', v: 'Kebnekaise, ≈ 2,100 m', hu: 'Kebnekaise, ≈ 2100 m' },
      { k: 'calling', v: '+46' },
      right,
      { k: 'tld', v: '.se' },
    ],
    fun: {
      en: 'On 3 September 1967 ("Dagen H") the whole country switched from driving on the left to driving on the right.',
      hu: '1967. szeptember 3-án („Dagen H”) az egész ország átállt a bal oldali közlekedésről a jobb oldalira.',
    },
  },
  norway: {
    flags: ['no'],
    facts: [
      { k: 'capital', v: 'Oslo' },
      { k: 'currency', v: 'Norwegian krone (NOK)', hu: 'norvég korona (NOK)' },
      { k: 'population', v: '≈ 5.6 million', hu: '≈ 5,6 millió' },
      { k: 'area', v: '385,207 km²', hu: '385 207 km²' },
      { k: 'language', v: 'Norwegian', hu: 'norvég' },
      { k: 'highest', v: 'Galdhøpiggen, 2,469 m', hu: 'Galdhøpiggen, 2469 m' },
      { k: 'calling', v: '+47' },
      right,
      { k: 'tld', v: '.no' },
    ],
    fun: {
      en: 'With all its fjords and islands, the Norwegian coastline is roughly 100,000 km long.',
      hu: 'A fjordokkal és szigetekkel együtt Norvégia partvonala nagyjából 100 000 km hosszú.',
    },
  },
  portugal: {
    flags: ['pt'],
    facts: [
      { k: 'capital', v: 'Lisbon', hu: 'Lisszabon' },
      { k: 'currency', v: 'Euro (EUR)', hu: 'euró (EUR)' },
      { k: 'population', v: '≈ 10.6 million', hu: '≈ 10,6 millió' },
      { k: 'area', v: '92,212 km²', hu: '92 212 km²' },
      { k: 'language', v: 'Portuguese', hu: 'portugál' },
      { k: 'highest', v: 'Mount Pico (Azores), 2,351 m', hu: 'Pico-hegy (Azori-szigetek), 2351 m' },
      { k: 'calling', v: '+351' },
      right,
      { k: 'tld', v: '.pt' },
    ],
    fun: {
      en: 'Cabo da Roca is the westernmost point of mainland Europe.',
      hu: 'A Cabo da Roca a szárazföldi Európa legnyugatibb pontja.',
    },
  },
  mozambique: {
    flags: ['mz'],
    facts: [
      { k: 'capital', v: 'Maputo' },
      { k: 'currency', v: 'Mozambican metical (MZN)', hu: 'mozambiki metical (MZN)' },
      { k: 'population', v: '≈ 34 million', hu: '≈ 34 millió' },
      { k: 'area', v: '801,590 km²', hu: '801 590 km²' },
      { k: 'language', v: 'Portuguese', hu: 'portugál' },
      { k: 'highest', v: 'Monte Binga, 2,436 m', hu: 'Monte Binga, 2436 m' },
      { k: 'calling', v: '+258' },
      left,
      { k: 'tld', v: '.mz' },
    ],
    fun: {
      en: 'Its flag is the only national flag with a modern rifle on it.',
      hu: 'Az egyetlen nemzeti zászló, amelyen egy modern puska látható.',
    },
  },
  mexico: {
    flags: ['mx'],
    facts: [
      { k: 'capital', v: 'Mexico City', hu: 'Mexikóváros' },
      { k: 'currency', v: 'Mexican peso (MXN)', hu: 'mexikói peso (MXN)' },
      { k: 'population', v: '≈ 130 million', hu: '≈ 130 millió' },
      { k: 'area', v: '1,964,375 km²', hu: '1 964 375 km²' },
      { k: 'language', v: 'Spanish + 68 indigenous languages', hu: 'spanyol + 68 őshonos nyelv' },
      { k: 'highest', v: 'Pico de Orizaba, 5,636 m', hu: 'Pico de Orizaba, 5636 m' },
      { k: 'calling', v: '+52' },
      right,
      { k: 'tld', v: '.mx' },
    ],
    fun: {
      en: 'Mexico City is built on an old lake bed and parts of it sink by several centimetres a year.',
      hu: 'Mexikóváros egy egykori tó medrére épült, egyes részei évente több centit süllyednek.',
    },
  },
  japan: {
    flags: ['jp'],
    facts: [
      { k: 'capital', v: 'Tokyo', hu: 'Tokió' },
      { k: 'currency', v: 'Japanese yen (JPY)', hu: 'japán jen (JPY)' },
      { k: 'population', v: '≈ 124 million', hu: '≈ 124 millió' },
      { k: 'area', v: '377,975 km²', hu: '377 975 km²' },
      { k: 'language', v: 'Japanese', hu: 'japán' },
      { k: 'highest', v: 'Mount Fuji, 3,776 m', hu: 'Fudzsi, 3776 m' },
      { k: 'calling', v: '+81' },
      left,
      { k: 'tld', v: '.jp' },
    ],
    fun: {
      en: 'A 2023 recount found more than 14,000 islands in Japan – twice as many as the old count.',
      hu: 'Egy 2023-as újraszámlálás több mint 14 000 szigetet talált Japánban – kétszer annyit, mint a régi adat.',
    },
  },
  vietnam: {
    flags: ['vn'],
    facts: [
      { k: 'capital', v: 'Hanoi' },
      { k: 'currency', v: 'Vietnamese đồng (VND)', hu: 'vietnámi đồng (VND)' },
      { k: 'population', v: '≈ 101 million', hu: '≈ 101 millió' },
      { k: 'area', v: '≈ 331,000 km²', hu: '≈ 331 000 km²' },
      { k: 'language', v: 'Vietnamese', hu: 'vietnámi' },
      { k: 'highest', v: 'Fansipan, 3,143 m', hu: 'Fanszipan, 3143 m' },
      { k: 'calling', v: '+84' },
      right,
      { k: 'tld', v: '.vn' },
    ],
    fun: {
      en: 'Vietnam is the world’s second-largest coffee producer, after Brazil.',
      hu: 'Vietnám a világ második legnagyobb kávétermelője Brazília után.',
    },
  },
  newzealand: {
    flags: ['nz'],
    facts: [
      { k: 'capital', v: 'Wellington' },
      { k: 'currency', v: 'New Zealand dollar (NZD)', hu: 'új-zélandi dollár (NZD)' },
      { k: 'population', v: '≈ 5.3 million', hu: '≈ 5,3 millió' },
      { k: 'area', v: '268,021 km²', hu: '268 021 km²' },
      { k: 'language', v: 'English, Māori, NZ Sign Language', hu: 'angol, maori, új-zélandi jelnyelv' },
      { k: 'highest', v: 'Aoraki / Mount Cook, 3,724 m', hu: 'Aoraki / Mount Cook, 3724 m' },
      { k: 'calling', v: '+64' },
      left,
      { k: 'tld', v: '.nz' },
    ],
    fun: {
      en: 'In 1893 New Zealand became the first self-governing country where women could vote in national elections.',
      hu: '1893-ban Új-Zéland lett az első önkormányzó ország, ahol a nők szavazhattak az országos választásokon.',
    },
  },
  nile: {
    flags: ['ug', 'ss', 'sd', 'et', 'eg'],
    facts: [
      { k: 'length', v: '≈ 6,650 km', hu: '≈ 6650 km' },
      { k: 'source', v: 'Lake Victoria (White Nile), Lake Tana (Blue Nile)', hu: 'Viktória-tó (Fehér-Nílus), Tana-tó (Kék-Nílus)' },
      { k: 'mouth', v: 'Mediterranean Sea (delta in Egypt)', hu: 'Földközi-tenger (delta Egyiptomban)' },
      { k: 'countries', v: '11 countries in its basin', hu: '11 ország a vízgyűjtőjén' },
    ],
    fun: {
      en: 'The White Nile and the Blue Nile meet in Khartoum, the capital of Sudan.',
      hu: 'A Fehér-Nílus és a Kék-Nílus Kartúmban, Szudán fővárosában találkozik.',
    },
  },
  mississippi: {
    flags: ['us'],
    facts: [
      { k: 'length', v: '≈ 3,770 km', hu: '≈ 3770 km' },
      { k: 'source', v: 'Lake Itasca, Minnesota', hu: 'Itasca-tó, Minnesota' },
      { k: 'mouth', v: 'Gulf of Mexico', hu: 'Mexikói-öböl' },
      { k: 'countries', v: '10 US states along its banks', hu: '10 amerikai állam a partjain' },
    ],
    fun: {
      en: 'A raindrop falling into Lake Itasca needs about 90 days to reach the Gulf of Mexico.',
      hu: 'Egy esőcseppnek kb. 90 nap kell, hogy az Itasca-tóból eljusson a Mexikói-öbölig.',
    },
  },
};

// ---- more countries (three per continent), the biggest rivers and lakes, and space ----
const c = (
  flag: string,
  capital: [string, string?],
  currency: [string, string],
  population: [string, string],
  area: [string, string],
  language: [string, string],
  highest: [string, string],
  calling: string,
  drives: 'right' | 'left',
  tld: string,
  fun: { en: string; hu: string },
): CountryFacts => ({
  flags: [flag],
  facts: [
    { k: 'capital', v: capital[0], hu: capital[1] },
    { k: 'currency', v: currency[0], hu: currency[1] },
    { k: 'population', v: population[0], hu: population[1] },
    { k: 'area', v: area[0], hu: area[1] },
    { k: 'language', v: language[0], hu: language[1] },
    { k: 'highest', v: highest[0], hu: highest[1] },
    { k: 'calling', v: calling },
    drives === 'right' ? right : left,
    { k: 'tld', v: tld },
  ],
  fun,
});

Object.assign(COUNTRY_FACTS, {
  italy: c('it', ['Rome', 'Róma'], ['Euro (EUR)', 'euró (EUR)'], ['≈ 59 million', '≈ 59 millió'], ['302,068 km²', '302 068 km²'], ['Italian', 'olasz'], ['Mont Blanc massif, ≈ 4,800 m', 'Mont Blanc-hegység, ≈ 4800 m'], '+39', 'right', '.it', {
    en: 'Two independent countries lie completely inside Italy: San Marino and Vatican City.',
    hu: 'Két független ország is teljesen Olaszországon belül fekszik: San Marino és a Vatikán.',
  }),
  greece: c('gr', ['Athens', 'Athén'], ['Euro (EUR)', 'euró (EUR)'], ['≈ 10.4 million', '≈ 10,4 millió'], ['131,957 km²', '131 957 km²'], ['Greek', 'görög'], ['Mount Olympus, 2,918 m', 'Olümposz, 2918 m'], '+30', 'right', '.gr', {
    en: 'Greece has around 6,000 islands and islets – only about 200 of them are inhabited.',
    hu: 'Görögországnak kb. 6000 szigete és szirtje van – ezek közül csak kb. 200 lakott.',
  }),
  finland: c('fi', ['Helsinki'], ['Euro (EUR)', 'euró (EUR)'], ['≈ 5.6 million', '≈ 5,6 millió'], ['338,455 km²', '338 455 km²'], ['Finnish, Swedish', 'finn, svéd'], ['Halti, 1,324 m', 'Halti, 1324 m'], '+358', 'right', '.fi', {
    en: 'Finland has about 188,000 lakes – and around 3 million saunas.',
    hu: 'Finnországban kb. 188 000 tó van – és nagyjából 3 millió szauna.',
  }),
  india: c('in', ['New Delhi', 'Újdelhi'], ['Indian rupee (INR)', 'indiai rúpia (INR)'], ['≈ 1.45 billion', '≈ 1,45 milliárd'], ['3,287,263 km²', '3 287 263 km²'], ['Hindi, English + 22 scheduled languages', 'hindi, angol + 22 elismert nyelv'], ['Kangchenjunga, 8,586 m', 'Kancsendzönga, 8586 m'], '+91', 'left', '.in', {
    en: 'Indian Railways carries more than 20 million passengers every day.',
    hu: 'Az indiai vasút naponta több mint 20 millió utast szállít.',
  }),
  southkorea: c('kr', ['Seoul', 'Szöul'], ['South Korean won (KRW)', 'dél-koreai von (KRW)'], ['≈ 51.7 million', '≈ 51,7 millió'], ['≈ 100,400 km²', '≈ 100 400 km²'], ['Korean', 'koreai'], ['Hallasan, 1,947 m', 'Hallaszan, 1947 m'], '+82', 'right', '.kr', {
    en: 'Koreans traditionally turned a year older on New Year’s Day – the country switched to international age counting in 2023.',
    hu: 'Koreában hagyományosan újévkor lett mindenki egy évvel idősebb – 2023-ban álltak át a nemzetközi életkorszámításra.',
  }),
  thailand: c('th', ['Bangkok'], ['Thai baht (THB)', 'thai baht (THB)'], ['≈ 71 million', '≈ 71 millió'], ['513,120 km²', '513 120 km²'], ['Thai', 'thai'], ['Doi Inthanon, 2,565 m', 'Doi Inthanon, 2565 m'], '+66', 'left', '.th', {
    en: 'Bangkok’s full ceremonial name has 168 letters – one of the longest place names in the world.',
    hu: 'Bangkok teljes szertartásos neve 168 betűs – a világ egyik leghosszabb helyneve.',
  }),
  egypt: c('eg', ['Cairo', 'Kairó'], ['Egyptian pound (EGP)', 'egyiptomi font (EGP)'], ['≈ 110 million', '≈ 110 millió'], ['1,001,450 km²', '1 001 450 km²'], ['Arabic', 'arab'], ['Mount Catherine, 2,629 m', 'Katalin-hegy, 2629 m'], '+20', 'right', '.eg', {
    en: 'About 95% of Egyptians live on roughly 5% of the land – along the Nile and in its delta.',
    hu: 'Az egyiptomiak kb. 95%-a az ország területének nagyjából 5%-án él – a Nílus mentén és a deltájában.',
  }),
  madagascar: c('mg', ['Antananarivo'], ['Malagasy ariary (MGA)', 'malgas ariary (MGA)'], ['≈ 31 million', '≈ 31 millió'], ['587,041 km²', '587 041 km²'], ['Malagasy, French', 'malgas, francia'], ['Maromokotro, 2,876 m', 'Maromokotro, 2876 m'], '+261', 'right', '.mg', {
    en: 'About 90% of its wildlife lives nowhere else on Earth – including every lemur.',
    hu: 'Az élővilágának kb. 90%-a sehol máshol nem él a Földön – köztük az összes maki.',
  }),
  southafrica: c('za', ['Pretoria, Cape Town, Bloemfontein', 'Pretoria, Fokváros, Bloemfontein'], ['South African rand (ZAR)', 'dél-afrikai rand (ZAR)'], ['≈ 63 million', '≈ 63 millió'], ['1,221,037 km²', '1 221 037 km²'], ['12 official languages', '12 hivatalos nyelv'], ['Mafadi, 3,450 m', 'Mafadi, 3450 m'], '+27', 'left', '.za', {
    en: 'It has three capital cities: one for the government, one for parliament and one for the courts.',
    hu: 'Három fővárosa van: egy a kormánynak, egy a parlamentnek és egy a bíróságoknak.',
  }),
  usa: c('us', ['Washington, D.C.'], ['US dollar (USD)', 'amerikai dollár (USD)'], ['≈ 340 million', '≈ 340 millió'], ['≈ 9.8 million km²', '≈ 9,8 millió km²'], ['English', 'angol'], ['Denali, 6,190 m', 'Denali, 6190 m'], '+1', 'right', '.us', {
    en: 'The 48 contiguous states span four time zones – Alaska and Hawaii add two more.',
    hu: 'A 48 összefüggő állam négy időzónán terül el – Alaszka és Hawaii még kettőt hozzáad.',
  }),
  canada: c('ca', ['Ottawa'], ['Canadian dollar (CAD)', 'kanadai dollár (CAD)'], ['≈ 41 million', '≈ 41 millió'], ['9,984,670 km²', '9 984 670 km²'], ['English, French', 'angol, francia'], ['Mount Logan, 5,959 m', 'Mount Logan, 5959 m'], '+1', 'right', '.ca', {
    en: 'Canada has the longest coastline in the world – more than 200,000 km.',
    hu: 'Kanadának van a világ leghosszabb partvonala – több mint 200 000 km.',
  }),
  cuba: c('cu', ['Havana', 'Havanna'], ['Cuban peso (CUP)', 'kubai peso (CUP)'], ['≈ 10 million', '≈ 10 millió'], ['109,884 km²', '109 884 km²'], ['Spanish', 'spanyol'], ['Pico Turquino, 1,974 m', 'Pico Turquino, 1974 m'], '+53', 'right', '.cu', {
    en: 'The bee hummingbird of Cuba is the smallest bird in the world – about 5 cm long.',
    hu: 'A kubai méhkolibri a világ legkisebb madara – kb. 5 cm hosszú.',
  }),
  peru: c('pe', ['Lima'], ['Peruvian sol (PEN)', 'perui sol (PEN)'], ['≈ 34 million', '≈ 34 millió'], ['1,285,216 km²', '1 285 216 km²'], ['Spanish, Quechua, Aymara', 'spanyol, kecsua, ajmara'], ['Huascarán, 6,768 m', 'Huascarán, 6768 m'], '+51', 'right', '.pe', {
    en: 'The Amazon River starts high in the Peruvian Andes.',
    hu: 'Az Amazonas a perui Andokban ered, magasan a hegyek között.',
  }),
  colombia: c('co', ['Bogotá'], ['Colombian peso (COP)', 'kolumbiai peso (COP)'], ['≈ 53 million', '≈ 53 millió'], ['1,141,748 km²', '1 141 748 km²'], ['Spanish', 'spanyol'], ['Pico Cristóbal Colón, ≈ 5,730 m', 'Pico Cristóbal Colón, ≈ 5730 m'], '+57', 'right', '.co', {
    en: 'The only South American country with coasts on both the Pacific and the Caribbean.',
    hu: 'Az egyetlen dél-amerikai ország, amelynek a Csendes-óceánon és a Karib-tengeren is van partja.',
  }),
  bolivia: c('bo', ['Sucre (constitutional), La Paz (government)', 'Sucre (alkotmányos), La Paz (kormányszékhely)'], ['Boliviano (BOB)', 'boliviano (BOB)'], ['≈ 12.4 million', '≈ 12,4 millió'], ['1,098,581 km²', '1 098 581 km²'], ['Spanish + 36 indigenous languages', 'spanyol + 36 őshonos nyelv'], ['Nevado Sajama, 6,542 m', 'Nevado Sajama, 6542 m'], '+591', 'right', '.bo', {
    en: 'Salar de Uyuni is the largest salt flat in the world – after rain it turns into a giant mirror.',
    hu: 'A Salar de Uyuni a világ legnagyobb sósivataga – eső után óriási tükörré változik.',
  }),
  australia: c('au', ['Canberra'], ['Australian dollar (AUD)', 'ausztrál dollár (AUD)'], ['≈ 27 million', '≈ 27 millió'], ['≈ 7.7 million km²', '≈ 7,7 millió km²'], ['English', 'angol'], ['Mount Kosciuszko, 2,228 m', 'Kosciuszko-hegy, 2228 m'], '+61', 'left', '.au', {
    en: 'The only continent that is also a single country.',
    hu: 'Az egyetlen kontinens, amely egyben egyetlen ország is.',
  }),
  png: c('pg', ['Port Moresby'], ['Kina (PGK)', 'kina (PGK)'], ['≈ 10 million (estimates vary)', '≈ 10 millió (a becslések eltérnek)'], ['462,840 km²', '462 840 km²'], ['English, Tok Pisin, Hiri Motu', 'angol, tok piszin, hiri motu'], ['Mount Wilhelm, 4,509 m', 'Wilhelm-hegy, 4509 m'], '+675', 'left', '.pg', {
    en: 'More than 800 languages are spoken here – more than in any other country.',
    hu: 'Több mint 800 nyelvet beszélnek itt – többet, mint bármely más országban.',
  }),
  vanuatu: c('vu', ['Port Vila'], ['Vatu (VUV)', 'vatu (VUV)'], ['≈ 330,000', '≈ 330 000'], ['12,189 km²', '12 189 km²'], ['Bislama, English, French', 'biszlama, angol, francia'], ['Mount Tabwemasana, 1,879 m', 'Tabwemasana, 1879 m'], '+678', 'right', '.vu', {
    en: 'On Tanna you can walk up to the crater rim of Mount Yasur, one of the most accessible active volcanoes.',
    hu: 'Tanna szigetén egészen a Yasur kráterének pereméig fel lehet sétálni – ez az egyik legkönnyebben megközelíthető működő vulkán.',
  }),
  amazon: {
    flags: ['pe', 'co', 'br'],
    facts: [
      { k: 'length', v: '≈ 6,400 km', hu: '≈ 6400 km' },
      { k: 'source', v: 'The Andes of Peru', hu: 'a perui Andok' },
      { k: 'mouth', v: 'Atlantic Ocean (Brazil)', hu: 'Atlanti-óceán (Brazília)' },
      { k: 'countries', v: '9 in its basin', hu: '9 a vízgyűjtőjén' },
    ],
    fun: {
      en: 'It carries more water than the next seven largest rivers together – about a fifth of all river water reaching the oceans.',
      hu: 'Több vizet szállít, mint a következő hét legnagyobb folyó együtt – az óceánokba jutó folyóvíz nagyjából ötödét.',
    },
  },
  yangtze: {
    flags: ['cn'],
    facts: [
      { k: 'length', v: '≈ 6,300 km', hu: '≈ 6300 km' },
      { k: 'source', v: 'Tibetan Plateau (Qinghai)', hu: 'Tibeti-fennsík (Csinghaj)' },
      { k: 'mouth', v: 'East China Sea, at Shanghai', hu: 'Kelet-kínai-tenger, Sanghajnál' },
      { k: 'countries', v: 'China', hu: 'Kína' },
    ],
    fun: {
      en: 'The Three Gorges Dam on the Yangtze is the largest power station in the world.',
      hu: 'A Jangcén álló Három-szurdok-gát a világ legnagyobb erőműve.',
    },
  },
  huanghe: {
    flags: ['cn'],
    facts: [
      { k: 'length', v: '≈ 5,460 km', hu: '≈ 5460 km' },
      { k: 'source', v: 'Bayan Har Mountains (Qinghai)', hu: 'Bajan-Har-hegység (Csinghaj)' },
      { k: 'mouth', v: 'Bohai Sea', hu: 'Po-haj-tenger' },
      { k: 'countries', v: 'China', hu: 'Kína' },
    ],
    fun: {
      en: 'It is named after the yellow loess silt it carries – and its lower course has moved many times.',
      hu: 'A nevét a sárga löszhordaléktól kapta – és az alsó szakasza sokszor áthelyeződött.',
    },
  },
  yenisei: {
    flags: ['ru', 'mn'],
    facts: [
      { k: 'length', v: '≈ 3,490 km', hu: '≈ 3490 km' },
      { k: 'source', v: 'Kyzyl, Tuva (where the Big and Small Yenisei meet)', hu: 'Kizil, Tuva (a Nagy- és a Kis-Jenyiszej találkozása)' },
      { k: 'mouth', v: 'Kara Sea (Arctic Ocean)', hu: 'Kara-tenger (Jeges-tenger)' },
      { k: 'countries', v: 'Russia (and Mongolia in its basin)', hu: 'Oroszország (és Mongólia a vízgyűjtőn)' },
    ],
    fun: {
      en: 'Together with the Angara and Selenga it forms the largest river system flowing into the Arctic Ocean.',
      hu: 'Az Angarával és a Szelengával együtt ez a Jeges-tengerbe ömlő legnagyobb folyórendszer.',
    },
  },
  congo: {
    flags: ['cd', 'cg'],
    facts: [
      { k: 'length', v: '≈ 4,700 km', hu: '≈ 4700 km' },
      { k: 'source', v: 'Highlands of Zambia and south-eastern DR Congo', hu: 'Zambia és a Kongói DK délkeleti felföldjei' },
      { k: 'mouth', v: 'Atlantic Ocean', hu: 'Atlanti-óceán' },
      { k: 'countries', v: '9 in its basin', hu: '9 a vízgyűjtőjén' },
    ],
    fun: {
      en: 'The deepest river in the world – more than 220 m in places – and it crosses the equator twice.',
      hu: 'A világ legmélyebb folyója – helyenként több mint 220 m –, és kétszer is átszeli az Egyenlítőt.',
    },
  },
  caspian: {
    flags: ['ru', 'kz', 'tm', 'ir', 'az'],
    facts: [
      { k: 'area', v: '≈ 371,000 km²', hu: '≈ 371 000 km²' },
      { k: 'depth', v: '1,025 m', hu: '1025 m' },
      { k: 'countries', v: 'Russia, Kazakhstan, Turkmenistan, Iran, Azerbaijan', hu: 'Oroszország, Kazahsztán, Türkmenisztán, Irán, Azerbajdzsán' },
    ],
    fun: {
      en: 'The largest lake in the world by area – yet it is called a sea, and its water is slightly salty.',
      hu: 'Területre a világ legnagyobb tava – mégis tengernek hívják, és a vize enyhén sós.',
    },
  },
  superior: {
    flags: ['us', 'ca'],
    facts: [
      { k: 'area', v: '82,100 km²', hu: '82 100 km²' },
      { k: 'depth', v: '406 m' },
      { k: 'countries', v: 'USA, Canada', hu: 'USA, Kanada' },
    ],
    fun: {
      en: 'It holds about a tenth of the world’s fresh surface water.',
      hu: 'A Föld felszíni édesvizének nagyjából tizedét tartalmazza.',
    },
  },
  victoria: {
    flags: ['ug', 'ke', 'tz'],
    facts: [
      { k: 'area', v: '≈ 68,800 km²', hu: '≈ 68 800 km²' },
      { k: 'depth', v: '≈ 84 m' },
      { k: 'countries', v: 'Uganda, Kenya, Tanzania', hu: 'Uganda, Kenya, Tanzánia' },
    ],
    fun: {
      en: 'Africa’s largest lake – the White Nile flows out of it at Jinja.',
      hu: 'Afrika legnagyobb tava – a Fehér-Nílus Jinjánál folyik ki belőle.',
    },
  },
  baikal: {
    flags: ['ru'],
    facts: [
      { k: 'area', v: '≈ 31,700 km²', hu: '≈ 31 700 km²' },
      { k: 'depth', v: '1,642 m', hu: '1642 m' },
      { k: 'countries', v: 'Russia', hu: 'Oroszország' },
    ],
    fun: {
      en: 'The deepest and oldest lake on Earth (about 25 million years) – it holds about a fifth of the world’s unfrozen fresh surface water.',
      hu: 'A Föld legmélyebb és legősibb tava (kb. 25 millió éves) – a nem fagyott felszíni édesvíz nagyjából ötödét tartalmazza.',
    },
  },
  tanganyika: {
    flags: ['tz', 'cd', 'bi', 'zm'],
    facts: [
      { k: 'area', v: '≈ 32,900 km²', hu: '≈ 32 900 km²' },
      { k: 'depth', v: '1,470 m', hu: '1470 m' },
      { k: 'countries', v: 'Tanzania, DR Congo, Burundi, Zambia', hu: 'Tanzánia, Kongói DK, Burundi, Zambia' },
    ],
    fun: {
      en: 'The longest freshwater lake in the world – about 673 km from north to south.',
      hu: 'A világ leghosszabb édesvizű tava – északról délre kb. 673 km.',
    },
  },
  moon: {
    flags: [],
    facts: [
      { k: 'diameter', v: '3,474 km', hu: '3474 km' },
      { k: 'distance', v: '≈ 384,400 km from Earth', hu: '≈ 384 400 km a Földtől' },
      { k: 'gravity', v: '1.62 m/s² (≈ 1/6 of Earth’s)', hu: '1,62 m/s² (a földi ≈ 1/6-a)' },
      { k: 'day', v: '≈ 29.5 Earth days', hu: '≈ 29,5 földi nap' },
      { k: 'temp', v: '−173 °C … +127 °C' },
      { k: 'landing', v: 'Apollo 11, 20 July 1969', hu: 'Apollo–11, 1969. július 20.' },
    ],
    fun: {
      en: 'It always shows us the same face – and it moves about 3.8 cm farther from Earth every year.',
      hu: 'Mindig ugyanazt az oldalát mutatja nekünk – és évente kb. 3,8 cm-rel távolodik a Földtől.',
    },
  },
  mars: {
    flags: [],
    facts: [
      { k: 'diameter', v: '6,779 km', hu: '6779 km' },
      { k: 'distance', v: '≈ 228 million km from the Sun', hu: '≈ 228 millió km a Naptól' },
      { k: 'gravity', v: '3.71 m/s² (≈ 38% of Earth’s)', hu: '3,71 m/s² (a földi ≈ 38%-a)' },
      { k: 'day', v: '24 h 37 min', hu: '24 óra 37 perc' },
      { k: 'year', v: '687 Earth days', hu: '687 földi nap' },
      { k: 'moons', v: 'Phobos, Deimos', hu: 'Phobosz, Deimosz' },
      { k: 'highest', v: 'Olympus Mons, ≈ 22 km', hu: 'Olympus Mons, ≈ 22 km' },
    ],
    fun: {
      en: 'Sunsets on Mars are blue.',
      hu: 'A Marson a naplemente kék.',
    },
  },
  solar: {
    flags: [],
    facts: [
      { k: 'age', v: '≈ 4.6 billion years', hu: '≈ 4,6 milliárd év' },
      { k: 'planets', v: '8', hu: '8' },
      { k: 'mass', v: 'The Sun holds 99.8% of all the mass', hu: 'A Nap a teljes tömeg 99,8%-a' },
      { k: 'light', v: '8 min 20 s from the Sun to Earth', hu: '8 perc 20 mp a Naptól a Földig' },
      { k: 'distance', v: 'Neptune: ≈ 4.5 billion km from the Sun', hu: 'Neptunusz: ≈ 4,5 milliárd km a Naptól' },
    ],
    fun: {
      en: 'On this website a jar of Nutella orbits between Mars and Jupiter. (Only here.)',
      hu: 'Ezen a weboldalon egy üveg Nutella kering a Mars és a Jupiter között. (Csak itt.)',
    },
  },
});
