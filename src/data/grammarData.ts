import { GrammarTopic } from '../types';

export const GRAMMAR_GUIDEBOOK: GrammarTopic[] = [
  {
    id: 'g1',
    number: 1,
    titleTj: 'Артиклҳои «a», «an» ва «the»',
    titleEn: 'Articles: A, An, The',
    summaryTj: 'Фаҳмиши артиклҳо барои тоҷикон, ки дар забони модарии мо вуҷуд надоранд.',
    category: 'Асосҳо',
    rules: [
      {
        ruleTitle: 'Артикли номуайян: «a» ва «an»',
        explanationTj: 'Вақте ки дар бораи ягон ашё бори аввал суҳбат мекунем ё он як чизи умумӣ аст, «a» ё «an» мегузорем. Агар калима бо садои ҳамсадо сар шавад «a» (a book, a cat), агар бо садонок сар шавад «an» (an apple, an hour).',
        examples: [
          { en: 'I have a car.', tj: 'Ман як мошин дорам (ягон мошин).' },
          { en: 'She eats an apple.', tj: 'Ӯ себ (як себ) мехӯрад.' }
        ]
      },
      {
        ruleTitle: 'Артикли муайян: «the»',
        explanationTj: 'Вақте ки ашё барои ҳардуи мо маълум аст ё дар тамоми ҷаҳон якто аст (the sun, the moon), артикли «the»-ро истифода мекунем.',
        examples: [
          { en: 'The car is red.', tj: 'Мошин (ҳамон мошини мушаххас) сурх аст.' },
          { en: 'Look at the sky.', tj: 'Ба осмон нигоҳ кун.' }
        ]
      }
    ],
    tajikComparison: 'Дар забони тоҷикӣ артикл нест. Барои нишон додани чизи номуайян мо одатан калимаи «як» ё пасванди «-е» мегӯем (масалан: «китобе хондам»). Дар англисӣ гузоштани артикл пеш аз исмҳои танҳо ҳатмӣ аст!',
    commonMistake: {
      wrong: 'I have car.',
      correct: 'I have a car.',
      whyTj: 'Дар англисӣ пеш аз исми шумурдашавандаи танҳо артикл ҳатмист.'
    }
  },
  {
    id: 'g2',
    number: 2,
    titleTj: 'Феъли «To be» (Am, Is, Are)',
    titleEn: 'The Verb "To Be"',
    summaryTj: 'Муҳимтарин феъли англисӣ ва баробари он бо бандакҳои хабарии тоҷикӣ (-ам, -ӣ, -аст).',
    category: 'Феълҳо',
    rules: [
      {
        ruleTitle: 'Тақсимоти шахсҳо дар ҳозира',
        explanationTj: 'I -> am (Ман ҳастам)\nHe / She / It -> is (Ӯ/Он ҳаст)\nYou / We / They -> are (Шумо/Мо/Онҳо ҳастед/ҳастем)',
        examples: [
          { en: 'I am a doctor.', tj: 'Ман табиб ҳастам (Ман духтурам).' },
          { en: 'You are welcome.', tj: 'Хуш омадед.' },
          { en: 'They are students.', tj: 'Онҳо донишҷӯёнанд.' }
        ]
      },
      {
        ruleTitle: 'Шакли саволӣ ва инкорӣ',
        explanationTj: 'Барои савол «am/is/are» ба аввали ҷумла мегузарад. Барои инкор пас аз он «not» ҳамроҳ мешавад.',
        examples: [
          { en: 'Are you ready?', tj: 'Оё шумо омода ҳастед?' },
          { en: 'I am not tired.', tj: 'Ман монда нестам.' }
        ]
      }
    ],
    tajikComparison: 'Дар тоҷикӣ мо бандаки хабарӣ мепайвандем: «Ман донишҷӯ-ям». Дар англисӣ бояд калимаи алоҳида «am» гуфта шавад: «I am a student». Бе ин феъл ҷумла хато мешавад!',
    commonMistake: {
      wrong: 'I student.',
      correct: 'I am a student.',
      whyTj: 'Дар англисӣ ҷумла бе хабар (феъл) вуҷуд дошта наметавонад.'
    }
  },
  {
    id: 'g3',
    number: 3,
    titleTj: 'Тартиби калимаҳо дар ҷумла (SVO)',
    titleEn: 'Word Order: Subject + Verb + Object',
    summaryTj: 'Чаро дар англисӣ феъл ба мобайни ҷумла меояд, на ба охир?',
    category: 'Ҷумласозӣ',
    rules: [
      {
        ruleTitle: 'Қоидаи тиллоии SVO',
        explanationTj: 'Тартиби ҷумлаи англисӣ қатъӣ аст:\n1. Кӣ? (Subject)\n2. Чӣ кор мекунад? (Verb)\n3. Бо кӣ/бо чӣ? (Object)',
        examples: [
          { en: 'I read books.', tj: 'Ман китоб мехонам.' },
          { en: 'He speaks Tajik.', tj: 'Ӯ бо забони тоҷикӣ суҳбат мекунад.' }
        ]
      }
    ],
    tajikComparison: 'Дар тоҷикӣ феъл одатан дар ОХИРИ ҷумла меояд: «Ман китоб мехонам» (Мубтадо + Пуркунанда + Феъл). Дар англисӣ бошад, феъл БАРОҲАТ БАЪД АЗ МУБТАДО меояд: «I read a book». Феълро ба охир набаред!',
    commonMistake: {
      wrong: 'I English learn.',
      correct: 'I learn English.',
      whyTj: 'Феъли «learn» бояд фавран пас аз «I» биёяд.'
    }
  },
  {
    id: 'g4',
    number: 4,
    titleTj: 'Замони ҳозираи оддӣ (Present Simple)',
    titleEn: 'Present Simple Tense',
    summaryTj: 'Амалҳои мунтазам, одатҳо ва қоидаи пасванди «-s» барои шахси сеюм.',
    category: 'Замонҳо',
    rules: [
      {
        ruleTitle: 'Пасванди «-s» ё «-es» барои He/She/It',
        explanationTj: 'Вақте ки амалкунанда танҳо як нафар (вай, ӯ, писар, духтар) бошад, ба феъл «-s» ҳамроҳ мешавад.\nI play, You play, WE play, THEY play\nАммо: He playS, She playS, It workS.',
        examples: [
          { en: 'She lives in Dushanbe.', tj: 'Ӯ дар Душанбе зиндагӣ мекунад.' },
          { en: 'My father drives a car.', tj: 'Падарам мошин меронад.' }
        ]
      },
      {
        ruleTitle: 'Савол ва инкор бо Do ва Does',
        explanationTj: 'Барои савол «Do» (барои I/you/we/they) ва «Does» (барои he/she/it) истифода мешавад. Дар ин ҳолат аз худи феъл «-s» гирифта мешавад!',
        examples: [
          { en: 'Do you speak English?', tj: 'Шумо бо англисӣ ҳарф мезанед?' },
          { en: 'Does she like tea?', tj: 'Оё ӯ чойро дӯст медорад?' }
        ]
      }
    ],
    tajikComparison: 'Дар тоҷикӣ ба ҳар шахс пасванди худ илова мешавад (мекун-ам, мекун-ӣ, мекун-ад, мекун-ем...). Дар англисӣ танҳо ба шахси сеюм «-s» илова мешавад, дигарон ҳама якхелаанд!',
    commonMistake: {
      wrong: 'He live in Tajikistan.',
      correct: 'He lives in Tajikistan.',
      whyTj: 'Барои «He» пасванди «-s» ҳатмист.'
    }
  },
  {
    id: 'g5',
    number: 5,
    titleTj: 'Пешояндҳои замон ва макон (In, On, At)',
    titleEn: 'Prepositions: In, On, At',
    summaryTj: 'Чӣ гуна ба ҷои як «дар»-и тоҷикӣ пешоянди дурустро интихоб кунем.',
    category: 'Пешояндҳо',
    rules: [
      {
        ruleTitle: 'Пешояндҳои замон',
        explanationTj: 'AT — барои соатҳои дақиқ: at 5 o\'clock, at night\nON — барои рӯзҳои ҳафта ва санаҳо: on Monday, on May 9th\nIN — барои моҳҳо, фаслҳо ва солҳо: in July, in 2026, in summer',
        examples: [
          { en: 'I wake up at 7 o\'clock.', tj: 'Ман соати 7 бедор мешавам.' },
          { en: 'We meet on Friday.', tj: 'Мо рӯзи ҷумъа вомехӯрем.' }
        ]
      },
      {
        ruleTitle: 'Пешояндҳои макон',
        explanationTj: 'IN — дохили кишвар ё шаҳр: in Tajikistan, in London\nON — рӯи сатҳ ё кӯча: on the table, on Rudaki Avenue\nAT — нуқтаи мушаххас ё ҷой: at home, at school, at work',
        examples: [
          { en: 'I am at home.', tj: 'Ман дар хона ҳастам.' },
          { en: 'The cup is on the table.', tj: 'Пиёла рӯи миз аст.' }
        ]
      }
    ],
    tajikComparison: 'Дар забони тоҷикӣ мо қариб барои ҳама чиз «дар» мегӯем: дар соати 5, дар рӯзи душанбе, дар шаҳр. Дар англисӣ қоидаи сегонаи At-On-In вуҷуд дорад.',
    commonMistake: {
      wrong: 'I meet you in Monday at Dushanbe.',
      correct: 'I meet you on Monday in Dushanbe.',
      whyTj: 'Барои рӯзҳо «on», барои шаҳрҳо «in» меояд.'
    }
  },
  {
    id: 'g6',
    number: 6,
    titleTj: 'Калимаҳои саволӣ (WH-Questions)',
    titleEn: 'Question Words (Who, What, Where...)',
    summaryTj: 'Пурсидани саволҳо бо тарзи равон ва боварӣ.',
    category: 'Ҷумласозӣ',
    rules: [
      {
        ruleTitle: '6 калимаи тиллоӣ',
        explanationTj: 'What — Чӣ? / Кадом?\nWhere — Дар куҷо? / Ба куҷо?\nWhen — Кай?\nWhy — Чаро? / Барои чӣ?\nWho — Кӣ?\nHow — Чӣ тавр? / Чӣ хел?',
        examples: [
          { en: 'Where do you live?', tj: 'Шумо дар куҷо зиндагӣ мекунед?' },
          { en: 'Why are you learning English?', tj: 'Чаро забони англисиро меомӯзед?' },
          { en: 'How are you today?', tj: 'Имрӯз аҳволатон чӣ тавр аст?' }
        ]
      }
    ],
    tajikComparison: 'Дар англисӣ калимаи саволӣ ҲАМЕША дар сари аввали ҷумла меояд ва пас аз он феъли ёридиҳанда (do/does/is/are) қарор мегирад.',
    commonMistake: {
      wrong: 'You live where?',
      correct: 'Where do you live?',
      whyTj: 'Калимаи саволии «Where» бояд дар аввали ҷумла бошад.'
    }
  }
];
