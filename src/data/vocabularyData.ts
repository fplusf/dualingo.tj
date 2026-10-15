import { VocabularyWord } from '../types';

export const VOCABULARY_LIST: VocabularyWord[] = [
  // Салом ва муошират
  {
    id: 'v1',
    en: 'Hello',
    tj: 'Салом',
    transcription: '[həˈloʊ]',
    tajikPhonetic: '[ҳело́у]',
    category: 'Салом',
    partOfSpeech: 'phrase',
    exampleEn: 'Hello, my good friend!',
    exampleTj: 'Салом, дӯсти хуби ман!'
  },
  {
    id: 'v2',
    en: 'Good morning',
    tj: 'Субҳ ба хайр',
    transcription: '[ɡʊd ˈmɔːrnɪŋ]',
    tajikPhonetic: '[гуд мо́рнинг]',
    category: 'Салом',
    partOfSpeech: 'phrase',
    exampleEn: 'Good morning everyone!',
    exampleTj: 'Субҳ ба хайр ба ҳама!'
  },
  {
    id: 'v3',
    en: 'Good night',
    tj: 'Шаб ба хайр',
    transcription: '[ɡʊd naɪt]',
    tajikPhonetic: '[гуд найт]',
    category: 'Салом',
    partOfSpeech: 'phrase',
    exampleEn: 'Good night, sleep well.',
    exampleTj: 'Шаб ба хайр, хуб хоб равед.'
  },
  {
    id: 'v4',
    en: 'Thank you',
    tj: 'Ташаккур / Раҳмат',
    transcription: '[θæŋk juː]',
    tajikPhonetic: '[сэнк ю]',
    category: 'Салом',
    partOfSpeech: 'phrase',
    exampleEn: 'Thank you very much for your help.',
    exampleTj: 'Ташаккури зиёд барои кӯмакатон.'
  },
  {
    id: 'v5',
    en: 'Please',
    tj: 'Лутфан / Илтимос',
    transcription: '[pliːz]',
    tajikPhonetic: '[плииз]',
    category: 'Салом',
    partOfSpeech: 'phrase',
    exampleEn: 'Please come in.',
    exampleTj: 'Лутфан ворид шавед.'
  },
  {
    id: 'v6',
    en: 'Goodbye',
    tj: 'Хайр / То боздид',
    transcription: '[ɡʊdˈbaɪ]',
    tajikPhonetic: '[гудба́й]',
    category: 'Салом',
    partOfSpeech: 'phrase',
    exampleEn: 'Goodbye, see you tomorrow!',
    exampleTj: 'Хайр, фардо мебинем!'
  },
  {
    id: 'v7',
    en: 'Welcome',
    tj: 'Хуш омадед',
    transcription: '[ˈwɛlkəm]',
    tajikPhonetic: '[ве́лкам]',
    category: 'Салом',
    partOfSpeech: 'phrase',
    exampleEn: 'Welcome to Tajikistan!',
    exampleTj: 'Ба Тоҷикистон хуш омадед!'
  },
  {
    id: 'v8',
    en: 'Sorry',
    tj: 'Бубахшед / Узр',
    transcription: '[ˈsɑːri]',
    tajikPhonetic: '[со́ри]',
    category: 'Салом',
    partOfSpeech: 'phrase',
    exampleEn: 'I am sorry, I am late.',
    exampleTj: 'Бубахшед, ман дер мондам.'
  },

  // Оила
  {
    id: 'v9',
    en: 'Family',
    tj: 'Оила / Хонавода',
    transcription: '[ˈfæməli]',
    tajikPhonetic: '[фэ́мели]',
    category: 'Оила',
    partOfSpeech: 'noun',
    exampleEn: 'I love my family.',
    exampleTj: 'Ман оилаамро дӯст медорам.'
  },
  {
    id: 'v10',
    en: 'Father',
    tj: 'Падар / Падарҷон',
    transcription: '[ˈfɑːðər]',
    tajikPhonetic: '[фа́зер]',
    category: 'Оила',
    partOfSpeech: 'noun',
    exampleEn: 'My father is a kind man.',
    exampleTj: 'Падари ман марди меҳрубон аст.'
  },
  {
    id: 'v11',
    en: 'Mother',
    tj: 'Модар / Модарҷон',
    transcription: '[ˈmʌðər]',
    tajikPhonetic: '[ма́зер]',
    category: 'Оила',
    partOfSpeech: 'noun',
    exampleEn: 'My mother is cooking dinner.',
    exampleTj: 'Модарам шом омода мекунад.'
  },
  {
    id: 'v12',
    en: 'Brother',
    tj: 'Бародар / Додар',
    transcription: '[ˈbrʌðər]',
    tajikPhonetic: '[бра́зер]',
    category: 'Оила',
    partOfSpeech: 'noun',
    exampleEn: 'My brother plays football.',
    exampleTj: 'Бародарам футбол бозӣ мекунад.'
  },
  {
    id: 'v13',
    en: 'Sister',
    tj: 'Хоҳар / Апа',
    transcription: '[ˈsɪstər]',
    tajikPhonetic: '[си́стер]',
    category: 'Оила',
    partOfSpeech: 'noun',
    exampleEn: 'Her sister is a student.',
    exampleTj: 'Хоҳари ӯ донишҷӯ аст.'
  },
  {
    id: 'v14',
    en: 'Son',
    tj: 'Писар / Фарзанд',
    transcription: '[sʌn]',
    tajikPhonetic: '[сан]',
    category: 'Оила',
    partOfSpeech: 'noun',
    exampleEn: 'He has a clever son.',
    exampleTj: 'Ӯ писари доно дорад.'
  },
  {
    id: 'v15',
    en: 'Daughter',
    tj: 'Духтар / Фарзанд',
    transcription: '[ˈdɔːtər]',
    tajikPhonetic: '[до́тер]',
    category: 'Оила',
    partOfSpeech: 'noun',
    exampleEn: 'Their daughter goes to school.',
    exampleTj: 'Духтари онҳо ба мактаб меравад.'
  },

  // Хӯрок ва нӯшокиҳо
  {
    id: 'v16',
    en: 'Bread',
    tj: 'Нон',
    transcription: '[brɛd]',
    tajikPhonetic: '[бред]',
    category: 'Хӯрок',
    partOfSpeech: 'noun',
    exampleEn: 'Fresh bread smells delicious.',
    exampleTj: 'Нони гарм бӯи хуш дорад.'
  },
  {
    id: 'v17',
    en: 'Water',
    tj: 'Об',
    transcription: '[ˈwɔːtər]',
    tajikPhonetic: '[во́тер]',
    category: 'Хӯрок',
    partOfSpeech: 'noun',
    exampleEn: 'Can I have some water, please?',
    exampleTj: 'Метавонам каме об гирам, лутфан?'
  },
  {
    id: 'v18',
    en: 'Tea',
    tj: 'Чой',
    transcription: '[tiː]',
    tajikPhonetic: '[тии]',
    category: 'Хӯрок',
    partOfSpeech: 'noun',
    exampleEn: 'We always drink hot tea.',
    exampleTj: 'Мо ҳамеша чойи гарм менӯшем.'
  },
  {
    id: 'v19',
    en: 'Apple',
    tj: 'Себ',
    transcription: '[ˈæpl]',
    tajikPhonetic: '[эппл]',
    category: 'Хӯрок',
    partOfSpeech: 'noun',
    exampleEn: 'An apple a day keeps the doctor away.',
    exampleTj: 'Хӯрдани як себ дар рӯз инсонро солим нигоҳ медорад.'
  },
  {
    id: 'v20',
    en: 'Rice',
    tj: 'Биринҷ / Ош',
    transcription: '[raɪs]',
    tajikPhonetic: '[райс]',
    category: 'Хӯрок',
    partOfSpeech: 'noun',
    exampleEn: 'Tajik plov is made with rice.',
    exampleTj: 'Оши палави тоҷикӣ аз биринҷ пухта мешавад.'
  },
  {
    id: 'v21',
    en: 'Meat',
    tj: 'Гӯшт',
    transcription: '[miːt]',
    tajikPhonetic: '[миит]',
    category: 'Хӯрок',
    partOfSpeech: 'noun',
    exampleEn: 'He prefers lamb meat.',
    exampleTj: 'Ӯ гӯшти гӯсфандро меписандад.'
  },
  {
    id: 'v22',
    en: 'Milk',
    tj: 'Шир',
    transcription: '[mɪlk]',
    tajikPhonetic: '[милк]',
    category: 'Хӯрок',
    partOfSpeech: 'noun',
    exampleEn: 'Drink warm milk before sleep.',
    exampleTj: 'Пеш аз хоб шири гарм нӯшед.'
  },

  // Шаҳр ва сафар
  {
    id: 'v23',
    en: 'City',
    tj: 'Шаҳр',
    transcription: '[ˈsɪti]',
    tajikPhonetic: '[си́ти]',
    category: 'Шаҳр',
    partOfSpeech: 'noun',
    exampleEn: 'Dushanbe is a beautiful city.',
    exampleTj: 'Душанбе шаҳри зебо аст.'
  },
  {
    id: 'v24',
    en: 'Airport',
    tj: 'Фурудгоҳ',
    transcription: '[ˈɛrpɔːrt]',
    tajikPhonetic: '[э́йрпорт]',
    category: 'Шаҳр',
    partOfSpeech: 'noun',
    exampleEn: 'The plane landed at the airport.',
    exampleTj: 'Ҳавопаймо дар фурудгоҳ фуруд омад.'
  },
  {
    id: 'v25',
    en: 'Hotel',
    tj: 'Меҳмонхона',
    transcription: '[hoʊˈtɛl]',
    tajikPhonetic: '[ҳоуте́л]',
    category: 'Шаҳр',
    partOfSpeech: 'noun',
    exampleEn: 'We reserved a room at the hotel.',
    exampleTj: 'Мо дар меҳмонхона ҳуҷра фармоиш додем.'
  },
  {
    id: 'v26',
    en: 'Street',
    tj: 'Кӯча / Хиёбон',
    transcription: '[striːt]',
    tajikPhonetic: '[стриит]',
    category: 'Шаҳр',
    partOfSpeech: 'noun',
    exampleEn: 'Rudaki is the main street.',
    exampleTj: 'Рӯдакӣ хиёбони асосӣ мебошад.'
  },
  {
    id: 'v27',
    en: 'Hospital',
    tj: 'Беморхона',
    transcription: '[ˈhɑːspɪtl]',
    tajikPhonetic: '[ҳо́спитл]',
    category: 'Шаҳр',
    partOfSpeech: 'noun',
    exampleEn: 'The hospital is near the center.',
    exampleTj: 'Беморхона наздики марказ аст.'
  },

  // Феълҳо (Муҳимтарин феълҳои гуфтугӯӣ)
  {
    id: 'v28',
    en: 'Speak',
    tj: 'Суҳбат кардан / Ҳарф задан',
    transcription: '[spiːk]',
    tajikPhonetic: '[спиик]',
    category: 'Феълҳо',
    partOfSpeech: 'verb',
    exampleEn: 'Do you speak English?',
    exampleTj: 'Оё шумо бо забони англисӣ ҳарф мезанед?'
  },
  {
    id: 'v29',
    en: 'Live',
    tj: 'Зиндагӣ кардан / Иқомат кардан',
    transcription: '[lɪv]',
    tajikPhonetic: '[лив]',
    category: 'Феълҳо',
    partOfSpeech: 'verb',
    exampleEn: 'I live in Khujand.',
    exampleTj: 'Ман дар Хуҷанд зиндагӣ мекунам.'
  },
  {
    id: 'v30',
    en: 'Work',
    tj: 'Кор кардан',
    transcription: '[wɜːrk]',
    tajikPhonetic: '[вөрк]',
    category: 'Феълҳо',
    partOfSpeech: 'verb',
    exampleEn: 'He works hard every day.',
    exampleTj: 'Ӯ ҳар рӯз сахт кор мекунад.'
  },
  {
    id: 'v31',
    en: 'Learn',
    tj: 'Омӯхтан / Ёд гирифтан',
    transcription: '[lɜːrn]',
    tajikPhonetic: '[лөрн]',
    category: 'Феълҳо',
    partOfSpeech: 'verb',
    exampleEn: 'I learn new English words every day.',
    exampleTj: 'Ман ҳар рӯз калимаҳои нави англисиро меомӯзам.'
  },
  {
    id: 'v32',
    en: 'Want',
    tj: 'Хостан / Майл доштан',
    transcription: '[wɑːnt]',
    tajikPhonetic: '[вонт]',
    category: 'Феълҳо',
    partOfSpeech: 'verb',
    exampleEn: 'I want to travel the world.',
    exampleTj: 'Ман мехоҳам ҷаҳонро сайр кунам.'
  },

  // Сифатҳо
  {
    id: 'v33',
    en: 'Good',
    tj: 'Хуб / Нек',
    transcription: '[ɡʊd]',
    tajikPhonetic: '[гуд]',
    category: 'Сифатҳо',
    partOfSpeech: 'adjective',
    exampleEn: 'This is very good.',
    exampleTj: 'Ин хеле хуб аст.'
  },
  {
    id: 'v34',
    en: 'Beautiful',
    tj: 'Зебо / Хушрӯй',
    transcription: '[ˈbjuːtɪfl]',
    tajikPhonetic: '[бю́тифул]',
    category: 'Сифатҳо',
    partOfSpeech: 'adjective',
    exampleEn: 'Tajikistan has beautiful mountains.',
    exampleTj: 'Тоҷикистон кӯҳҳои зебо дорад.'
  },
  {
    id: 'v35',
    en: 'Happy',
    tj: 'Хушбахт / Шодмон',
    transcription: '[ˈhæpi]',
    tajikPhonetic: '[ҳэ́ппи]',
    category: 'Сифатҳо',
    partOfSpeech: 'adjective',
    exampleEn: 'We are very happy today.',
    exampleTj: 'Мо имрӯз хеле хушбахтем.'
  },
  {
    id: 'v36',
    en: 'Big',
    tj: 'Калон / Бузург',
    transcription: '[bɪɡ]',
    tajikPhonetic: '[биг]',
    category: 'Сифатҳо',
    partOfSpeech: 'adjective',
    exampleEn: 'He has a big heart.',
    exampleTj: 'Ӯ дили калон дорад.'
  },
  {
    id: 'v37',
    en: 'Fast',
    tj: 'Тез / Суръатбахш',
    transcription: '[fæst]',
    tajikPhonetic: '[фэст]',
    category: 'Сифатҳо',
    partOfSpeech: 'adjective',
    exampleEn: 'The internet is very fast here.',
    exampleTj: 'Инҷо интернет хеле тез аст.'
  },

  // Касбҳо
  {
    id: 'v38',
    en: 'Teacher',
    tj: 'Муаллим / Омӯзгор',
    transcription: '[ˈtiːtʃər]',
    tajikPhonetic: '[ти́чер]',
    category: 'Кор',
    partOfSpeech: 'noun',
    exampleEn: 'Our teacher explains clearly.',
    exampleTj: 'Муаллими мо возеҳ мефаҳмонад.'
  },
  {
    id: 'v39',
    en: 'Doctor',
    tj: 'Духтур / Табиб',
    transcription: '[ˈdɑːktər]',
    tajikPhonetic: '[до́ктор]',
    category: 'Кор',
    partOfSpeech: 'noun',
    exampleEn: 'The doctor helped the patient.',
    exampleTj: 'Табиб ба бемор кумак кард.'
  },
  {
    id: 'v40',
    en: 'Student',
    tj: 'Донишҷӯ / Толибилмон',
    transcription: '[ˈstuːdnt]',
    tajikPhonetic: '[стю́дент]',
    category: 'Кор',
    partOfSpeech: 'noun',
    exampleEn: 'He is an active student.',
    exampleTj: 'Ӯ донишҷӯи фаъол аст.'
  }
];
