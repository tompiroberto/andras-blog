/**
 * CV content (the separate "CV" switch in the header), in all six site languages.
 * TODO(András): check the years, add a phone number / photo / digital skills if you want them on it.
 */
import type { Lang } from '../i18n';

export interface CvItem {
  when?: string;
  what: string;
  where?: string;
  note?: string;
}

export interface CvText {
  toggle: string;
  title: string;
  role: string;
  profile: string;
  h: {
    profile: string;
    education: string;
    erasmus: string;
    work: string;
    volunteering: string;
    languages: string;
    sport: string;
    interests: string;
    hobbies: string;
    contact: string;
    self: string;
  };
  education: CvItem[];
  erasmus: CvItem[];
  work: CvItem[];
  volunteering: CvItem[];
  languages: [string, string][];
  sport: string[];
  interests: string[];
  hobbies: string[];
  /** "How I see myself" – the last section of the sheet */
  self: string[];
  print: string;
  close: string;
  location: string;
}

const PB = '3 km 9:29 · 5 km 16:20 · 10 km 34:40';

export const CV: Record<Lang, CvText> = {
  en: {
    toggle: 'CV',
    title: 'Curriculum Vitae',
    role: 'Final-year student · future geography student at ELTE · skyrunning national team athlete',
    location: 'Budapest, Hungary',
    profile:
      'Final-year student at Budapesti Fazekas Mihály Gimnázium (maths and geography specialisation), going on to study geography at ELTE. I am the ninth of ten siblings. I live in Budapest. Interested in how transport networks and infrastructure work, and in geography and maps. A participant in two Erasmus+ youth projects and a regular volunteer; tough and reliable in physically demanding work. Member of the Hungarian national skyrunning team.',
    h: { profile: 'Profile', education: 'Education', erasmus: 'International projects', work: 'Work experience', volunteering: 'Volunteering', languages: 'Languages', sport: 'Sport', interests: 'Interests', hobbies: 'Hobbies', contact: 'Contact', self: 'How I see myself' },
    education: [
      { when: '2016–2027', what: 'Budapesti Fazekas Mihály Gyakorló Általános Iskola és Gimnázium', where: 'Six-year secondary school, general track – maths and geography specialisation', note: 'Straight-A student' },
      { when: '2027 –', what: 'Geography', where: 'Eötvös Loránd University (ELTE), Budapest', note: 'Starting after secondary school' },
    ],
    erasmus: [
      { when: 'Sep 2026', what: 'Erasmus+ project: digitalisation and AI', where: 'Greece', note: '37 participants from 4 countries' },
      { when: 'Aug 2026', what: 'Erasmus+ project: mental and physical health', where: 'Lithuania', note: '42 participants from 7 countries' },
    ],
    work: [
      { what: 'Casual jobs', note: 'Physically demanding work – I have stamina, I am reliable and I finish what I start.' },
      { what: 'Organising school events', where: 'Budapesti Fazekas Mihály Gimnázium' },
    ],
    volunteering: [
      { what: 'World Athletics Ultimate Championship', note: 'Volunteer' },
      { what: 'DevYou – Developing Youth Foundation (Fejlődő Ifjúságért Alapítvány)', note: 'Volunteer' },
      { what: 'Tudatos Ifjúságért Alapítvány (Foundation for Conscious Youth)', note: 'Volunteer in youth programmes' },
    ],
    languages: [['Hungarian', 'native'], ['English', 'B2'], ['German', 'A2'], ['Spanish', 'learning'], ['Georgian', 'learning'], ['Portuguese', 'learning']],
    sport: [`Personal bests: ${PB}`, 'Split 10k – 2nd overall (34:40)', 'Hungarian skyrunning national team – Youth World Championships 2026 (Vertical and Sky)'],
    interests: ['Transport networks and infrastructure', 'Geography and maps', 'Other cultures and languages', 'Youth work (since 2026)'],
    hobbies: ['Competitive running', 'Swimming', 'Low-budget travel'],
    self: ['Persistent – I very rarely get tired', 'I see the big picture and pay attention to detail', 'I keep an eye on as many things as I can – and on the people around me', 'Straight-A student at school', 'A fast learner when something interests me', 'I commit to things quickly and wholeheartedly'],
    print: 'Print / save as PDF',
    close: 'Go to the blog',
  },
  hu: {
    toggle: 'Önéletrajz',
    title: 'Önéletrajz',
    role: 'Végzős gimnazista · leendő ELTE-s földrajz szakos · skyrunning-válogatott sportoló',
    location: 'Budapest, Magyarország',
    profile:
      'Végzős diák vagyok a Budapesti Fazekas Mihály Gimnáziumban (matematika és földrajz fakultáció); tanulmányaimat az ELTE földrajz szakán folytatom. Tíz testvér közül a kilencedik vagyok. Budapesten lakom. Érdekel, hogyan működnek a közlekedési hálózatok és az infrastruktúra, valamint a földrajz és a térképek világa. Két Erasmus+ ifjúsági projektben vettem részt, rendszeresen önkénteskedem, és fizikailag megterhelő munkában is kitartó és megbízható vagyok. Skyrunningban a magyar válogatott tagja vagyok.',
    h: { profile: 'Bemutatkozás', education: 'Tanulmányok', erasmus: 'Nemzetközi projektek', work: 'Munkatapasztalat', volunteering: 'Önkéntesség', languages: 'Nyelvek', sport: 'Sport', interests: 'Érdeklődés', hobbies: 'Hobbik', contact: 'Elérhetőség', self: 'Ahogy én látom magam' },
    education: [
      { when: '2016–2027', what: 'Budapesti Fazekas Mihály Gyakorló Általános Iskola és Gimnázium', where: '6 osztályos gimnázium, általános szak – matematika és földrajz fakultáció', note: 'Kitűnő tanuló' },
      { when: '2027 –', what: 'Földrajz', where: 'Eötvös Loránd Tudományegyetem (ELTE), Budapest', note: 'Az érettségi után kezdem' },
    ],
    erasmus: [
      { when: '2026. szept.', what: 'Erasmus+ projekt: digitalizáció és MI', where: 'Görögország', note: '37 résztvevő 4 országból' },
      { when: '2026. aug.', what: 'Erasmus+ projekt: mentális és fizikai egészség', where: 'Litvánia', note: '42 résztvevő 7 országból' },
    ],
    work: [
      { what: 'Alkalmi munkák', note: 'Fizikailag megterhelő munkák – strapabíró és megbízható vagyok, amit elkezdek, befejezem.' },
      { what: 'Iskolai rendezvények szervezése', where: 'Budapesti Fazekas Mihály Gimnázium' },
    ],
    volunteering: [
      { what: 'World Athletics Ultimate Championship', note: 'Önkéntes' },
      { what: 'DevYou (Developing Youth – Fejlődő Ifjúságért Alapítvány)', note: 'Önkéntes' },
      { what: 'Tudatos Ifjúságért Alapítvány', note: 'Önkéntes ifjúsági programokban' },
    ],
    languages: [['magyar', 'anyanyelv'], ['angol', 'B2'], ['német', 'A2'], ['spanyol', 'tanulom'], ['grúz', 'tanulom'], ['portugál', 'tanulom']],
    sport: [`Egyéni csúcsok: ${PB}`, 'Split 10k – abszolút 2. hely (34:40)', 'Magyar skyrunning-válogatott – ifjúsági világbajnokság 2026 (vertikál és sky)'],
    interests: ['Közlekedési hálózatok és infrastruktúra', 'Földrajz és térképek', 'Más kultúrák és nyelvek', 'Ifjúsági munka – youth work (2026 óta)'],
    hobbies: ['Versenyszerű futás', 'Úszás', 'Low-budget utazás'],
    self: ['Kitartó vagyok – csak nagyon ritkán fáradok el', 'Jól átlátom a dolgokat, és figyelek a részletekre', 'Igyekszem minél több mindenre figyelni – a körülöttem lévő emberekre is', 'Az iskolában kitűnő tanuló vagyok', 'Gyorsan tanulok, ha valami érdekel', 'Hamar és teljes szívvel elköteleződöm egy-egy ügy mellett'],
    print: 'Nyomtatás / mentés PDF-be',
    close: 'Tovább a blogra',
  },
  pt: {
    toggle: 'CV',
    title: 'Curriculum Vitae',
    role: 'Finalista do secundário · futuro estudante de Geografia na ELTE · atleta da seleção de skyrunning',
    location: 'Budapeste, Hungria',
    profile:
      'Finalista na Budapesti Fazekas Mihály Gimnázium (matemática e geografia aprofundadas); vou continuar a estudar Geografia na ELTE. Sou o nono de dez irmãos. Vivo em Budapeste. Interessa-me o funcionamento das redes de transporte e das infraestruturas, e também a geografia e os mapas. Participei em dois projetos juvenis Erasmus+, faço voluntariado regularmente e sou resistente e de confiança em trabalho fisicamente exigente. Atleta da seleção húngara de skyrunning.',
    h: { profile: 'Perfil', education: 'Formação', erasmus: 'Projetos internacionais', work: 'Experiência profissional', volunteering: 'Voluntariado', languages: 'Línguas', sport: 'Desporto', interests: 'Interesses', hobbies: 'Passatempos', contact: 'Contacto', self: 'Como me vejo' },
    education: [
      { when: '2016–2027', what: 'Budapesti Fazekas Mihály Gyakorló Általános Iskola és Gimnázium', where: 'Liceu de seis anos, via geral – matemática e geografia aprofundadas', note: 'Aluno de excelência' },
      { when: '2027 –', what: 'Geografia', where: 'Universidade Eötvös Loránd (ELTE), Budapeste', note: 'Depois do secundário' },
    ],
    erasmus: [
      { when: 'set. 2026', what: 'Projeto Erasmus+: digitalização e IA', where: 'Grécia', note: '37 participantes de 4 países' },
      { when: 'ago. 2026', what: 'Projeto Erasmus+: saúde mental e física', where: 'Lituânia', note: '42 participantes de 7 países' },
    ],
    work: [
      { what: 'Trabalhos ocasionais', note: 'Trabalho fisicamente exigente – tenho resistência, sou de confiança e termino o que começo.' },
      { what: 'Organização de eventos escolares', where: 'Budapesti Fazekas Mihály Gimnázium' },
    ],
    volunteering: [
      { what: 'World Athletics Ultimate Championship', note: 'Voluntário' },
      { what: 'DevYou – Developing Youth Foundation (Fejlődő Ifjúságért Alapítvány)', note: 'Voluntário' },
      { what: 'Tudatos Ifjúságért Alapítvány (Fundação para uma Juventude Consciente)', note: 'Voluntário em programas juvenis' },
    ],
    languages: [['Húngaro', 'nativo'], ['Inglês', 'B2'], ['Alemão', 'A2'], ['Espanhol', 'a aprender'], ['Georgiano', 'a aprender'], ['Português', 'a aprender']],
    sport: [`Recordes pessoais: ${PB}`, 'Split 10k – 2.º lugar absoluto (34:40)', 'Seleção húngara de skyrunning – Campeonato do Mundo Jovem 2026 (Vertical e Sky)'],
    interests: ['Redes de transporte e infraestruturas', 'Geografia e mapas', 'Outras culturas e línguas', 'Trabalho com jovens – youth work (desde 2026)'],
    hobbies: ['Corrida de competição', 'Natação', 'Viagens low-cost'],
    self: ['Persistente – raramente me canso', 'Tenho visão de conjunto e atenção ao detalhe', 'Presto atenção a tudo o que posso – e às pessoas à minha volta', 'Aluno de excelência na escola', 'Aprendo depressa quando algo me interessa', 'Comprometo-me depressa e de corpo e alma'],
    print: 'Imprimir / guardar em PDF',
    close: 'Ir para o blog',
  },
  ro: {
    toggle: 'CV',
    title: 'Curriculum Vitae',
    role: 'Elev în anul terminal · viitor student la Geografie, ELTE · sportiv în lotul național de skyrunning',
    location: 'Budapesta, Ungaria',
    profile:
      'Elev în anul terminal la Budapesti Fazekas Mihály Gimnázium (matematică și geografie aprofundate); îmi continui studiile la Geografie la ELTE. Sunt al nouălea dintre zece frați. Locuiesc în Budapesta. Mă interesează felul în care funcționează rețelele de transport și infrastructura, precum și geografia și hărțile. Am participat la două proiecte de tineret Erasmus+, fac voluntariat în mod regulat și sunt rezistent și de încredere în munca fizică solicitantă. Sportiv în lotul național de skyrunning al Ungariei.',
    h: { profile: 'Profil', education: 'Educație', erasmus: 'Proiecte internaționale', work: 'Experiență de muncă', volunteering: 'Voluntariat', languages: 'Limbi', sport: 'Sport', interests: 'Interese', hobbies: 'Hobby-uri', contact: 'Contact', self: 'Cum mă văd' },
    education: [
      { when: '2016–2027', what: 'Budapesti Fazekas Mihály Gyakorló Általános Iskola és Gimnázium', where: 'Liceu de șase ani, profil general – matematică și geografie aprofundate', note: 'Elev eminent' },
      { when: '2027 –', what: 'Geografie', where: 'Universitatea Eötvös Loránd (ELTE), Budapesta', note: 'După liceu' },
    ],
    erasmus: [
      { when: 'sept. 2026', what: 'Proiect Erasmus+: digitalizare și IA', where: 'Grecia', note: '37 de participanți din 4 țări' },
      { when: 'aug. 2026', what: 'Proiect Erasmus+: sănătate mintală și fizică', where: 'Lituania', note: '42 de participanți din 7 țări' },
    ],
    work: [
      { what: 'Munci ocazionale', note: 'Muncă fizică solicitantă – am rezistență, sunt de încredere și duc la capăt ce încep.' },
      { what: 'Organizarea evenimentelor școlare', where: 'Budapesti Fazekas Mihály Gimnázium' },
    ],
    volunteering: [
      { what: 'World Athletics Ultimate Championship', note: 'Voluntar' },
      { what: 'DevYou – Developing Youth Foundation (Fejlődő Ifjúságért Alapítvány)', note: 'Voluntar' },
      { what: 'Tudatos Ifjúságért Alapítvány (Fundația pentru un Tineret Conștient)', note: 'Voluntar în programe pentru tineri' },
    ],
    languages: [['Maghiară', 'nativă'], ['Engleză', 'B2'], ['Germană', 'A2'], ['Spaniolă', 'în curs de învățare'], ['Georgiană', 'în curs de învățare'], ['Portugheză', 'în curs de învățare']],
    sport: [`Recorduri personale: ${PB}`, 'Split 10k – locul 2 la general (34:40)', 'Lotul național de skyrunning al Ungariei – Campionatul Mondial de Tineret 2026 (Vertical și Sky)'],
    interests: ['Rețele de transport și infrastructură', 'Geografie și hărți', 'Alte culturi și limbi', 'Lucrul cu tinerii – youth work (din 2026)'],
    hobbies: ['Alergare de performanță', 'Înot', 'Călătorii low-budget'],
    self: ['Perseverent – foarte rar obosesc', 'Am o imagine de ansamblu și atenție la detalii', 'Sunt atent la cât mai multe lucruri – și la oamenii din jurul meu', 'Elev eminent la școală', 'Învăț repede când ceva mă interesează', 'Mă implic repede și din toată inima'],
    print: 'Tipărește / salvează ca PDF',
    close: 'Mergi la blog',
  },
  el: {
    toggle: 'Βιογραφικό',
    title: 'Βιογραφικό σημείωμα',
    role: 'Μαθητής τελευταίας τάξης · μελλοντικός φοιτητής Γεωγραφίας στο ELTE · αθλητής εθνικής ομάδας skyrunning',
    location: 'Βουδαπέστη, Ουγγαρία',
    profile:
      'Μαθητής τελευταίας τάξης στο Budapesti Fazekas Mihály Gimnázium (μαθηματικά και γεωγραφία σε αυξημένο επίπεδο)· συνεχίζω σπουδές Γεωγραφίας στο ELTE. Είμαι ο ένατος από δέκα αδέρφια. Μένω στη Βουδαπέστη. Με ενδιαφέρει το πώς λειτουργούν τα δίκτυα μεταφορών και οι υποδομές, καθώς και η γεωγραφία και οι χάρτες. Συμμετείχα σε δύο προγράμματα νέων Erasmus+, κάνω τακτικά εθελοντισμό και είμαι ανθεκτικός και αξιόπιστος σε σωματικά απαιτητική δουλειά. Αθλητής της εθνικής ομάδας skyrunning της Ουγγαρίας.',
    h: { profile: 'Προφίλ', education: 'Εκπαίδευση', erasmus: 'Διεθνή προγράμματα', work: 'Επαγγελματική εμπειρία', volunteering: 'Εθελοντισμός', languages: 'Γλώσσες', sport: 'Αθλητισμός', interests: 'Ενδιαφέροντα', hobbies: 'Χόμπι', contact: 'Επικοινωνία', self: 'Πώς βλέπω τον εαυτό μου' },
    education: [
      { when: '2016–2027', what: 'Budapesti Fazekas Mihály Gyakorló Általános Iskola és Gimnázium', where: 'Εξάχρονο σχολείο δευτεροβάθμιας, γενική κατεύθυνση – μαθηματικά και γεωγραφία σε αυξημένο επίπεδο', note: 'Άριστος μαθητής' },
      { when: '2027 –', what: 'Γεωγραφία', where: 'Πανεπιστήμιο Eötvös Loránd (ELTE), Βουδαπέστη', note: 'Μετά το λύκειο' },
    ],
    erasmus: [
      { when: 'Σεπ. 2026', what: 'Πρόγραμμα Erasmus+: ψηφιοποίηση και ΤΝ', where: 'Ελλάδα', note: '37 συμμετέχοντες από 4 χώρες' },
      { when: 'Αύγ. 2026', what: 'Πρόγραμμα Erasmus+: ψυχική και σωματική υγεία', where: 'Λιθουανία', note: '42 συμμετέχοντες από 7 χώρες' },
    ],
    work: [
      { what: 'Περιστασιακές δουλειές', note: 'Σωματικά απαιτητική δουλειά – έχω αντοχή, είμαι αξιόπιστος και τελειώνω ό,τι ξεκινάω.' },
      { what: 'Οργάνωση σχολικών εκδηλώσεων', where: 'Budapesti Fazekas Mihály Gimnázium' },
    ],
    volunteering: [
      { what: 'World Athletics Ultimate Championship', note: 'Εθελοντής' },
      { what: 'DevYou – Developing Youth Foundation (Fejlődő Ifjúságért Alapítvány)', note: 'Εθελοντής' },
      { what: 'Tudatos Ifjúságért Alapítvány (Ίδρυμα για μια Συνειδητή Νεολαία)', note: 'Εθελοντής σε προγράμματα νέων' },
    ],
    languages: [['Ουγγρικά', 'μητρική'], ['Αγγλικά', 'B2'], ['Γερμανικά', 'A2'], ['Ισπανικά', 'μαθαίνω'], ['Γεωργιανά', 'μαθαίνω'], ['Πορτογαλικά', 'μαθαίνω']],
    sport: [`Ατομικά ρεκόρ: ${PB}`, 'Split 10k – 2η θέση γενικής (34:40)', 'Εθνική ομάδα skyrunning Ουγγαρίας – Παγκόσμιο Πρωτάθλημα Νέων 2026 (Vertical και Sky)'],
    interests: ['Δίκτυα μεταφορών και υποδομές', 'Γεωγραφία και χάρτες', 'Άλλοι πολιτισμοί και γλώσσες', 'Εργασία με νέους – youth work (από το 2026)'],
    hobbies: ['Αγωνιστικό τρέξιμο', 'Κολύμβηση', 'Οικονομικά ταξίδια'],
    self: ['Επίμονος – πολύ σπάνια κουράζομαι', 'Βλέπω τη συνολική εικόνα και προσέχω τις λεπτομέρειες', 'Προσέχω όσο το δυνατόν περισσότερα – και τους ανθρώπους γύρω μου', 'Άριστος μαθητής στο σχολείο', 'Μαθαίνω γρήγορα όταν κάτι με ενδιαφέρει', 'Δεσμεύομαι γρήγορα και ολόψυχα'],
    print: 'Εκτύπωση / αποθήκευση ως PDF',
    close: 'Στο ιστολόγιο',
  },
  ka: {
    toggle: 'CV',
    title: 'რეზიუმე',
    role: 'დამამთავრებელი კლასის მოსწავლე · ELTE-ს გეოგრაფიის მომავალი სტუდენტი · სკაირანინგის ნაკრების სპორტსმენი',
    location: 'ბუდაპეშტი, უნგრეთი',
    profile:
      'ბუდაპეშტის ფაზეკაშ მიჰაის გიმნაზიის დამამთავრებელი კლასის მოსწავლე ვარ (მათემატიკა და გეოგრაფია გაძლიერებულად); სწავლას ELTE-ში გეოგრაფიაზე ვაგრძელებ. ათი და-ძმიდან მეცხრე ვარ. ბუდაპეშტში ვცხოვრობ. მაინტერესებს, როგორ მუშაობს სატრანსპორტო ქსელები და ინფრასტრუქტურა, ასევე გეოგრაფია და რუკები. ორ Erasmus+ ახალგაზრდულ პროექტში მივიღე მონაწილეობა, რეგულარულად ვარ მოხალისე და ფიზიკურად მძიმე სამუშაოშიც გამძლე და სანდო ვარ. უნგრეთის სკაირანინგის ნაკრების სპორტსმენი ვარ.',
    h: { profile: 'პროფილი', education: 'განათლება', erasmus: 'საერთაშორისო პროექტები', work: 'სამუშაო გამოცდილება', volunteering: 'მოხალისეობა', languages: 'ენები', sport: 'სპორტი', interests: 'ინტერესები', hobbies: 'ჰობი', contact: 'კონტაქტი', self: 'როგორ ვხედავ საკუთარ თავს' },
    education: [
      { when: '2016–2027', what: 'Budapesti Fazekas Mihály Gyakorló Általános Iskola és Gimnázium', where: 'ექვსწლიანი გიმნაზია, ზოგადი პროფილი – მათემატიკა და გეოგრაფია გაძლიერებულად', note: 'ფრიადოსანი' },
      { when: '2027 –', what: 'გეოგრაფია', where: 'ეოტვოშ ლორანდის უნივერსიტეტი (ELTE), ბუდაპეშტი', note: 'სკოლის დამთავრების შემდეგ' },
    ],
    erasmus: [
      { when: '2026 სექტ.', what: 'Erasmus+ პროექტი: ციფრიზაცია და ხელოვნური ინტელექტი', where: 'საბერძნეთი', note: '37 მონაწილე 4 ქვეყნიდან' },
      { when: '2026 აგვ.', what: 'Erasmus+ პროექტი: ფსიქიკური და ფიზიკური ჯანმრთელობა', where: 'ლიტვა', note: '42 მონაწილე 7 ქვეყნიდან' },
    ],
    work: [
      { what: 'დროებითი სამუშაოები', note: 'ფიზიკურად მძიმე სამუშაო – გამძლე და საიმედო ვარ, რასაც დავიწყებ, ვამთავრებ.' },
      { what: 'სასკოლო ღონისძიებების ორგანიზება', where: 'Budapesti Fazekas Mihály Gimnázium' },
    ],
    volunteering: [
      { what: 'World Athletics Ultimate Championship', note: 'მოხალისე' },
      { what: 'DevYou – Developing Youth Foundation (Fejlődő Ifjúságért Alapítvány)', note: 'მოხალისე' },
      { what: 'Tudatos Ifjúságért Alapítvány (ცნობიერი ახალგაზრდობის ფონდი)', note: 'მოხალისე ახალგაზრდულ პროგრამებში' },
    ],
    languages: [['უნგრული', 'მშობლიური'], ['ინგლისური', 'B2'], ['გერმანული', 'A2'], ['ესპანური', 'ვსწავლობ'], ['ქართული', 'ვსწავლობ'], ['პორტუგალიური', 'ვსწავლობ']],
    sport: [`პირადი რეკორდები: ${PB}`, 'Split 10k – აბსოლუტურ ჩათვლაში მე-2 ადგილი (34:40)', 'უნგრეთის სკაირანინგის ნაკრები – ახალგაზრდული მსოფლიო ჩემპიონატი 2026 (ვერტიკალი და სკაი)'],
    interests: ['სატრანსპორტო ქსელები და ინფრასტრუქტურა', 'გეოგრაფია და რუკები', 'სხვა კულტურები და ენები', 'ახალგაზრდებთან მუშაობა – youth work (2026 წლიდან)'],
    hobbies: ['შეჯიბრებითი სირბილი', 'ცურვა', 'იაფი მოგზაურობა'],
    self: ['გამძლე ვარ – ძალიან იშვიათად ვიღლები', 'კარგად ვხედავ მთლიან სურათს და ყურადღებას ვაქცევ დეტალებს', 'ვცდილობ, რაც შეიძლება ბევრ რამეს მივაქციო ყურადღება – ჩემ გარშემო მყოფ ადამიანებსაც', 'სკოლაში ფრიადოსანი ვარ', 'სწრაფად ვსწავლობ, თუ რამე მაინტერესებს', 'სწრაფად და მთელი გულით ვერთვები საქმეში'],
    print: 'ამობეჭდვა / PDF-ად შენახვა',
    close: 'ბლოგზე გადასვლა',
  },
};
