import { Unit } from '../types';

export const UNITS_DATA: Unit[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    titleTj: 'Асосҳо ва Шиносоӣ',
    titleEn: 'Basics & Greetings',
    descriptionTj: 'Салом додан, шиносоӣ ва калимаҳои муҳимтарини рӯзмарра',
    color: '#58CC02', // Duolingo green
    lessons: [
      {
        id: 'u1-l1',
        unitId: 'unit-1',
        titleTj: 'Салом ва аҳволпурсӣ',
        titleEn: 'Hello & How are you',
        descriptionTj: 'Калимаҳои салом, хайрухуш ва эҳтиром бо забони англисӣ',
        xpReward: 15,
        gemReward: 5,
        iconName: 'HandMetal',
        taughtWordIds: ['v1', 'v2', 'v4', 'v5', 'v6'],
        grammarTip: {
          title: 'Салом додан дар забони англисӣ',
          content: 'Дар забони англисӣ калимаи "Hello" расмӣ ва "Hi" дӯстона мебошад. Барои пурсидани аҳвол "How are you?" гуфта мешавад, ки тарҷумааш "Шумо чӣ ҳол доред?" аст.',
          example: 'Hello! How are you? — Салом! Шумо чӣ хел?'
        },
        questions: [
          {
            id: 'u1-l1-q1',
            type: 'multiple-choice',
            promptTj: 'Калимаи «Салом» дар забони англисӣ чӣ мешавад?',
            options: ['Hello', 'Goodbye', 'Please', 'Thanks'],
            correctAnswer: 'Hello',
            phoneticTj: '[Ҳело́у]',
            audioText: 'Hello',
            explanationTj: '«Hello» маънои «Салом»-ро дорад.'
          },
          {
            id: 'u1-l1-q2',
            type: 'word-bank',
            promptTj: 'Ҷумлаи «Субҳ ба хайр!»-ро созед:',
            wordsPool: ['Good', 'morning', 'night', 'Hello', 'friend'],
            correctAnswerSentence: 'Good morning',
            phoneticTj: '[Гуд мо́рнинг]',
            audioText: 'Good morning',
            explanationTj: '«Good morning» ба маънои «Субҳ ба хайр» истифода мешавад.'
          },
          {
            id: 'u1-l1-q3',
            type: 'match-pairs',
            promptTj: 'Ҷуфтҳои мувофиқро пайваст кунед:',
            pairs: [
              { en: 'Hello', tj: 'Салом' },
              { en: 'Goodbye', tj: 'Хайр' },
              { en: 'Thank you', tj: 'Ташаккур' },
              { en: 'Please', tj: 'Лутфан' },
              { en: 'Yes', tj: 'Ҳа' }
            ],
            explanationTj: 'Офарин! Инҳо калимаҳои муҳимтарини муоширатанд.'
          },
          {
            id: 'u1-l1-q4',
            type: 'listening',
            promptTj: 'Овозро гӯш кунед ва калимаҳои шунидаро интихоб намоед:',
            audioText: 'How are you?',
            wordsPool: ['How', 'are', 'you', 'is', 'he', 'fine'],
            correctAnswerSentence: 'How are you',
            phoneticTj: '[Ҳо́у ар ю?]',
            explanationTj: '«How are you?» маънои «Аҳволатон чӣ тавр аст?» ё «Шумо чӣ хел?»-ро дорад.'
          },
          {
            id: 'u1-l1-q5',
            type: 'fill-blank',
            promptTj: 'Ҷои холиро пур кунед: «I am fine, _____ you.» (Ман хубам, ташаккур)',
            englishText: 'I am fine, _____ you.',
            options: ['thank', 'bye', 'hello', 'how'],
            correctAnswer: 'thank',
            phoneticTj: '[Ай эм файн, сэнк ю]',
            audioText: 'I am fine, thank you.',
            explanationTj: '«Thank you» маънои «Ташаккур» ё «Раҳмат»-ро дорад.'
          }
        ]
      },
      {
        id: 'u1-l2',
        unitId: 'unit-1',
        titleTj: 'Ном ва шиносоӣ',
        titleEn: 'Names & Introductions',
        descriptionTj: 'Гуфтани номи худ ва шиносоӣ бо дигарон',
        xpReward: 15,
        gemReward: 5,
        iconName: 'UserCheck',
        taughtWordIds: ['v7', 'v8', 'v38', 'v40'],
        grammarTip: {
          title: 'Гуфтани ном: My name is...',
          content: 'Барои гуфтани номи худ ибораи «My name is...» (Номи ман ... аст) ё «I am...» (Ман ... ҳастам) истифода мешавад.',
          example: 'My name is Farrukh. — Номи ман Фаррух аст.'
        },
        questions: [
          {
            id: 'u1-l2-q1',
            type: 'word-bank',
            promptTj: 'Ҷумларо тарҷума кунед: «Номи ман Алишер аст»',
            wordsPool: ['My', 'name', 'is', 'Alisher', 'Your', 'are'],
            correctAnswerSentence: 'My name is Alisher',
            phoneticTj: '[Май нейм из Алише́р]',
            audioText: 'My name is Alisher',
            explanationTj: '«My name is...» тарзи асосии муаррифии ном аст.'
          },
          {
            id: 'u1-l2-q2',
            type: 'multiple-choice',
            promptTj: 'Ибораи «Nice to meet you» чӣ маъно дорад?',
            options: ['Аз шиносоӣ шодам', 'Субҳ ба хайр', 'Номи шумо чист?', 'Хайр то боздид'],
            correctAnswer: 'Аз шиносоӣ шодам',
            phoneticTj: '[Найс ту миит ю]',
            audioText: 'Nice to meet you',
            explanationTj: 'Ҳангоми вохӯрӣ ва шиносоӣ ин ибора гуфта мешавад.'
          },
          {
            id: 'u1-l2-q3',
            type: 'match-pairs',
            promptTj: 'Калимаҳоро бо маънояшон пайваст кунед:',
            pairs: [
              { en: 'Name', tj: 'Ном' },
              { en: 'Friend', tj: 'Дӯст' },
              { en: 'Teacher', tj: 'Омӯзгор' },
              { en: 'Student', tj: 'Донишҷӯ' },
              { en: 'Welcome', tj: 'Хуш омадед' }
            ],
            explanationTj: 'Калимаҳои муфид барои шиносоӣ.'
          },
          {
            id: 'u1-l2-q4',
            type: 'fill-blank',
            promptTj: 'Ҷои холиро пур кунед: «What is your _____?» (Номи шумо чист?)',
            englishText: 'What is your _____?',
            options: ['name', 'friend', 'hello', 'good'],
            correctAnswer: 'name',
            phoneticTj: '[Вот из йор нейм?]',
            audioText: 'What is your name?',
            explanationTj: '«What is your name?» саволи классикӣ барои пурсидани ном мебошад.'
          }
        ]
      },
      {
        id: 'u1-l3',
        unitId: 'unit-1',
        titleTj: 'Рақамҳои 1 то 10 ва шумурдан',
        titleEn: 'Numbers 1 to 10',
        descriptionTj: 'Рақамҳои асосии англисӣ барои ҳисоб ва нархҳо',
        xpReward: 20,
        gemReward: 8,
        iconName: 'Hash',
        taughtWordIds: [],
        grammarTip: {
          title: 'Шумораи рақамҳо',
          content: 'Рақамҳо дар забони англисӣ барои муайян кардани миқдор ва ашёҳо пеш аз исм меоянд: "two books" (ду китоб).',
          example: 'One, two, three, four, five! — Як, ду, се, чор, панҷ!'
        },
        questions: [
          {
            id: 'u1-l3-q1',
            type: 'match-pairs',
            promptTj: 'Рақамҳоро бо тарҷумаашон пайваст кунед:',
            pairs: [
              { en: 'One', tj: 'Як' },
              { en: 'Two', tj: 'Ду' },
              { en: 'Three', tj: 'Се' },
              { en: 'Four', tj: 'Чор' },
              { en: 'Five', tj: 'Панҷ' }
            ],
            explanationTj: 'Рақамҳои асосии англисӣ.'
          },
          {
            id: 'u1-l3-q2',
            type: 'multiple-choice',
            promptTj: 'Рақами «10» бо англисӣ чӣ ном дорад?',
            options: ['Ten', 'Seven', 'Nine', 'Six'],
            correctAnswer: 'Ten',
            phoneticTj: '[Тен]',
            audioText: 'Ten',
            explanationTj: '«Ten» ба маънои рақами 10 (даҳ) аст.'
          },
          {
            id: 'u1-l3-q3',
            type: 'word-bank',
            promptTj: 'Ҷумларо созед: «Се дӯст»',
            wordsPool: ['Three', 'friends', 'Two', 'one', 'good'],
            correctAnswerSentence: 'Three friends',
            phoneticTj: '[Срии френдз]',
            audioText: 'Three friends',
            explanationTj: 'Дар забони англисӣ исм баъд аз рақам одатан ба шакли ҷамъ меояд (-s).'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    titleTj: 'Феъли «To Be» ва Ҷонишинҳо',
    titleEn: 'Verb "To Be" & Pronouns',
    descriptionTj: 'Асоси грамматикаи англисӣ: Ман ҳастам, Ту ҳастӣ, Ӯ ҳаст',
    color: '#1CB0F6', // Blue
    lessons: [
      {
        id: 'u2-l1',
        unitId: 'unit-2',
        titleTj: 'Ҷонишинҳои шахсӣ (Ман, Ту, Ӯ...)',
        titleEn: 'Personal Pronouns',
        descriptionTj: 'I, You, He, She, It, We, They',
        xpReward: 15,
        gemReward: 5,
        iconName: 'Users',
        taughtWordIds: ['v9', 'v10', 'v11'],
        grammarTip: {
          title: 'Фарқи ҷинс дар He ва She',
          content: 'Дар забони тоҷикӣ барои марду зан танҳо «Ӯ / Вай» мегӯем. Аммо дар англисӣ: «He» барои мардон, «She» барои занон ва «It» барои ашё ва ҳайвонот истифода мешавад!',
          example: 'He is a boy. She is a girl. It is a book.'
        },
        questions: [
          {
            id: 'u2-l1-q1',
            type: 'match-pairs',
            promptTj: 'Ҷонишинҳоро бо тарҷумаи тоҷикӣ пайваст кунед:',
            pairs: [
              { en: 'I', tj: 'Ман' },
              { en: 'You', tj: 'Ту / Шумо' },
              { en: 'He', tj: 'Ӯ (мард)' },
              { en: 'She', tj: 'Ӯ (зан)' },
              { en: 'We', tj: 'Мо' }
            ],
            explanationTj: 'Дар хотир доред: «He» барои мард, «She» барои зан.'
          },
          {
            id: 'u2-l1-q2',
            type: 'multiple-choice',
            promptTj: 'Кадоме аз инҳо маънои «Онҳо»-ро дорад?',
            options: ['They', 'We', 'You', 'She'],
            correctAnswer: 'They',
            phoneticTj: '[Зей]',
            audioText: 'They',
            explanationTj: '«They» маънои «Онҳо» мебошад.'
          },
          {
            id: 'u2-l1-q3',
            type: 'fill-blank',
            promptTj: '«_____ is my mother.» (Ӯ модари ман аст)',
            englishText: '_____ is my mother.',
            options: ['She', 'He', 'It', 'I'],
            correctAnswer: 'She',
            phoneticTj: '[Ши из май мазер]',
            audioText: 'She is my mother.',
            explanationTj: 'Чунки «mother» зан аст, ҷонишини «She» истифода мешавад.'
          }
        ]
      },
      {
        id: 'u2-l2',
        unitId: 'unit-2',
        titleTj: 'Шаклҳои Am, Is, Are',
        titleEn: 'Forms of "To Be"',
        descriptionTj: 'Чӣ гуна ҷумлаи «Ман донишҷӯ ҳастам» созем',
        xpReward: 20,
        gemReward: 8,
        iconName: 'Cpu',
        taughtWordIds: ['v35', 'v38', 'v40'],
        grammarTip: {
          title: 'Шаклҳои феъли To Be',
          content: 'I -> am (Ман ҳастам)\nHe / She / It -> is (Ӯ/Он ҳаст)\nYou / We / They -> are (Шумо/Мо/Онҳо ҳастед)',
          example: 'I am happy. — Ман хушбахтам.'
        },
        questions: [
          {
            id: 'u2-l2-q1',
            type: 'word-bank',
            promptTj: 'Ҷумларо тарҷума кунед: «Ман донишҷӯ ҳастам»',
            wordsPool: ['I', 'am', 'a', 'student', 'is', 'are', 'teacher'],
            correctAnswerSentence: 'I am a student',
            phoneticTj: '[Ай эм э стю́дент]',
            audioText: 'I am a student',
            explanationTj: 'Барои «I» ҳамеша «am» истифода мешавад.'
          },
          {
            id: 'u2-l2-q2',
            type: 'fill-blank',
            promptTj: '«We _____ from Tajikistan.» (Мо аз Тоҷикистон ҳастем)',
            englishText: 'We _____ from Tajikistan.',
            options: ['are', 'is', 'am', 'be'],
            correctAnswer: 'are',
            phoneticTj: '[Ви ар фром Таджикиста́н]',
            audioText: 'We are from Tajikistan.',
            explanationTj: 'Бо ҷонишини «We» ҳамеша шакли «are» меояд.'
          },
          {
            id: 'u2-l2-q3',
            type: 'multiple-choice',
            promptTj: 'Ҷумлаи саҳеҳро интихоб намоед:',
            options: ['He is happy', 'He am happy', 'He are happy', 'He be happy'],
            correctAnswer: 'He is happy',
            phoneticTj: '[Ҳи из ҳэ́ппи]',
            audioText: 'He is happy',
            explanationTj: 'Бо «He» шакли «is» истифода мешавад.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    titleTj: 'Хӯрок ва Нӯшокиҳо',
    titleEn: 'Food & Drinks',
    descriptionTj: 'Дар ошхона, чойхона ва супермаркет',
    color: '#FF9600', // Orange
    lessons: [
      {
        id: 'u3-l1',
        unitId: 'unit-3',
        titleTj: 'Хӯрокҳои асосӣ',
        titleEn: 'Basic Food Items',
        descriptionTj: 'Нон, об, чой, себ ва хӯрокҳои лазиз',
        xpReward: 15,
        gemReward: 5,
        iconName: 'Utensils',
        taughtWordIds: ['v16', 'v17', 'v18', 'v19', 'v20'],
        grammarTip: {
          title: 'Артиклҳои a ва an',
          content: 'Пеш аз исми шумурдашаванда бо садои ҳамсадо "a" меояд (a book, a cup). Агар бо садонок сар шавад, "an" меояд (an apple).',
          example: 'an apple (як себ), a cup of tea (як пиёла чой)'
        },
        questions: [
          {
            id: 'u3-l1-q1',
            type: 'match-pairs',
            promptTj: 'Хӯрокҳоро бо тарҷумаашон пайваст намоед:',
            pairs: [
              { en: 'Bread', tj: 'Нон' },
              { en: 'Water', tj: 'Об' },
              { en: 'Tea', tj: 'Чой' },
              { en: 'Apple', tj: 'Себ' },
              { en: 'Milk', tj: 'Шир' }
            ],
            explanationTj: 'Инҳо калимаҳои рӯзмарраи хӯрокворӣ мебошанд.'
          },
          {
            id: 'u3-l1-q2',
            type: 'word-bank',
            promptTj: 'Ҷумла созед: «Ман чой мехоҳам»',
            wordsPool: ['I', 'want', 'tea', 'bread', 'He', 'water'],
            correctAnswerSentence: 'I want tea',
            phoneticTj: '[Ай вонт тии]',
            audioText: 'I want tea',
            explanationTj: '«I want...» маънои «Ман ... мехоҳам» аст.'
          },
          {
            id: 'u3-l1-q3',
            type: 'multiple-choice',
            promptTj: 'Кадом калима бо артикли «an» меояд?',
            options: ['apple', 'book', 'tea', 'water'],
            correctAnswer: 'apple',
            phoneticTj: '[Эн эппл]',
            audioText: 'An apple',
            explanationTj: 'Чунки «apple» бо садоноки [æ] оғоз мешавад, бо «an» меояд.'
          }
        ]
      },
      {
        id: 'u3-l2',
        unitId: 'unit-3',
        titleTj: 'Дар қаҳвахона ё ошхона',
        titleEn: 'At the Cafe',
        descriptionTj: 'Фармоиш додани хӯрок бо эҳтиром',
        xpReward: 20,
        gemReward: 8,
        iconName: 'Coffee',
        taughtWordIds: ['v17', 'v18', 'v21', 'v22'],
        grammarTip: {
          title: 'Ибораи эҳтиромона: Please ва Can I have...',
          content: 'Ҳангоми фармоиш додани хӯрок гуфтани "Can I have... please?" хеле зебо ва боодобона аст.',
          example: 'Tea, please. — Чой, лутфан.'
        },
        questions: [
          {
            id: 'u3-l2-q1',
            type: 'word-bank',
            promptTj: 'Ҷумларо созед: «Об, лутфан»',
            wordsPool: ['Water', 'please', 'tea', 'thank', 'you'],
            correctAnswerSentence: 'Water please',
            phoneticTj: '[Во́тер плииз]',
            audioText: 'Water please',
            explanationTj: 'Ифодаи зуд ва хушмуомила барои дархости об.'
          },
          {
            id: 'u3-l2-q2',
            type: 'listening',
            promptTj: 'Гӯш кунед ва калимаҳоро чинед:',
            audioText: 'I like green tea',
            wordsPool: ['I', 'like', 'green', 'tea', 'black', 'coffee'],
            correctAnswerSentence: 'I like green tea',
            phoneticTj: '[Ай лайк гриин тии]',
            explanationTj: '«I like green tea» — Ман чойи кабудро дӯст медорам.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    titleTj: 'Оила ва Дӯстон',
    titleEn: 'Family & Friends',
    descriptionTj: 'Аъзоёни хонавода ва муносибатҳо',
    color: '#CE82FF', // Purple
    lessons: [
      {
        id: 'u4-l1',
        unitId: 'unit-4',
        titleTj: 'Аъзоёни оила',
        titleEn: 'Family Members',
        descriptionTj: 'Падар, модар, бародар ва хоҳар',
        xpReward: 15,
        gemReward: 5,
        iconName: 'HeartHandshake',
        taughtWordIds: ['v9', 'v10', 'v11', 'v12', 'v13', 'v14', 'v15'],
        grammarTip: {
          title: 'Пасванди соҳибияти «\'s»',
          content: 'Барои нишон додани моликият ба исм «\'s» илова мекунем: "My father\'s car" — Мошини падарам.',
          example: 'My sister\'s book — Китоби хоҳарам'
        },
        questions: [
          {
            id: 'u4-l1-q1',
            type: 'match-pairs',
            promptTj: 'Аъзоёни оиларо мувофиқ созед:',
            pairs: [
              { en: 'Father', tj: 'Падар' },
              { en: 'Mother', tj: 'Модар' },
              { en: 'Brother', tj: 'Бародар' },
              { en: 'Sister', tj: 'Хоҳар' },
              { en: 'Family', tj: 'Оила' }
            ],
            explanationTj: 'Калимаҳои муҳими пайванди хешутаборӣ.'
          },
          {
            id: 'u4-l1-q2',
            type: 'fill-blank',
            promptTj: '«This is my _____ .» (Ин бародари ман аст)',
            englishText: 'This is my _____ .',
            options: ['brother', 'tea', 'morning', 'city'],
            correctAnswer: 'brother',
            phoneticTj: '[Зис из май бра́зер]',
            audioText: 'This is my brother.',
            explanationTj: '«Brother» маънои бародарро дорад.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    titleTj: 'Шаҳр, Сафар ва Самтҳо',
    titleEn: 'City & Travel',
    descriptionTj: 'Дар кӯча, фурудгоҳ, меҳмонхона ва дарёфти роҳ',
    color: '#FF4B4B', // Coral Red
    lessons: [
      {
        id: 'u5-l1',
        unitId: 'unit-5',
        titleTj: 'Ҷойҳои шаҳр ва савол додани роҳ',
        titleEn: 'City Places & Directions',
        descriptionTj: 'Фурудгоҳ, меҳмонхона, кӯча ва куҷо будани онҳо',
        xpReward: 20,
        gemReward: 8,
        iconName: 'Compass',
        taughtWordIds: ['v23', 'v24', 'v25', 'v26', 'v27'],
        grammarTip: {
          title: 'Саволи «Where is...?»',
          content: '«Where is...?» маънои «Дар куҷост...?»-ро дорад. Масалан: Where is the hotel? — Меҳмонхона дар куҷост?',
          example: 'Where is the airport? — Фурудгоҳ дар куҷост?'
        },
        questions: [
          {
            id: 'u5-l1-q1',
            type: 'word-bank',
            promptTj: 'Ҷумларо созед: «Фурудгоҳ дар куҷост?»',
            wordsPool: ['Where', 'is', 'the', 'airport', 'hotel', 'here'],
            correctAnswerSentence: 'Where is the airport',
            phoneticTj: '[Вэ́р из зи э́йрпорт?]',
            audioText: 'Where is the airport?',
            explanationTj: 'Саволи калидӣ ҳангоми сафар.'
          },
          {
            id: 'u5-l1-q2',
            type: 'match-pairs',
            promptTj: 'Калимаҳои сафарро пайваст кунед:',
            pairs: [
              { en: 'Hotel', tj: 'Меҳмонхона' },
              { en: 'Street', tj: 'Кӯча' },
              { en: 'Taxi', tj: 'Такси' },
              { en: 'Hospital', tj: 'Беморхона' },
              { en: 'Airport', tj: 'Фурудгоҳ' }
            ],
            explanationTj: 'Ҷойҳои муҳим дар шаҳр.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-6',
    unitNumber: 6,
    titleTj: 'Замони ҳозираи оддӣ',
    titleEn: 'Present Simple Tense',
    descriptionTj: 'Амалҳои ҳаррӯза, одатҳо ва қоидаи пасванди «-s»',
    color: '#2B70C9', // Deep Blue
    lessons: [
      {
        id: 'u6-l1',
        unitId: 'unit-6',
        titleTj: 'Амалҳои муқаррарӣ (Present Simple)',
        titleEn: 'Daily Habits & Routine',
        descriptionTj: 'I live, You speak, He works',
        xpReward: 20,
        gemReward: 8,
        iconName: 'Clock',
        taughtWordIds: ['v28', 'v29', 'v30', 'v31', 'v32'],
        grammarTip: {
          title: 'Пасванди «-s» барои шахси сеюм',
          content: 'Вақте ки амалкунанда «He», «She» ё «It» аст, ба феъл пасванди «-s» ё «-es» ҳамроҳ мешавад:\nI live in Dushanbe -> He liveS in Dushanbe.',
          example: 'I speak Tajik. He speaks English.'
        },
        questions: [
          {
            id: 'u6-l1-q1',
            type: 'word-bank',
            promptTj: 'Ҷумла созед: «Ман бо забони англисӣ суҳбат мекунам»',
            wordsPool: ['I', 'speak', 'English', 'speaks', 'Tajik', 'live'],
            correctAnswerSentence: 'I speak English',
            phoneticTj: '[Ай спиик и́нглиш]',
            audioText: 'I speak English',
            explanationTj: 'Барои «I» феъл бе пасванди «-s» меояд.'
          },
          {
            id: 'u6-l1-q2',
            type: 'fill-blank',
            promptTj: '«He _____ in Tajikistan.» (Ӯ дар Тоҷикистон зиндагӣ мекунад)',
            englishText: 'He _____ in Tajikistan.',
            options: ['lives', 'live', 'living', 'lived'],
            correctAnswer: 'lives',
            phoneticTj: '[Ҳи ливз ин Таджикиста́н]',
            audioText: 'He lives in Tajikistan.',
            explanationTj: 'Чунки «He» шахси сеюм аст, феъл «lives» мешавад.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-7',
    unitNumber: 7,
    titleTj: 'Касбҳо ва Кор',
    titleEn: 'Jobs & Professions',
    descriptionTj: 'Касби шумо чист ва муоширати корӣ',
    color: '#059669', // Emerald
    lessons: [
      {
        id: 'u7-l1',
        unitId: 'unit-7',
        titleTj: 'Касбҳои маъмул',
        titleEn: 'Common Occupations',
        descriptionTj: 'Doctor, Teacher, Engineer, Student',
        xpReward: 20,
        gemReward: 8,
        iconName: 'Briefcase',
        taughtWordIds: ['v38', 'v39', 'v40'],
        grammarTip: {
          title: 'Касбҳо бо артикли a/an',
          content: 'Ҳангоми номбар кардани касби шахс гузоштани артикли «a» ё «an» ҳатмӣ аст: He is a doctor. She is a teacher.',
          example: 'I am a teacher. — Ман омӯзгорам.'
        },
        questions: [
          {
            id: 'u7-l1-q1',
            type: 'word-bank',
            promptTj: 'Ҷумла созед: «Ӯ табиб аст»',
            wordsPool: ['He', 'is', 'a', 'doctor', 'teacher', 'am'],
            correctAnswerSentence: 'He is a doctor',
            phoneticTj: '[Ҳи из э до́ктор]',
            audioText: 'He is a doctor',
            explanationTj: 'Дар англисӣ пеш аз касбҳо «a» ё «an» меояд.'
          },
          {
            id: 'u7-l1-q2',
            type: 'multiple-choice',
            promptTj: 'Калимаи «Doctor» чӣ маъно дорад?',
            options: ['Табиб / Духтур', 'Омӯзгор', 'Муҳандис', 'Ронанда'],
            correctAnswer: 'Табиб / Духтур',
            phoneticTj: '[До́ктор]',
            audioText: 'Doctor',
            explanationTj: '«Doctor» ба маънои табиб ё духтур истифода мешавад.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-8',
    unitNumber: 8,
    titleTj: 'Ибораҳои Тиллоӣ ва Гуфтугӯ',
    titleEn: 'Essential Idioms & Fluency',
    descriptionTj: 'Ибораҳои маъмултарин барои гуфтугӯи озодона',
    color: '#D97706', // Gold
    lessons: [
      {
        id: 'u8-l1',
        unitId: 'unit-8',
        titleTj: 'Ибораҳои зебои хушмуомилагӣ',
        titleEn: 'Polite Expressions',
        descriptionTj: 'You are welcome, Have a good day, See you later',
        xpReward: 25,
        gemReward: 10,
        iconName: 'Sparkles',
        taughtWordIds: ['v4', 'v5', 'v6', 'v7'],
        grammarTip: {
          title: 'Ҷавоб ба ташаккур: You are welcome',
          content: 'Вақте касе ба шумо «Thank you» мегӯяд, ҷавоби зеботарин «You are welcome!» (Арзанда нест / Хуш омадед) мебошад.',
          example: 'Thank you! — You are welcome!'
        },
        questions: [
          {
            id: 'u8-l1-q1',
            type: 'word-bank',
            promptTj: 'Ҷумларо созед: «You are welcome» (Арзанда нест)',
            wordsPool: ['You', 'are', 'welcome', 'Thank', 'good', 'day'],
            correctAnswerSentence: 'You are welcome',
            phoneticTj: '[Ю ар ве́лкам]',
            audioText: 'You are welcome',
            explanationTj: 'Ҷавоби маъмултарин ва хушмуомила ба ташаккур.'
          },
          {
            id: 'u8-l1-q2',
            type: 'multiple-choice',
            promptTj: 'Ибораи «Have a good day» чӣ маъно дорад?',
            options: ['Рӯзи хуб дошта бошед!', 'Субҳ ба хайр!', 'Шоми шумо ба хайр!', 'Хайр то пагоҳ!'],
            correctAnswer: 'Рӯзи хуб дошта бошед!',
            phoneticTj: '[Ҳэв э гуд дей!]',
            audioText: 'Have a good day',
            explanationTj: 'Орзуи рӯзи хуб ҳангоми хайрухуш.'
          }
        ]
      }
    ]
  }
];
