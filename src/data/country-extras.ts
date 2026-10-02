/**
 * The bottom strip of the country pages (double-click the scrollbar ribbon): fun facts (💡) and funny
 * remarks (😂) for every ribbon, in English and Hungarian (the other languages show the English).
 */
export type Extra = [emoji: string, en: string, hu: string];

export const COUNTRY_EXTRAS: Record<string, Extra[]> = {
  chile: [
    ['💡', 'Easter Island (Rapa Nui) belongs to Chile – 3,500 km out in the Pacific.', 'A Húsvét-sziget (Rapa Nui) is Chiléhez tartozik – 3500 km-re, kint a Csendes-óceánban.'],
    ['😂', 'András knows 50+ cities here. Chile does not know András yet.', 'András több mint 50 várost ismer itt. Chile még nem ismeri Andrást.'],
    ['💡', 'Some weather stations in the Atacama have never recorded a drop of rain.', 'Az Atacama egyes meteorológiai állomásain még egyetlen csepp esőt sem mértek.'],
  ],
  argentina: [
    ['💡', 'Argentines eat some of the most beef per person in the world – and drink mate all day.', 'Az argentinok fejenként a világon az egyik legtöbb marhahúst eszik – és egész nap matét isznak.'],
    ['😂', 'Patagonia is so windy that your hitchhiking sign needs to be tied down.', 'Patagóniában akkora a szél, hogy a stopptáblát le kell kötözni.'],
    ['💡', 'Ushuaia calls itself the southernmost city in the world.', 'Ushuaia a világ legdélebbi városának tartja magát.'],
  ],
  brazil: [
    ['💡', 'Most of the Amazon rainforest – the largest on Earth – is in Brazil.', 'A Föld legnagyobb esőerdőjének, az Amazóniának a nagy része Brazíliában van.'],
    ['😂', 'Red soil + endless roads = an instant GeoGuessr answer.', 'Vörös föld + végtelen utak = azonnali GeoGuessr-válasz.'],
    ['💡', 'Brazil has won the football World Cup five times – more than any other country.', 'Brazília ötször nyert labdarúgó-világbajnokságot – többször, mint bármelyik másik ország.'],
  ],
  hungary: [
    ['💡', 'The Rubik’s Cube, the ballpoint pen (László Bíró) and the noiseless match (János Irinyi) are Hungarian inventions.', 'A Rubik-kocka, a golyóstoll (Bíró László) és a zajtalan gyufa (Irinyi János) is magyar találmány.'],
    ['😂', 'Home of the 12-plum-dumpling record.', 'A 12 szilvásgombócos rekord hazája.'],
    ['💡', 'Budapest sits on more than 100 hot springs – hence all the thermal baths.', 'Budapest több mint száz hőforrás fölött fekszik – innen a sok gyógyfürdő.'],
  ],
  georgia: [
    ['💡', 'Georgian has its own alphabet with 33 letters – András learned it from friends at an Erasmus project.', 'A grúznak saját, 33 betűs ábécéje van – András egy Erasmuson tanulta meg a barátaitól.'],
    ['💡', 'Georgia is often called the cradle of wine: people have made wine here for about 8,000 years.', 'Grúziát gyakran a bor bölcsőjének hívják: kb. 8000 éve készítenek itt bort.'],
    ['😂', 'At a supra (a Georgian feast) the toasts never end – and neither does the food. Perfect for András.', 'Egy suprán (grúz lakomán) sosem érnek véget a tósztok – és az étel sem. Andrásnak tökéletes.'],
  ],
  sweden: [
    ['💡', 'Sweden has about 267,000 islands – more than any other country.', 'Svédországnak kb. 267 000 szigete van – több, mint bármelyik másik országnak.'],
    ['😂', 'The right of public access lets you camp almost anywhere. A dream for someone who sleeps at bus stops.', 'A szabad hozzáférés joga szerint szinte bárhol sátrazhatsz. Álom annak, aki buszmegállóban alszik.'],
    ['💡', 'An ice hotel is built in Jukkasjärvi every winter – and it melts away in spring.', 'Jukkasjärviben minden télen jéghotelt építenek – tavasszal elolvad.'],
  ],
  norway: [
    ['💡', 'With all its fjords and islands, Norway’s coastline is about 100,000 km long.', 'A fjordokkal és szigetekkel együtt Norvégia partvonala kb. 100 000 km hosszú.'],
    ['😂', 'In the far north the sun does not set for weeks in summer – night runs without a head torch.', 'A messzi északon nyáron hetekig nem megy le a nap – éjszakai futás fejlámpa nélkül.'],
    ['💡', 'The Lærdal Tunnel (24.5 km) is the longest road tunnel in the world.', 'A Lærdal-alagút (24,5 km) a világ leghosszabb közúti alagútja.'],
  ],
  portugal: [
    ['💡', 'About half of the world’s cork comes from Portugal.', 'A világ parafájának nagyjából fele Portugáliából származik.'],
    ['😂', 'Pastel de nata: 12 at once? Challenge accepted.', 'Pastel de nata: 12 egyszerre? Kihívás elfogadva.'],
    ['💡', 'Cabo da Roca is the westernmost point of mainland Europe.', 'A Cabo da Roca a szárazföldi Európa legnyugatibb pontja.'],
    ['💡', 'Portuguese has more than 250 million speakers – most of them in Brazil.', 'A portugált több mint 250 millióan beszélik – legtöbben Brazíliában.'],
  ],
  mozambique: [
    ['💡', 'Mozambique’s flag is the only national flag with a rifle on it.', 'Mozambik zászlaja az egyetlen nemzeti zászló, amelyen puska látható.'],
    ['💡', 'Its coast on the Indian Ocean is about 2,500 km long.', 'Az Indiai-óceán menti partja kb. 2500 km hosszú.'],
    ['😂', 'Portuguese is the official language here too – one more reason to learn it.', 'Itt is portugál a hivatalos nyelv – még egy ok, hogy megtanuljam.'],
  ],
  nile: [
    ['💡', 'The Nile flows north and was the lifeline of ancient Egypt.', 'A Nílus észak felé folyik, és az ókori Egyiptom éltető ere volt.'],
    ['😂', 'Running its whole length would be almost 160 marathons.', 'A teljes hosszát lefutni majdnem 160 maraton lenne.'],
    ['💡', 'Its two big branches, the White Nile and the Blue Nile, meet in Khartoum.', 'Két nagy ága, a Fehér- és a Kék-Nílus Kartúmban találkozik.'],
  ],
  mississippi: [
    ['💡', 'With the Missouri it forms one of the longest river systems in the world.', 'A Missourival együtt a világ egyik leghosszabb folyórendszerét alkotja.'],
    ['😂', 'Spelling it is half the adventure: M-i-s-s-i-s-s-i-p-p-i.', 'Már a betűzése is kaland: M-i-s-s-i-s-s-i-p-p-i.'],
    ['💡', 'Mark Twain’s Tom Sawyer and Huckleberry Finn grew up on its banks.', 'Mark Twain Tom Sawyere és Huckleberry Finnje a partján nőtt fel.'],
  ],
  mexico: [
    ['💡', 'Parts of Mexico City sink by tens of centimetres a year – it was built on an old lake bed.', 'Mexikóváros egyes részei évente több tíz centit süllyednek – egy egykori tó medrére épült.'],
    ['💡', 'Chocolate, tomatoes and chillies spread to the world from this region.', 'A csokoládé, a paradicsom és a chili innen terjedt el a világban.'],
    ['😂', 'Tacos for breakfast, lunch and dinner – a plan András fully supports.', 'Taco reggelire, ebédre és vacsorára – András teljes mértékben támogatja.'],
  ],
  japan: [
    ['💡', 'Japan is made up of more than 14,000 islands.', 'Japán több mint 14 000 szigetből áll.'],
    ['💡', 'Its trains are famous for being on time – delays are measured in seconds.', 'A vonatai híresen pontosak – a késést másodpercben mérik.'],
    ['😂', 'Vending machines everywhere: you could cross the country without ever being thirsty.', 'Mindenhol italautomata: végig lehet menni az országon úgy, hogy egyszer sem leszel szomjas.'],
  ],
  vietnam: [
    ['💡', 'Vietnam is the world’s second-largest coffee exporter, after Brazil.', 'Vietnám a világ második legnagyobb kávéexportőre Brazília után.'],
    ['💡', 'Hạ Long Bay has about 1,600 limestone islands.', 'A Hạ Long-öbölben kb. 1600 mészkősziget van.'],
    ['😂', 'Long and thin, as if it were running down the map – Chile would approve.', 'Hosszú és keskeny, mintha végigfutna a térképen – Chile helyeselné.'],
  ],
  newzealand: [
    ['💡', 'There are about five sheep for every person in New Zealand.', 'Új-Zélandon minden emberre nagyjából öt birka jut.'],
    ['💡', 'It was one of the last places on Earth to be settled by humans.', 'A Föld egyik utolsó helye volt, ahová ember letelepedett.'],
    ['😂', 'A kiwi is a bird, a fruit and a person. Order carefully.', 'A kiwi madár, gyümölcs és ember is. Óvatosan rendelj.'],
  ],
  peru: [
    ['💡', 'Machu Picchu sits at about 2,400 m in the Andes.', 'Machu Picchu kb. 2400 méter magasan fekszik az Andokban.'],
    ['💡', 'Peru has about 4,000 kinds of potatoes.', 'Peruban kb. 4000 féle burgonya van.'],
    ['😂', 'The purple soil around Cusco is GeoGuessr gold.', 'A Cuzco környéki lila föld aranyat ér a GeoGuessrben.'],
  ],
  colombia: [
    ['💡', 'Colombia is the only South American country with coasts on both the Pacific and the Caribbean.', 'Kolumbia az egyetlen dél-amerikai ország, amelynek a Csendes-óceánon és a Karib-tengeren is van partja.'],
    ['💡', 'It has more bird species than any other country.', 'Itt él a legtöbb madárfaj a világon.'],
    ['😂', 'The coffee is so good that one cup is never just one cup.', 'Olyan jó a kávé, hogy egy csésze sosem marad egy csésze.'],
  ],
  bolivia: [
    ['💡', 'Salar de Uyuni is the largest salt flat on Earth – after rain it turns into a giant mirror.', 'A Salar de Uyuni a Föld legnagyobb sósivataga – eső után óriási tükörré válik.'],
    ['💡', 'La Paz is the highest seat of government in the world, at about 3,600 m.', 'La Paz a világ legmagasabban fekvő kormányzati székhelye, kb. 3600 m-en.'],
    ['😂', 'András memorised its cities through whole nights. Bolivia probably noticed.', 'András egész éjszakákon át magolta a városait. Bolívia valószínűleg észrevette.'],
  ],
  italy: [
    ['💡', 'Italy has more UNESCO World Heritage Sites than any other country.', 'Olaszországban van a legtöbb UNESCO-világörökségi helyszín.'],
    ['💡', 'Two countries lie inside Italy: Vatican City and San Marino.', 'Olaszországon belül két ország is van: a Vatikán és San Marino.'],
    ['😂', 'Pizza, pasta, gelato: a training camp – but for eating.', 'Pizza, tészta, fagyi: edzőtábor – csak evésből.'],
  ],
  greece: [
    ['💡', 'Greece has about 6,000 islands, but only around 200 are inhabited.', 'Görögországnak kb. 6000 szigete van, de csak nagyjából 200-on élnek emberek.'],
    ['💡', 'The marathon is named after the run from Marathon to Athens.', 'A maraton a Marathónból Athénba tartó futásról kapta a nevét.'],
    ['😂', 'András ran around one of these islands at night. The goats were surprised.', 'András éjjel körbefutotta az egyik szigetet. A kecskék meglepődtek.'],
  ],
  finland: [
    ['💡', 'Finland has about 3 million saunas – for 5.5 million people.', 'Finnországban kb. 3 millió szauna van – 5,5 millió emberre.'],
    ['💡', 'The “land of a thousand lakes” actually has about 188,000.', 'Az „ezer tó országában” valójában kb. 188 000 tó van.'],
    ['😂', 'Wife-carrying is a real sport here – with world championships.', 'Itt a feleségcipelés valódi sport – világbajnoksággal.'],
  ],
  egypt: [
    ['💡', 'The Great Pyramid of Giza was the tallest building on Earth for about 3,800 years.', 'A gízai nagy piramis kb. 3800 évig volt a Föld legmagasabb építménye.'],
    ['💡', 'About 95% of Egyptians live close to the Nile.', 'Az egyiptomiak kb. 95%-a a Nílus közelében él.'],
    ['😂', 'Desert everywhere – perfect for running, if you start at 2 a.m.', 'Mindenhol sivatag – futásra tökéletes, ha hajnali 2-kor indulsz.'],
  ],
  madagascar: [
    ['💡', 'About 90% of its plants and animals live nowhere else on Earth.', 'Növényeinek és állatainak kb. 90%-a sehol máshol nem él a Földön.'],
    ['💡', 'Lemurs live in the wild only here.', 'Makik a vadonban csak itt élnek.'],
    ['😂', 'Famous from a cartoon – but the real wildlife is even crazier.', 'Egy rajzfilmből híres – de az igazi állatvilág még őrültebb.'],
  ],
  southafrica: [
    ['💡', 'South Africa has three capital cities: Pretoria, Cape Town and Bloemfontein.', 'A Dél-afrikai Köztársaságnak három fővárosa van: Pretoria, Fokváros és Bloemfontein.'],
    ['💡', 'It has 12 official languages.', '12 hivatalos nyelve van.'],
    ['😂', 'Cape Town: mountain, ocean and penguins – all in one day.', 'Fokváros: hegy, óceán és pingvinek – egyetlen nap alatt.'],
  ],
  usa: [
    ['💡', 'Alaska, the largest state, is more than twice the size of Texas.', 'Alaszka, a legnagyobb állam, több mint kétszer akkora, mint Texas.'],
    ['💡', 'Roads on the Great Plains can run dead straight for dozens of kilometres.', 'Az Alföld (Great Plains) útjai több tucat kilométeren át nyílegyenesek.'],
    ['😂', 'Hitchhiking across all 50 states: 50 states, at least 50 sandwiches.', 'Átstoppolni mind az 50 államon: 50 állam, legalább 50 szendvics.'],
  ],
  canada: [
    ['💡', 'Canada has the longest coastline in the world – more than 200,000 km.', 'Kanadának a leghosszabb a partvonala a világon – több mint 200 000 km.'],
    ['💡', 'It is said to have more lakes than the rest of the world combined.', 'Állítólag több tava van, mint a világ többi részének együttvéve.'],
    ['😂', 'Maple syrup on everything. Even on Nutella? Experiment pending.', 'Juharszirup mindenre. A Nutellára is? A kísérlet folyamatban.'],
  ],
  cuba: [
    ['💡', 'American cars from the 1950s still drive on its roads.', 'Az utakon ma is járnak az 1950-es évekbeli amerikai autók.'],
    ['💡', 'The bee hummingbird, the smallest bird in the world, lives here.', 'Itt él a világ legkisebb madara, a méhkolibri.'],
    ['😂', 'Salsa everywhere – running pace = dancing pace.', 'Mindenhol salsa – futótempó = tánctempó.'],
  ],
  india: [
    ['💡', 'India officially recognises 22 languages.', 'Indiában 22 hivatalosan elismert nyelv van.'],
    ['💡', 'Indian Railways is one of the biggest employers in the world.', 'Az indiai vasút a világ egyik legnagyobb munkáltatója.'],
    ['😂', 'More curries than days in a year. Challenge: eat them all.', 'Több curry van, mint ahány nap egy évben. Kihívás: mindet megenni.'],
  ],
  southkorea: [
    ['💡', 'Hangul, the Korean alphabet, was invented on purpose in the 15th century.', 'A koreai ábécét, a hangult, a 15. században szándékosan alkották meg.'],
    ['💡', 'South Korea has some of the fastest internet in the world.', 'Dél-Koreában van a világ egyik leggyorsabb internete.'],
    ['😂', 'Kimchi at every meal, breakfast included. András is in.', 'Kimcsi minden étkezéshez, reggelihez is. András benne van.'],
  ],
  thailand: [
    ['💡', 'Thailand is the only Southeast Asian country never colonised by a European power.', 'Thaiföld az egyetlen délkelet-ázsiai ország, amelyet sosem gyarmatosított európai hatalom.'],
    ['💡', 'Bangkok’s full ceremonial name is one of the longest place names in the world.', 'Bangkok teljes ünnepélyes neve a világ egyik leghosszabb helyneve.'],
    ['😂', 'Tuk-tuk + street food = the perfect low-budget day.', 'Tuk-tuk + utcai kaja = a tökéletes low-budget nap.'],
  ],
  australia: [
    ['💡', 'Australia is wider than the Moon: about 4,000 km against 3,474 km.', 'Ausztrália szélesebb a Holdnál: kb. 4000 km, szemben a Hold 3474 km-ével.'],
    ['💡', 'It has more than 10,000 beaches.', 'Több mint 10 000 strandja van.'],
    ['😂', 'Half the animals want to bite you. Run faster.', 'Az állatok fele meg akar harapni. Fuss gyorsabban.'],
  ],
  png: [
    ['💡', 'More than 800 languages are spoken in Papua New Guinea – more than anywhere else.', 'Pápua Új-Guineában több mint 800 nyelvet beszélnek – többet, mint bárhol máshol.'],
    ['💡', 'Many places can only be reached by plane or on foot.', 'Sok helyre csak repülővel vagy gyalog lehet eljutni.'],
    ['😂', 'Learning one language here: doable. Learning all of them: a lifetime.', 'Egy nyelvet megtanulni itt: menne. Mindet: egy élet.'],
  ],
  vanuatu: [
    ['💡', 'On Tanna island you can look into an active volcano, Mount Yasur.', 'Tanna szigetén egy működő vulkán, a Yasur kráterébe is bele lehet nézni.'],
    ['💡', 'Vanuatu has an underwater post office.', 'Vanuatunak víz alatti postája van.'],
    ['😂', 'Send a postcard from under the sea. Nutella not included.', 'Küldj képeslapot a tenger alól. A Nutella nincs benne az árban.'],
  ],
  amazon: [
    ['💡', 'The Amazon carries more water than the next seven largest rivers combined.', 'Az Amazonas több vizet szállít, mint a következő hét legnagyobb folyó együttvéve.'],
    ['💡', 'No bridge crosses its main stream.', 'A főágán egyetlen híd sem ível át.'],
    ['😂', 'Swim across? The piranhas say hi.', 'Átúszni? A piráják üdvözölnek.'],
  ],
  yangtze: [
    ['💡', 'The Yangtze is the longest river in Asia.', 'A Jangce Ázsia leghosszabb folyója.'],
    ['💡', 'The Three Gorges Dam on it is the largest power station in the world.', 'A rajta álló Három-szurdok-gát a világ legnagyobb erőműve.'],
    ['😂', 'About 6,300 km: a long, long run.', 'Kb. 6300 km: egy nagyon-nagyon hosszú futás.'],
  ],
  huanghe: [
    ['💡', 'It is named after the yellow silt it carries.', 'A nevét a magával sodort sárga iszapról kapta.'],
    ['💡', 'It is called the cradle of Chinese civilisation.', 'A kínai civilizáció bölcsőjének nevezik.'],
    ['😂', 'Yellow river, yellow water – a GeoGuessr hint you didn’t ask for.', 'Sárga folyó, sárga víz – egy GeoGuessr-tipp, amit nem is kértél.'],
  ],
  yenisei: [
    ['💡', 'It flows north through Siberia into the Arctic Ocean.', 'Észak felé folyik Szibérián át, a Jeges-tengerbe.'],
    ['💡', 'It is one of the largest rivers flowing into the Arctic Ocean.', 'A Jeges-tengerbe ömlő egyik legnagyobb folyó.'],
    ['😂', 'In winter you could probably run on it. Please don’t.', 'Télen valószínűleg lehetne rajta futni. Kérlek, ne.'],
  ],
  congo: [
    ['💡', 'The Congo is the deepest river in the world – over 220 m in places.', 'A Kongó a világ legmélyebb folyója – helyenként több mint 220 m mély.'],
    ['💡', 'It crosses the equator twice.', 'Kétszer is átszeli az Egyenlítőt.'],
    ['😂', 'So deep that even a 4-minute breath-hold would not get you to the bottom.', 'Olyan mély, hogy még egy 4 perces levegővisszatartással sem érnél le az aljára.'],
  ],
  caspian: [
    ['💡', 'The Caspian Sea is actually the largest lake in the world.', 'A Kaszpi-tenger valójában a világ legnagyobb tava.'],
    ['💡', 'Five countries border it.', 'Öt ország határolja.'],
    ['😂', 'A lake that calls itself a sea. Confidence.', 'Egy tó, ami tengernek hívja magát. Önbizalom.'],
  ],
  superior: [
    ['💡', 'Lake Superior is the largest freshwater lake in the world by area.', 'A Felső-tó a világ legnagyobb területű édesvizű tava.'],
    ['💡', 'It holds about 10% of the world’s surface fresh water.', 'A Föld felszíni édesvizének kb. 10%-a van benne.'],
    ['😂', 'Swim across? About 250 km of cold water. Maybe next year.', 'Átúszni? Kb. 250 km hideg víz. Talán jövőre.'],
  ],
  victoria: [
    ['💡', 'Lake Victoria is the largest lake in Africa.', 'A Viktória-tó Afrika legnagyobb tava.'],
    ['💡', 'It is one of the sources of the Nile, and three countries share it: Uganda, Kenya and Tanzania.', 'A Nílus egyik forrása, és három ország osztozik rajta: Uganda, Kenya és Tanzánia.'],
    ['😂', 'Big enough to make its own weather.', 'Akkora, hogy saját időjárása van.'],
  ],
  baikal: [
    ['💡', 'Lake Baikal is the deepest lake in the world: 1,642 m.', 'A Bajkál-tó a világ legmélyebb tava: 1642 m.'],
    ['💡', 'It holds about 20% of the world’s unfrozen fresh water.', 'A Föld folyékony édesvizének kb. 20%-a van benne.'],
    ['😂', 'In winter the ice is so clear that you can see the fish under your shoes.', 'Télen olyan átlátszó a jég, hogy látod a halakat a cipőd alatt.'],
  ],
  tanganyika: [
    ['💡', 'Lake Tanganyika is the longest freshwater lake in the world – about 670 km.', 'A Tanganyika-tó a világ leghosszabb édesvizű tava – kb. 670 km.'],
    ['💡', 'It is the second-deepest lake in the world.', 'A világ második legmélyebb tava.'],
    ['😂', 'Four countries, one lake – the perfect place for a very long swim.', 'Négy ország, egy tó – tökéletes egy nagyon hosszú úszáshoz.'],
  ],
  moon: [
    ['💡', 'The Moon moves about 3.8 cm further away from Earth every year.', 'A Hold évente kb. 3,8 cm-rel távolodik a Földtől.'],
    ['💡', 'Footprints there can last for millions of years – there is no wind.', 'A lábnyomok ott évmilliókig megmaradhatnak – nincs szél.'],
    ['😂', 'Low gravity: a 10 km PB would be easy. Getting there is the problem.', 'Kis gravitáció: a 10 km-es egyéni csúcs könnyű lenne. Csak odajutni nehéz.'],
  ],
  mars: [
    ['💡', 'Olympus Mons on Mars is about two and a half times as high as Everest.', 'A Marson lévő Olympus Mons kb. két és félszer olyan magas, mint a Mount Everest.'],
    ['💡', 'A day on Mars is only about 40 minutes longer than on Earth.', 'Egy nap a Marson csak kb. 40 perccel hosszabb, mint a Földön.'],
    ['😂', 'Red soil everywhere – the ultimate GeoGuessr level.', 'Mindenhol vörös föld – a GeoGuessr legnehezebb pályája.'],
  ],
  solar: [
    ['💡', 'About 1.3 million Earths would fit inside the Sun.', 'Kb. 1,3 millió Föld férne bele a Napba.'],
    ['💡', 'Sunlight takes about 8 minutes to reach us.', 'A napfény kb. 8 perc alatt ér el hozzánk.'],
    ['😂', 'Nutella orbits the Sun too. (On this website, at least.)', 'A Nutella is a Nap körül kering. (Legalábbis ezen az oldalon.)'],
  ],
};
