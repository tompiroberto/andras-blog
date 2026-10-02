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
  };
  education: CvItem[];
  erasmus: CvItem[];
  work: CvItem[];
  volunteering: CvItem[];
  languages: [string, string][];
  sport: string[];
  interests: string[];
  hobbies: string[];
  print: string;
  close: string;
  location: string;
}

const PB = '3 km 9:29 · 5 km 16:20 · 10 km 34:40';

export const CV: Record<Lang, CvText> = {
  en: {
    toggle: 'CV',
    title: 'Curriculum Vitae',
    role: 'Final-year student · future geography student at ELTE',
    location: 'Budapest, Hungary',
    profile:
      'Final-year student at Budapesti Fazekas Mihály Gimnázium on the geography track, going on to study geography at ELTE. Tough and reliable in physically demanding work, an experienced volunteer at international sports events and a participant in two Erasmus+ youth projects. Interested in how places, transport networks and infrastructure work.',
    h: { profile: 'Profile', education: 'Education', erasmus: 'International projects', work: 'Work experience', volunteering: 'Volunteering', languages: 'Languages', sport: 'Sport', interests: 'Interests', hobbies: 'Hobbies', contact: 'Contact' },
    education: [
      { when: '2027 –', what: 'Geography', where: 'Eötvös Loránd University (ELTE), Budapest', note: 'Starting after secondary school' },
      { when: '– 2027', what: 'Secondary school, geography track', where: 'Budapesti Fazekas Mihály Gimnázium' },
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
      { what: 'World Athletics Championships', where: 'Budapest', note: 'Volunteer' },
      { what: 'Youth and Lifelong Learning Foundation', note: 'Volunteer in youth programmes' },
    ],
    languages: [['Hungarian', 'native'], ['English', 'B2'], ['German', 'A2'], ['Spanish', 'learning'], ['Georgian', 'learning']],
    sport: [`Personal bests: ${PB}`, 'Split 10k – 2nd overall (34:40)', 'Youth Skyrunning World Championships 2026'],
    interests: ['Geography and maps', 'Transport networks and infrastructure', 'Other cultures and languages', 'Low-budget travel'],
    hobbies: ['Running and racing', 'Long walks and bike rides (70 km on foot, 215 km by bike)', 'GeoGuessr', 'Travelling'],
    print: 'Print / save as PDF',
    close: 'Go to the blog',
  },
  hu: {
    toggle: 'Önéletrajz',
    title: 'Önéletrajz',
    role: 'Végzős gimnazista · leendő ELTE-s földrajz szakos',
    location: 'Budapest, Magyarország',
    profile:
      'Végzős diák a Budapesti Fazekas Mihály Gimnáziumban, földrajz irányban tanulok tovább az ELTE-n. Fizikailag megterhelő munkában is kitartó és megbízható vagyok, nemzetközi sporteseményeken önkénteskedtem, és két Erasmus+ ifjúsági projektben vettem részt. Érdekel, hogyan működnek a helyek, a közlekedési hálózatok és az infrastruktúra.',
    h: { profile: 'Bemutatkozás', education: 'Tanulmányok', erasmus: 'Nemzetközi projektek', work: 'Munkatapasztalat', volunteering: 'Önkéntesség', languages: 'Nyelvek', sport: 'Sport', interests: 'Érdeklődés', hobbies: 'Hobbik', contact: 'Elérhetőség' },
    education: [
      { when: '2027 –', what: 'Földrajz', where: 'Eötvös Loránd Tudományegyetem (ELTE), Budapest', note: 'Az érettségi után kezdem' },
      { when: '– 2027', what: 'Gimnázium, földrajz irány', where: 'Budapesti Fazekas Mihály Gimnázium' },
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
      { what: 'Atlétikai világbajnokság', where: 'Budapest', note: 'Önkéntes' },
      { what: 'Youth and Lifelong Learning Foundation (ifjúsági alapítvány)', note: 'Önkéntes ifjúsági programokban' },
    ],
    languages: [['magyar', 'anyanyelv'], ['angol', 'B2'], ['német', 'A2'], ['spanyol', 'tanulom'], ['grúz', 'tanulom']],
    sport: [`Egyéni csúcsok: ${PB}`, 'Split 10k – abszolút 2. hely (34:40)', 'Ifjúsági skyrunning-világbajnokság 2026'],
    interests: ['Földrajz és térképek', 'Közlekedési hálózatok és infrastruktúra', 'Más kultúrák és nyelvek', 'Olcsó utazás'],
    hobbies: ['Futás és versenyzés', 'Hosszú gyaloglások és biciklitúrák (70 km gyalog, 215 km biciklivel)', 'GeoGuessr', 'Utazás'],
    print: 'Nyomtatás / mentés PDF-be',
    close: 'Tovább a blogra',
  },
  pt: {
    toggle: 'CV',
    title: 'Curriculum Vitae',
    role: 'Finalista do secundário · futuro estudante de Geografia na ELTE',
    location: 'Budapeste, Hungria',
    profile:
      'Finalista na Budapesti Fazekas Mihály Gimnázium, na área de Geografia, e vou continuar a estudar Geografia na ELTE. Resistente e de confiança em trabalho fisicamente exigente, voluntário com experiência em eventos desportivos internacionais e participante em dois projetos juvenis Erasmus+. Interessa-me como funcionam os lugares, as redes de transporte e as infraestruturas.',
    h: { profile: 'Perfil', education: 'Formação', erasmus: 'Projetos internacionais', work: 'Experiência profissional', volunteering: 'Voluntariado', languages: 'Línguas', sport: 'Desporto', interests: 'Interesses', hobbies: 'Passatempos', contact: 'Contacto' },
    education: [
      { when: '2027 –', what: 'Geografia', where: 'Universidade Eötvös Loránd (ELTE), Budapeste', note: 'Depois do secundário' },
      { when: '– 2027', what: 'Ensino secundário, área de Geografia', where: 'Budapesti Fazekas Mihály Gimnázium' },
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
      { what: 'Campeonato do Mundo de Atletismo', where: 'Budapeste', note: 'Voluntário' },
      { what: 'Youth and Lifelong Learning Foundation', note: 'Voluntário em programas juvenis' },
    ],
    languages: [['Húngaro', 'nativo'], ['Inglês', 'B2'], ['Alemão', 'A2'], ['Espanhol', 'a aprender'], ['Georgiano', 'a aprender']],
    sport: [`Recordes pessoais: ${PB}`, 'Split 10k – 2.º lugar absoluto (34:40)', 'Campeonato do Mundo Jovem de Skyrunning 2026'],
    interests: ['Geografia e mapas', 'Redes de transporte e infraestruturas', 'Outras culturas e línguas', 'Viagens low-cost'],
    hobbies: ['Corrida e provas', 'Longas caminhadas e voltas de bicicleta (70 km a pé, 215 km de bicicleta)', 'GeoGuessr', 'Viajar'],
    print: 'Imprimir / guardar em PDF',
    close: 'Ir para o blog',
  },
  ro: {
    toggle: 'CV',
    title: 'Curriculum Vitae',
    role: 'Elev în anul terminal · viitor student la Geografie, ELTE',
    location: 'Budapesta, Ungaria',
    profile:
      'Elev în anul terminal la Budapesti Fazekas Mihály Gimnázium, profil geografie; îmi continui studiile la Geografie la ELTE. Rezistent și de încredere în munca fizică solicitantă, voluntar cu experiență la evenimente sportive internaționale și participant la două proiecte de tineret Erasmus+. Mă interesează cum funcționează locurile, rețelele de transport și infrastructura.',
    h: { profile: 'Profil', education: 'Educație', erasmus: 'Proiecte internaționale', work: 'Experiență de muncă', volunteering: 'Voluntariat', languages: 'Limbi', sport: 'Sport', interests: 'Interese', hobbies: 'Hobby-uri', contact: 'Contact' },
    education: [
      { when: '2027 –', what: 'Geografie', where: 'Universitatea Eötvös Loránd (ELTE), Budapesta', note: 'După liceu' },
      { when: '– 2027', what: 'Liceu, profil geografie', where: 'Budapesti Fazekas Mihály Gimnázium' },
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
      { what: 'Campionatul Mondial de Atletism', where: 'Budapesta', note: 'Voluntar' },
      { what: 'Youth and Lifelong Learning Foundation', note: 'Voluntar în programe pentru tineri' },
    ],
    languages: [['Maghiară', 'nativă'], ['Engleză', 'B2'], ['Germană', 'A2'], ['Spaniolă', 'în curs de învățare'], ['Georgiană', 'în curs de învățare']],
    sport: [`Recorduri personale: ${PB}`, 'Split 10k – locul 2 la general (34:40)', 'Campionatul Mondial de Skyrunning pentru Tineret 2026'],
    interests: ['Geografie și hărți', 'Rețele de transport și infrastructură', 'Alte culturi și limbi', 'Călătorii low-cost'],
    hobbies: ['Alergare și concursuri', 'Drumeții lungi și ture cu bicicleta (70 km pe jos, 215 km cu bicicleta)', 'GeoGuessr', 'Călătorii'],
    print: 'Tipărește / salvează ca PDF',
    close: 'Mergi la blog',
  },
  el: {
    toggle: 'Βιογραφικό',
    title: 'Βιογραφικό σημείωμα',
    role: 'Μαθητής τελευταίας τάξης · μελλοντικός φοιτητής Γεωγραφίας στο ELTE',
    location: 'Βουδαπέστη, Ουγγαρία',
    profile:
      'Μαθητής τελευταίας τάξης στο Budapesti Fazekas Mihály Gimnázium, με κατεύθυνση Γεωγραφία· συνεχίζω σπουδές Γεωγραφίας στο ELTE. Αντέχω και είμαι αξιόπιστος σε σωματικά απαιτητική δουλειά, έχω εμπειρία ως εθελοντής σε διεθνείς αθλητικές διοργανώσεις και έχω συμμετάσχει σε δύο προγράμματα νέων Erasmus+. Με ενδιαφέρει πώς λειτουργούν οι τόποι, τα δίκτυα μεταφορών και οι υποδομές.',
    h: { profile: 'Προφίλ', education: 'Εκπαίδευση', erasmus: 'Διεθνή προγράμματα', work: 'Επαγγελματική εμπειρία', volunteering: 'Εθελοντισμός', languages: 'Γλώσσες', sport: 'Αθλητισμός', interests: 'Ενδιαφέροντα', hobbies: 'Χόμπι', contact: 'Επικοινωνία' },
    education: [
      { when: '2027 –', what: 'Γεωγραφία', where: 'Πανεπιστήμιο Eötvös Loránd (ELTE), Βουδαπέστη', note: 'Μετά το λύκειο' },
      { when: '– 2027', what: 'Λύκειο, κατεύθυνση Γεωγραφίας', where: 'Budapesti Fazekas Mihály Gimnázium' },
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
      { what: 'Παγκόσμιο Πρωτάθλημα Στίβου', where: 'Βουδαπέστη', note: 'Εθελοντής' },
      { what: 'Youth and Lifelong Learning Foundation', note: 'Εθελοντής σε προγράμματα νέων' },
    ],
    languages: [['Ουγγρικά', 'μητρική'], ['Αγγλικά', 'B2'], ['Γερμανικά', 'A2'], ['Ισπανικά', 'μαθαίνω'], ['Γεωργιανά', 'μαθαίνω']],
    sport: [`Ατομικά ρεκόρ: ${PB}`, 'Split 10k – 2η θέση γενικής (34:40)', 'Παγκόσμιο Πρωτάθλημα Skyrunning Νέων 2026'],
    interests: ['Γεωγραφία και χάρτες', 'Δίκτυα μεταφορών και υποδομές', 'Άλλοι πολιτισμοί και γλώσσες', 'Οικονομικά ταξίδια'],
    hobbies: ['Τρέξιμο και αγώνες', 'Μεγάλες πεζοπορίες και ποδηλατάδες (70 km με τα πόδια, 215 km με ποδήλατο)', 'GeoGuessr', 'Ταξίδια'],
    print: 'Εκτύπωση / αποθήκευση ως PDF',
    close: 'Στο ιστολόγιο',
  },
  ka: {
    toggle: 'CV',
    title: 'რეზიუმე',
    role: 'სკოლის დამამთავრებელი კლასის მოსწავლე · ELTE-ს გეოგრაფიის მომავალი სტუდენტი',
    location: 'ბუდაპეშტი, უნგრეთი',
    profile:
      'ვარ ბუდაპეშტის ფაზეკაშ მიჰაის გიმნაზიის დამამთავრებელი კლასის მოსწავლე, გეოგრაფიის მიმართულებით, და სწავლას ELTE-ში გეოგრაფიაზე ვაგრძელებ. ფიზიკურად მძიმე სამუშაოში გამძლე და საიმედო ვარ, საერთაშორისო სპორტულ ღონისძიებებზე მოხალისედ ვმუშაობდი და ორ Erasmus+ ახალგაზრდულ პროექტში მივიღე მონაწილეობა. მაინტერესებს, როგორ მუშაობს ადგილები, სატრანსპორტო ქსელები და ინფრასტრუქტურა.',
    h: { profile: 'პროფილი', education: 'განათლება', erasmus: 'საერთაშორისო პროექტები', work: 'სამუშაო გამოცდილება', volunteering: 'მოხალისეობა', languages: 'ენები', sport: 'სპორტი', interests: 'ინტერესები', hobbies: 'ჰობი', contact: 'კონტაქტი' },
    education: [
      { when: '2027 –', what: 'გეოგრაფია', where: 'ეოტვოშ ლორანდის უნივერსიტეტი (ELTE), ბუდაპეშტი', note: 'სკოლის დამთავრების შემდეგ' },
      { when: '– 2027', what: 'საშუალო სკოლა, გეოგრაფიის მიმართულება', where: 'Budapesti Fazekas Mihály Gimnázium' },
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
      { what: 'მსოფლიო ჩემპიონატი მძლეოსნობაში', where: 'ბუდაპეშტი', note: 'მოხალისე' },
      { what: 'Youth and Lifelong Learning Foundation', note: 'მოხალისე ახალგაზრდულ პროგრამებში' },
    ],
    languages: [['უნგრული', 'მშობლიური'], ['ინგლისური', 'B2'], ['გერმანული', 'A2'], ['ესპანური', 'ვსწავლობ'], ['ქართული', 'ვსწავლობ']],
    sport: [`პირადი რეკორდები: ${PB}`, 'Split 10k – აბსოლუტურ ჩათვლაში მე-2 ადგილი (34:40)', 'ახალგაზრდული სკაირანინგის მსოფლიო ჩემპიონატი 2026'],
    interests: ['გეოგრაფია და რუკები', 'სატრანსპორტო ქსელები და ინფრასტრუქტურა', 'სხვა კულტურები და ენები', 'იაფი მოგზაურობა'],
    hobbies: ['სირბილი და შეჯიბრებები', 'გრძელი ლაშქრობები და ველოსიპედით მოგზაურობა (70 კმ ფეხით, 215 კმ ველოსიპედით)', 'GeoGuessr', 'მოგზაურობა'],
    print: 'ამობეჭდვა / PDF-ად შენახვა',
    close: 'ბლოგზე გადასვლა',
  },
};
