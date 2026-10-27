'use strict';

/* --------------------------------------------------------------------------
   BANDUP — application d'entraînement haut du corps aux bandes élastiques.
   Tout est local : aucune requête réseau, les GIFs sont dans /assets/gifs.
   -------------------------------------------------------------------------- */

const BANDS = [
  {
    name: 'Jaune',
    color: '#F2D23E',
    level: 'Très léger',
    lbs: '5–15 lb',
    kg: '2–7 kg',
    use: 'Échauffement, élévations, curls légers'
  },
  {
    name: 'Rouge',
    color: '#E45D4E',
    level: 'Léger',
    lbs: '15–35 lb',
    kg: '7–16 kg',
    use: 'Épaules, bras, tirages faciles'
  },
  {
    name: 'Noire',
    color: '#20241F',
    level: 'Moyen',
    lbs: '25–65 lb',
    kg: '11–30 kg',
    use: 'Rowing, tirage vertical, développé'
  },
  {
    name: 'Violette',
    color: '#7C55B7',
    level: 'Fort',
    lbs: '35–85 lb',
    kg: '16–38 kg',
    use: 'Dos et pectoraux quand la technique est propre'
  },
  {
    name: 'Verte',
    color: '#237C55',
    level: 'Très fort',
    lbs: '50–125 lb',
    kg: '23–57 kg',
    use: 'Réservée aux mouvements maîtrisés'
  }
];

const ICONS = {
  arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l10-6.5-10-6.5Z" fill="currentColor" stroke="none"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="m20 6-11 11-5-5"/></svg>',
  close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  spark: '<svg viewBox="0 0 24 24"><path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 4.6 2.9 8 7 10 4.1-2 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
  refresh: '<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 5v6h-6"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
  moon: '<svg viewBox="0 0 24 24"><path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z"/></svg>',
  anchor: '<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.3"/><path d="M12 7.3V21M5 13H3.8a8.2 8.2 0 0 0 16.4 0H19"/></svg>',
  target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></svg>',
  flame: '<svg viewBox="0 0 24 24"><path d="M13.5 3.5c.7 2.6-.7 4-2 5.3-1.7 1.8-3.3 3.4-3 6.2.2 2.3 2 4 4.4 4 2.7 0 4.7-1.9 4.9-4.7.2-3-1.7-5.5-3.6-7.2-.6-.5-1.2-1.1-1.3-2.1 0-.5.1-1 .6-1.5Z"/></svg>',
  timer: '<svg viewBox="0 0 24 24"><path d="M9 3h6M12 3v3"/><circle cx="12" cy="14" r="7"/><path d="M12 10v4l2.5 1.5"/></svg>'
};

function icon(name, cls = '') {
  return `<span class="icon ${cls}" aria-hidden="true">${ICONS[name] || ''}</span>`;
}

/* --------------------------------------------------------------------------
   Bibliothèque des exercices
   -------------------------------------------------------------------------- */

const EXERCISES = {
  'chest-press': {
    name: 'Développé poitrine',
    gif: 'assets/gifs/chest-press.gif',
    muscles: ['Pectoraux', 'Triceps'],
    setup: 'Banc ou sol + bande sous le dos',
    anchor: false,
    band: 'Rouge ou noire',
    summary: 'Le mouvement de base pour pousser : tout le buste reste stable, seuls les bras travaillent.',
    cues: [
      'Allonge-toi sur un banc — ou au sol — et passe la bande sous le haut du dos. Tiens une extrémité dans chaque main.',
      'Coudes à environ 45° du buste, pousse la bande vers le plafond sans cambrer le bas du dos.',
      'Redescends lentement pendant 3 secondes, jusqu’à sentir les pectoraux s’étirer.'
    ],
    mistake: 'Ne laisse pas les coudes partir à 90° sur les côtés : protège tes épaules.',
    tip: 'Pas de banc ? Fais la version au sol, genoux fléchis : c’est tout aussi efficace.'
  },
  'chest-press-unilateral': {
    name: 'Développé poitrine un bras',
    gif: 'assets/gifs/chest-press-unilateral.gif',
    muscles: ['Pectoraux', 'Épaules'],
    setup: 'Ancrage à hauteur de poitrine',
    anchor: true,
    band: 'Rouge',
    summary: 'Un développé debout, de côté par rapport à l’ancre, qui ajoute un léger travail de rotation.',
    cues: [
      'Fixe la bande à hauteur de poitrine, place-toi de côté et recule pour créer une tension légère.',
      'Amène la main vers l’épaule opposée, puis pousse devant toi en laissant le torse tourner légèrement.',
      'Reviens lentement, sans laisser la bande ramener ton bras d’un coup.'
    ],
    mistake: 'Ne pivote pas les hanches : le mouvement part du buste et des épaules.',
    tip: 'Garde les côtes basses et le regard devant toi pendant toute la poussée.'
  },
  pulldown: {
    name: 'Tirage vertical',
    gif: 'assets/gifs/pulldown.gif',
    muscles: ['Dos', 'Biceps'],
    setup: 'Ancrage en hauteur',
    anchor: true,
    band: 'Rouge ou noire',
    summary: 'Le geste du dos par excellence : tire les coudes vers le bas pour construire la largeur.',
    cues: [
      'Fixe la bande en hauteur, attrape les deux extrémités et recule pour la tendre.',
      'Tire les coudes vers le bas et vers les côtes, comme si tu voulais mettre tes omoplates dans tes poches arrière.',
      'Remonte lentement, bras tendus, sans hausser les épaules.'
    ],
    mistake: 'Ne tire pas uniquement avec les bras : pense à descendre les coudes.',
    tip: 'Légèrement penché en arrière (5–10°), le buste gainé, tu sentiras mieux le dos.'
  },
  'pulldown-underhand': {
    name: 'Tirage vertical prise inversée',
    gif: 'assets/gifs/pulldown-underhand.gif',
    muscles: ['Dos', 'Biceps'],
    setup: 'Ancrage en hauteur',
    anchor: true,
    band: 'Rouge ou noire',
    summary: 'Une variante paumes vers toi, qui cible davantage les biceps et le bas des dorsaux.',
    cues: [
      'Fixe la bande en hauteur et saisis-la avec les paumes tournées vers toi, mains un peu plus larges que les épaules.',
      'Garde le buste droit et tire la bande vers le haut de la poitrine en serrant les omoplates.',
      'Contrôle la remontée jusqu’à tendre les bras, sans lâcher la tension.'
    ],
    mistake: 'Ne laisse pas les épaules monter vers les oreilles en fin de mouvement.',
    tip: 'Si tes poignets tirent, repasse à la prise neutre du tirage classique.'
  },
  row: {
    name: 'Rowing un bras',
    gif: 'assets/gifs/row.gif',
    muscles: ['Dos', 'Biceps', 'Arrière d’épaule'],
    setup: 'Ancrage à hauteur de taille',
    anchor: true,
    band: 'Rouge ou noire',
    summary: 'Le grand classique du dos, en unilatéral : idéal pour corriger les déséquilibres.',
    cues: [
      'Fixe la bande à hauteur de taille, attrape-la d’une main et recule pour créer de la tension.',
      'Légèrement penché en avant, dos droit, tire le coude vers la hanche en serrant l’omoplate.',
      'Relâche lentement le bras, sans arrondir le dos.'
    ],
    mistake: 'Ne tire pas avec l’épaule qui monte vers l’oreille : garde-la basse.',
    tip: 'Marque une seconde de contraction en haut, à chaque répétition.'
  },
  'seated-row': {
    name: 'Rowing assis un bras',
    gif: 'assets/gifs/seated-row.gif',
    muscles: ['Dos', 'Biceps'],
    setup: 'Assis + bande sous les pieds',
    anchor: false,
    band: 'Rouge ou noire',
    summary: 'Un rowing assis, très stable, parfait pour apprendre à tirer sans solliciter le bas du dos.',
    cues: [
      'Assieds-toi, dos droit, passe la bande sous tes pieds et tiens une extrémité dans une main.',
      'Tire le coude vers l’arrière en tournant légèrement le torse, en serrant l’omoplate.',
      'Reviens lentement, sans laisser les épaules monter.'
    ],
    mistake: 'Ne t’enroule pas autour du bas du dos : grandis-toi à chaque répétition.',
    tip: 'Pour plus de tension, raccourcis la bande en la tenant plus près du pied.'
  },
  'rear-delt-row': {
    name: 'Rowing arrière d’épaule',
    gif: 'assets/gifs/rear-delt-row.gif',
    muscles: ['Arrière d’épaule', 'Haut du dos'],
    setup: 'Debout + bande sous les pieds',
    anchor: false,
    band: 'Jaune ou rouge',
    summary: 'Un tirage buste penché qui cible l’arrière des épaules et le haut du dos.',
    cues: [
      'Debout, bande sous les pieds, penche le buste à 45° et tends les bras devant toi.',
      'Tire les coudes vers l’arrière en écartant légèrement les mains, comme pour ouvrir les bras.',
      'Serre les omoplates, puis reviens lentement.'
    ],
    mistake: 'Ne hausse pas les épaules vers les oreilles.',
    tip: 'Garde les coudes légèrement fléchis et le mouvement court.'
  },
  'reverse-fly': {
    name: 'Oiseau — écartement arrière',
    gif: 'assets/gifs/reverse-fly.gif',
    muscles: ['Arrière d’épaule', 'Rhomboïdes'],
    setup: 'Ancrage à hauteur de poitrine',
    anchor: true,
    band: 'Jaune ou rouge',
    summary: 'Petit mouvement de posture, parfait pour équilibrer tous les exercices de poussée.',
    cues: [
      'Fixe la bande à hauteur de poitrine et tiens les deux extrémités devant toi.',
      'Bras presque tendus, ouvre les bras sur les côtés jusqu’à la ligne des épaules.',
      'Serre les omoplates, puis reviens sans laisser les épaules monter.'
    ],
    mistake: 'Ne plie pas les coudes pour transformer le mouvement en rowing.',
    tip: 'Imagine que tu veux tenir un crayon entre tes omoplates.'
  },
  'shoulder-press': {
    name: 'Développé épaules',
    gif: 'assets/gifs/shoulder-press.gif',
    muscles: ['Épaules', 'Triceps'],
    setup: 'Debout + bande sous les pieds',
    anchor: false,
    band: 'Jaune ou rouge',
    summary: 'La poussée verticale de base, à faire avec une bande légère pour garder la technique.',
    cues: [
      'Debout, bande sous les pieds, mains à hauteur d’épaules, paumes vers l’avant.',
      'Gaine les abdos et pousse au-dessus de la tête sans cambrer.',
      'Redescends lentement à hauteur d’épaules.'
    ],
    mistake: 'Ne bloque pas ta respiration et ne pousse pas la tête en avant.',
    tip: 'Si tes épaules tirent, réduis l’amplitude et garde les mains un peu plus larges.'
  },
  'overhead-press-twist': {
    name: 'Développé épaules avec rotation',
    gif: 'assets/gifs/overhead-press-twist.gif',
    muscles: ['Épaules', 'Triceps', 'Gainage'],
    setup: 'Debout + bande sous les pieds',
    anchor: false,
    band: 'Jaune ou rouge',
    summary: 'Un développé qui ajoute une rotation contrôlée du buste pour travailler le gainage.',
    cues: [
      'Debout, bande sous les pieds, mains à hauteur d’épaules.',
      'Pousse au-dessus de la tête en tournant légèrement le buste d’un côté, hanches stables.',
      'Reviens au centre, puis alterne la rotation à la répétition suivante.'
    ],
    mistake: 'Ne bouge pas les hanches : la rotation reste petite et contrôlée.',
    tip: 'Commence sans rotation pour maîtriser le développé, puis ajoute-la.'
  },
  'front-raise': {
    name: 'Élévation frontale',
    gif: 'assets/gifs/front-raise.gif',
    muscles: ['Épaules'],
    setup: 'Debout + bande sous les pieds',
    anchor: false,
    band: 'Jaune',
    summary: 'Pour l’avant des épaules, avec une bande légère et un mouvement très contrôlé.',
    cues: [
      'Debout, bande sous les pieds, mains devant les cuisses.',
      'Bras presque tendus, lève-les devant toi jusqu’à hauteur d’épaules.',
      'Redescends lentement en contrôlant la bande.'
    ],
    mistake: 'Ne te balance pas pour lancer les bras.',
    tip: 'Une bande légère suffit : le but est de sentir l’épaule, pas de tirer fort.'
  },
  'lateral-raise': {
    name: 'Élévation latérale',
    gif: 'assets/gifs/lateral-raise.gif',
    muscles: ['Épaules (côté)'],
    setup: 'Debout + bande sous les pieds',
    anchor: false,
    band: 'Jaune',
    summary: 'Le mouvement qui dessine les épaules, à faire léger et sans élan.',
    cues: [
      'Debout, bande sous les pieds, mains sur les côtés.',
      'Lève les bras sur les côtés jusqu’à l’horizontale, coudes souples.',
      'Redescends sans laisser tomber les bras.'
    ],
    mistake: 'Ne monte pas les mains plus haut que les épaules.',
    tip: 'Mène avec les coudes, pas avec les poignets.'
  },
  'y-raise': {
    name: 'Y-raise',
    gif: 'assets/gifs/y-raise.gif',
    muscles: ['Arrière d’épaule', 'Haut du dos'],
    setup: 'Debout + bande sous les pieds',
    anchor: false,
    band: 'Jaune',
    summary: 'Un petit mouvement en Y pour le haut du dos et la posture.',
    cues: [
      'Debout, bande sous les pieds, bras devant toi, pouces vers le haut.',
      'Monte les bras en Y jusqu’à hauteur des yeux, sans hausser les épaules.',
      'Redescends lentement en gardant le buste gainé.'
    ],
    mistake: 'Ne cambre pas le dos pour monter plus haut.',
    tip: 'Mouvement petit mais précis : 12 à 15 répétitions suffisent.'
  },
  shrug: {
    name: 'Haussement d’épaules',
    gif: 'assets/gifs/shrug.gif',
    muscles: ['Trapèzes'],
    setup: 'Debout + bande sous les pieds',
    anchor: false,
    band: 'Rouge',
    summary: 'Pour les trapèzes, avec un mouvement vertical court et une pause en haut.',
    cues: [
      'Debout, bande sous les pieds, bras tendus le long du corps.',
      'Monte les épaules vers les oreilles, sans plier les coudes.',
      'Marque une seconde en haut, puis redescends lentement.'
    ],
    mistake: 'Ne roule pas les épaules en arrière.',
    tip: 'Garde le cou long et regarde devant toi.'
  },
  'biceps-curl': {
    name: 'Curl biceps alterné',
    gif: 'assets/gifs/biceps-curl.gif',
    muscles: ['Biceps', 'Avant-bras'],
    setup: 'Debout + bande sous les pieds',
    anchor: false,
    band: 'Jaune ou rouge',
    summary: 'Le curl de base, un bras à la fois, pour sentir chaque biceps travailler.',
    cues: [
      'Debout, bande sous les pieds, paumes tournées vers le haut.',
      'Coudes collés au corps, monte une main vers l’épaule en serrant le biceps.',
      'Redescends lentement, puis alterne.'
    ],
    mistake: 'Ne balance pas le buste vers l’arrière.',
    tip: 'Plus tu descends lentement, plus le muscle travaille.'
  },
  'concentration-curl': {
    name: 'Curl concentration',
    gif: 'assets/gifs/concentration-curl.gif',
    muscles: ['Biceps'],
    setup: 'Assis + bande sous le pied',
    anchor: false,
    band: 'Rouge',
    summary: 'Un curl assis et très stable, idéal pour corriger les différences entre les bras.',
    cues: [
      'Assis, bande sous le pied du même côté, coude posé sur l’intérieur de la cuisse.',
      'Monte la main vers l’épaule sans bouger le coude.',
      'Redescends lentement, bras presque tendu.'
    ],
    mistake: 'Ne décolle pas le coude de la cuisse.',
    tip: 'Parfait pour finir une séance bras avec un mouvement très contrôlé.'
  },
  'triceps-extension': {
    name: 'Extension triceps',
    gif: 'assets/gifs/triceps-extension.gif',
    muscles: ['Triceps'],
    setup: 'Debout + bande sous les pieds',
    anchor: false,
    band: 'Jaune ou rouge',
    summary: 'Un triceps simple, bras sur les côtés, à faire sans verrouiller brutalement les coudes.',
    cues: [
      'Debout, bande sous les pieds, bras tendus sur les côtés, paumes vers le bas.',
      'Plie les coudes pour amener les mains vers les épaules, coudes fixes.',
      'Tends les bras en contrôlant, sans verrouiller d’un coup.'
    ],
    mistake: 'Ne laisse pas les coudes descendre.',
    tip: 'Garde les épaules basses et le buste gainé.'
  },
  'triceps-pushup': {
    name: 'Pompe prise serrée',
    gif: 'assets/gifs/triceps-pushup.gif',
    muscles: ['Triceps', 'Pectoraux'],
    setup: 'Bande autour des bras',
    anchor: false,
    band: 'Rouge autour des bras',
    summary: 'Une pompe qui cible les triceps, avec une bande autour des bras pour guider le mouvement.',
    cues: [
      'Place la bande autour des bras, juste au-dessus des coudes. Mains sous les épaules.',
      'Corps gainé, descends en gardant les coudes près du buste.',
      'Pousse dans les paumes pour remonter.'
    ],
    mistake: 'Ne laisse pas les hanches s’affaisser.',
    tip: 'Sur les genoux si nécessaire : garde le même alignement tête–bassin.'
  },
  'pallof-press': {
    name: 'Pallof press',
    gif: 'assets/gifs/pallof-press.gif',
    muscles: ['Gainage', 'Obliques'],
    setup: 'Ancrage à hauteur de taille',
    anchor: true,
    band: 'Rouge',
    summary: 'Le meilleur exercice anti-rotation : ton buste doit rester parfaitement face à l’avant.',
    cues: [
      'Fixe la bande à hauteur de taille, place-toi de côté et tiens-la à deux mains devant la poitrine.',
      'Tends les bras devant toi, sans laisser le buste tourner.',
      'Reviens lentement, en résistant à la traction.'
    ],
    mistake: 'Ne tourne pas les épaules vers l’ancre.',
    tip: 'Plus tu es loin de l’ancre, plus c’est dur.'
  },
  'standing-crunch': {
    name: 'Crunch debout',
    gif: 'assets/gifs/standing-crunch.gif',
    muscles: ['Abdominaux'],
    setup: 'Ancrage à hauteur de taille',
    anchor: true,
    band: 'Rouge',
    summary: 'Un crunch debout qui apprend à enrouler le buste avec les abdos, pas avec les bras.',
    cues: [
      'Ancre à hauteur de taille, dos à l’ancre, bande tenue près de la poitrine.',
      'Gaine les abdos et enroule le buste vers l’avant, comme pour fermer les côtes.',
      'Reviens lentement sans tirer avec les bras.'
    ],
    mistake: 'Ne plie pas au niveau des hanches : le mouvement vient des abdos.',
    tip: 'Expire à fond en enroulant, puis inspire en revenant.'
  },
  'bicycle-crunch': {
    name: 'Bicyclette',
    gif: 'assets/gifs/bicycle-crunch.gif',
    muscles: ['Abdominaux', 'Obliques'],
    setup: 'Sans bande ou bande légère',
    anchor: false,
    band: 'Sans bande',
    summary: 'Un gainage dynamique pour les obliques, à faire lentement et sans tirer sur la nuque.',
    cues: [
      'Allongé sur le dos, mains derrière la tête, jambes levées.',
      'Amène le coude vers le genou opposé en alternant, sans tirer sur la nuque.',
      'Garde le bas du dos proche du sol et le gainage actif.'
    ],
    mistake: 'Ne tire pas sur ta tête avec les mains.',
    tip: 'Ralentis : la qualité du gainage compte plus que la vitesse.'
  }
};

/* --------------------------------------------------------------------------
   Échauffements et retours au calme
   -------------------------------------------------------------------------- */

const WARMUPS = {
  short: [
    { name: 'Marche sur place', dose: '45 s' },
    { name: 'Cercles de bras', dose: '45 s' },
    { name: 'Écartement arrière léger', dose: '2 × 12', note: 'Bande jaune, sans forcer' }
  ],
  medium: [
    { name: 'Marche active', dose: '60 s' },
    { name: 'Cercles de bras', dose: '45 s' },
    { name: 'Rotations du buste', dose: '45 s' },
    { name: 'Écartement arrière', dose: '2 × 15', note: 'Bande légère' },
    { name: 'Développé épaules à vide', dose: '15 reps', note: 'Mouvement lent, sans bande' }
  ],
  long: [
    { name: 'Marche active', dose: '2 min' },
    { name: 'Mobilité des épaules', dose: '2 min', note: 'Cercles, montées de bras, rotations' },
    { name: 'Écartement arrière', dose: '2 × 15', note: 'Bande légère' },
    { name: 'Rowing léger', dose: '2 × 12', note: 'Bande légère, amplitude confortable' },
    { name: 'Développé épaules à vide', dose: '15 reps', note: 'Sans bande' }
  ]
};

const COOLDOWNS = {
  short: [
    { name: 'Respiration 4–4–6', dose: '60 s', note: 'Inspire 4 s, bloque 4 s, expire 6 s' },
    { name: 'Étirement pectoraux', dose: '30 s / côté', note: 'Avant-bras contre un mur, tourne doucement' },
    { name: 'Étirement triceps', dose: '30 s / côté', note: 'Coude derrière la tête, main dans le dos' }
  ],
  medium: [
    { name: 'Respiration 4–4–6', dose: '60 s', note: 'Épaules relâchées' },
    { name: 'Étirement pectoraux', dose: '30 s / côté' },
    { name: 'Étirement haut du dos', dose: '45 s', note: 'Bras croisés devant toi, arrondis doucement' },
    { name: 'Étirement triceps', dose: '30 s / côté' }
  ],
  long: [
    { name: 'Respiration 4–4–6', dose: '90 s' },
    { name: 'Étirement pectoraux', dose: '40 s / côté' },
    { name: 'Étirement haut du dos', dose: '45 s' },
    { name: 'Étirement triceps', dose: '30 s / côté' },
    { name: 'Nuque et épaules', dose: '45 s', note: 'Mouvements lents, aucune douleur' }
  ]
};

/* --------------------------------------------------------------------------
   Séances
   -------------------------------------------------------------------------- */

const SESSIONS = {
  base15: {
    kicker: 'Séance A · Full haut',
    title: 'Base',
    blurb: 'Le circuit complet pour découvrir chaque famille de mouvement : pousser, tirer, bras.',
    warmup: WARMUPS.short,
    cooldown: COOLDOWNS.short,
    blocks: [
      {
        title: 'Circuit unique',
        badge: '2 tours · 40 s / 20 s',
        note: 'Enchaîne les 5 exercices. Récupère 20 s entre chaque, puis 30 s entre les deux tours.',
        exercises: [
          { id: 'chest-press', dose: '2 × 40 s', rest: '20 s' },
          { id: 'row', dose: '2 × 40 s', rest: '20 s', note: '20 s par bras' },
          { id: 'shoulder-press', dose: '2 × 40 s', rest: '20 s' },
          { id: 'biceps-curl', dose: '2 × 40 s', rest: '20 s' },
          { id: 'triceps-extension', dose: '2 × 40 s', rest: '20 s' }
        ]
      }
    ]
  },
  back15: {
    kicker: 'Séance B · Dos & posture',
    title: 'Dos',
    blurb: 'Tire, serre les omoplates et travaille l’arrière des épaules. Le dos se construit aussi au repos.',
    warmup: WARMUPS.short,
    cooldown: COOLDOWNS.short,
    blocks: [
      {
        title: 'Circuit unique',
        badge: '2 tours · 40 s / 20 s',
        note: 'Garde les épaules basses. Si tu perds la posture, ralentis plutôt que de forcer.',
        exercises: [
          { id: 'pulldown', dose: '2 × 40 s', rest: '20 s' },
          { id: 'seated-row', dose: '2 × 40 s', rest: '20 s', note: '20 s par bras' },
          { id: 'reverse-fly', dose: '2 × 40 s', rest: '20 s' },
          { id: 'biceps-curl', dose: '2 × 40 s', rest: '20 s' },
          { id: 'pallof-press', dose: '2 × 40 s', rest: '20 s', note: '20 s par côté' }
        ]
      }
    ]
  },
  balance15: {
    kicker: 'Séance C · Équilibre',
    title: 'Équilibre',
    blurb: 'Un mélange poussée / tirage pour garder des épaules saines et un buste solide.',
    warmup: WARMUPS.short,
    cooldown: COOLDOWNS.short,
    blocks: [
      {
        title: 'Circuit unique',
        badge: '2 tours · 40 s / 20 s',
        note: 'Alterne sans précipitation. La qualité du mouvement passe avant le nombre de répétitions.',
        exercises: [
          { id: 'chest-press', dose: '2 × 40 s', rest: '20 s' },
          { id: 'pulldown', dose: '2 × 40 s', rest: '20 s' },
          { id: 'lateral-raise', dose: '2 × 40 s', rest: '20 s' },
          { id: 'triceps-extension', dose: '2 × 40 s', rest: '20 s' },
          { id: 'bicycle-crunch', dose: '2 × 40 s', rest: '20 s' }
        ]
      }
    ]
  },
  arms15: {
    kicker: 'Séance D · Bras & gainage',
    title: 'Bras & gainage',
    blurb: 'Une séance courte qui cible les bras, les épaules et les obliques.',
    warmup: WARMUPS.short,
    cooldown: COOLDOWNS.short,
    blocks: [
      {
        title: 'Circuit unique',
        badge: '2 tours · 40 s / 20 s',
        note: 'Sur les pompes, pose les genoux si nécessaire. Garde le corps gainé.',
        exercises: [
          { id: 'concentration-curl', dose: '2 × 40 s', rest: '20 s', note: '20 s par bras' },
          { id: 'triceps-pushup', dose: '2 × 40 s', rest: '20 s' },
          { id: 'lateral-raise', dose: '2 × 40 s', rest: '20 s' },
          { id: 'reverse-fly', dose: '2 × 40 s', rest: '20 s' },
          { id: 'standing-crunch', dose: '2 × 40 s', rest: '20 s' }
        ]
      }
    ]
  },

  push30: {
    kicker: 'Séance 1 · Push',
    title: 'Push',
    blurb: 'Pectoraux, épaules et triceps : un bloc force, un bloc volume, puis un peu de gainage.',
    warmup: WARMUPS.medium,
    cooldown: COOLDOWNS.medium,
    blocks: [
      {
        title: 'Bloc force',
        badge: '3 séries · repos 60 s',
        note: 'Prends 60 s entre les séries. Les 2 dernières répétitions doivent être difficiles, pas désordonnées.',
        exercises: [
          { id: 'chest-press', dose: '3 × 10–12', rest: '60 s' },
          { id: 'shoulder-press', dose: '3 × 10–12', rest: '60 s' },
          { id: 'triceps-pushup', dose: '3 × 8–12', rest: '60 s' }
        ]
      },
      {
        title: 'Bloc volume',
        badge: '2 séries · repos 45 s',
        note: 'Plus léger, plus de répétitions, toujours avec 3 secondes de descente.',
        exercises: [
          { id: 'front-raise', dose: '2 × 12–15', rest: '45 s' },
          { id: 'lateral-raise', dose: '2 × 12–15', rest: '45 s' },
          { id: 'triceps-extension', dose: '2 × 12–15', rest: '45 s' }
        ]
      },
      {
        title: 'Finition gainage',
        badge: '2 séries · repos 45 s',
        note: 'Termine sans précipitation, en gardant les côtes basses.',
        exercises: [{ id: 'pallof-press', dose: '2 × 10 / côté', rest: '45 s' }]
      }
    ]
  },
  pull30: {
    kicker: 'Séance 2 · Pull',
    title: 'Pull',
    blurb: 'Dos, arrière d’épaules et biceps. Pense à tirer avec les coudes, pas avec les mains.',
    warmup: WARMUPS.medium,
    cooldown: COOLDOWNS.medium,
    blocks: [
      {
        title: 'Bloc force',
        badge: '3 séries · repos 60 s',
        note: 'Serre les omoplates en haut de chaque répétition, puis relâche lentement.',
        exercises: [
          { id: 'pulldown', dose: '3 × 10–12', rest: '60 s' },
          { id: 'row', dose: '3 × 10–12 / bras', rest: '60 s' },
          { id: 'rear-delt-row', dose: '3 × 12–15', rest: '60 s' }
        ]
      },
      {
        title: 'Bloc volume',
        badge: '2 séries · repos 45 s',
        note: 'Mouvements plus légers : cherche la sensation dans le muscle, pas la charge.',
        exercises: [
          { id: 'reverse-fly', dose: '2 × 12–15', rest: '45 s' },
          { id: 'biceps-curl', dose: '2 × 12–15', rest: '45 s' },
          { id: 'concentration-curl', dose: '2 × 10–12 / bras', rest: '45 s' }
        ]
      },
      {
        title: 'Finition gainage',
        badge: '2 séries · repos 45 s',
        note: 'Termine par un travail lent des abdos, sans tirer avec les bras.',
        exercises: [{ id: 'standing-crunch', dose: '2 × 12–15', rest: '45 s' }]
      }
    ]
  },
  full30: {
    kicker: 'Séance 3 · Full haut',
    title: 'Full haut',
    blurb: 'Une séance équilibrée pour tout le haut du corps, avec un focus sur la technique.',
    warmup: WARMUPS.medium,
    cooldown: COOLDOWNS.medium,
    blocks: [
      {
        title: 'Bloc force',
        badge: '3 séries · repos 60 s',
        note: 'Trois mouvements polyvalents. Garde 2 répétitions en réserve.',
        exercises: [
          { id: 'chest-press', dose: '3 × 10–12', rest: '60 s' },
          { id: 'pulldown', dose: '3 × 10–12', rest: '60 s' },
          { id: 'shoulder-press', dose: '3 × 10–12', rest: '60 s' }
        ]
      },
      {
        title: 'Bloc volume',
        badge: '2 séries · repos 45 s',
        note: 'Un tirage, un biceps, un triceps : équilibre parfait.',
        exercises: [
          { id: 'row', dose: '2 × 10–12 / bras', rest: '45 s' },
          { id: 'biceps-curl', dose: '2 × 12–15', rest: '45 s' },
          { id: 'triceps-extension', dose: '2 × 12–15', rest: '45 s' }
        ]
      },
      {
        title: 'Finition gainage',
        badge: '2 séries · repos 45 s',
        note: 'Anti-rotation : ne laisse pas la bande te faire tourner.',
        exercises: [{ id: 'pallof-press', dose: '2 × 10 / côté', rest: '45 s' }]
      }
    ]
  },
  arms30: {
    kicker: 'Séance 4 · Bras & gainage',
    title: 'Bras & gainage',
    blurb: 'Une séance de finition pour les bras et les épaules, avec un gainage complet.',
    warmup: WARMUPS.medium,
    cooldown: COOLDOWNS.medium,
    blocks: [
      {
        title: 'Bloc force',
        badge: '3 séries · repos 60 s',
        note: 'Contrôle la descente. Évite de verrouiller brutalement les coudes.',
        exercises: [
          { id: 'concentration-curl', dose: '3 × 10–12 / bras', rest: '60 s' },
          { id: 'triceps-extension', dose: '3 × 12–15', rest: '60 s' },
          { id: 'lateral-raise', dose: '3 × 12–15', rest: '60 s' }
        ]
      },
      {
        title: 'Bloc volume',
        badge: '2 séries · repos 45 s',
        note: 'Un peu plus de répétitions, une bande plus légère si besoin.',
        exercises: [
          { id: 'biceps-curl', dose: '2 × 12–15', rest: '45 s' },
          { id: 'triceps-pushup', dose: '2 × 8–12', rest: '45 s' },
          { id: 'reverse-fly', dose: '2 × 12–15', rest: '45 s' }
        ]
      },
      {
        title: 'Finition gainage',
        badge: '2 séries · repos 45 s',
        note: 'Lent et contrôlé, sans tirer sur la nuque.',
        exercises: [{ id: 'bicycle-crunch', dose: '2 × 12–16', rest: '45 s' }]
      }
    ]
  },

  pushA60: {
    kicker: 'Séance 1 · Push A',
    title: 'Push A',
    blurb: 'Le gros du travail de poussée : pectoraux, épaules, triceps, avec des temps de repos plus longs.',
    warmup: WARMUPS.long,
    cooldown: COOLDOWNS.long,
    blocks: [
      {
        title: 'Bloc force',
        badge: '3 séries · repos 75 s',
        note: 'Charge lourde mais propre. Si la forme se dégrade, arrête la série.',
        exercises: [
          { id: 'chest-press', dose: '3 × 8–10', rest: '75 s' },
          { id: 'shoulder-press', dose: '3 × 8–10', rest: '75 s' },
          { id: 'triceps-pushup', dose: '3 × 8–12', rest: '75 s' }
        ]
      },
      {
        title: 'Bloc volume',
        badge: '3 séries · repos 60 s',
        note: 'Baisse un peu la résistance et cherche la qualité de contraction.',
        exercises: [
          { id: 'front-raise', dose: '3 × 12–15', rest: '60 s' },
          { id: 'lateral-raise', dose: '3 × 12–15', rest: '60 s' },
          { id: 'triceps-extension', dose: '3 × 12–15', rest: '60 s' }
        ]
      },
      {
        title: 'Finition gainage',
        badge: '2 séries · repos 45 s',
        note: 'Termine par un exercice anti-rotation, buste bien droit.',
        exercises: [{ id: 'pallof-press', dose: '2 × 10 / côté', rest: '45 s' }]
      }
    ]
  },
  pullA60: {
    kicker: 'Séance 2 · Pull A',
    title: 'Pull A',
    blurb: 'Une séance dense pour le dos et les biceps, avec une attention particulière aux omoplates.',
    warmup: WARMUPS.long,
    cooldown: COOLDOWNS.long,
    blocks: [
      {
        title: 'Bloc force',
        badge: '3 séries · repos 75 s',
        note: 'Tire avec les coudes. Si tu hausses les épaules, la bande est trop forte.',
        exercises: [
          { id: 'pulldown', dose: '3 × 8–10', rest: '75 s' },
          { id: 'row', dose: '3 × 8–10 / bras', rest: '75 s' },
          { id: 'rear-delt-row', dose: '3 × 10–12', rest: '75 s' }
        ]
      },
      {
        title: 'Bloc volume',
        badge: '3 séries · repos 60 s',
        note: 'Mouvements plus légers, contractions plus longues.',
        exercises: [
          { id: 'reverse-fly', dose: '3 × 12–15', rest: '60 s' },
          { id: 'biceps-curl', dose: '3 × 12–15', rest: '60 s' },
          { id: 'concentration-curl', dose: '3 × 10–12 / bras', rest: '60 s' }
        ]
      },
      {
        title: 'Finition gainage',
        badge: '2 séries · repos 45 s',
        note: 'Expire en enroulant le buste, sans tirer avec les bras.',
        exercises: [{ id: 'standing-crunch', dose: '2 × 12–15', rest: '45 s' }]
      }
    ]
  },
  pushB60: {
    kicker: 'Séance 3 · Push B',
    title: 'Push B',
    blurb: 'Une variante de poussée avec plus d’unilatéral et de rotation contrôlée.',
    warmup: WARMUPS.long,
    cooldown: COOLDOWNS.long,
    blocks: [
      {
        title: 'Bloc force',
        badge: '3 séries · repos 75 s',
        note: 'Garde les hanches stables sur le développé avec rotation.',
        exercises: [
          { id: 'chest-press-unilateral', dose: '3 × 8–10 / bras', rest: '75 s' },
          { id: 'overhead-press-twist', dose: '3 × 8–10', rest: '75 s' },
          { id: 'triceps-pushup', dose: '3 × 8–12', rest: '75 s' }
        ]
      },
      {
        title: 'Bloc volume',
        badge: '3 séries · repos 60 s',
        note: 'Un développé plus léger, puis les élévations pour finir les épaules.',
        exercises: [
          { id: 'chest-press', dose: '3 × 12–15', rest: '60 s' },
          { id: 'front-raise', dose: '3 × 12–15', rest: '60 s' },
          { id: 'lateral-raise', dose: '3 × 12–15', rest: '60 s' }
        ]
      },
      {
        title: 'Finition gainage',
        badge: '2 séries · repos 45 s',
        note: 'Le buste ne bouge pas : seuls les bras se tendent.',
        exercises: [{ id: 'pallof-press', dose: '2 × 10 / côté', rest: '45 s' }]
      }
    ]
  },
  pullB60: {
    kicker: 'Séance 4 · Pull B',
    title: 'Pull B',
    blurb: 'Une deuxième séance de tirage, avec une prise différente et un travail postural.',
    warmup: WARMUPS.long,
    cooldown: COOLDOWNS.long,
    blocks: [
      {
        title: 'Bloc force',
        badge: '3 séries · repos 75 s',
        note: 'Alterne les prises d’une séance à l’autre pour progresser sans blocage.',
        exercises: [
          { id: 'pulldown-underhand', dose: '3 × 8–10', rest: '75 s' },
          { id: 'seated-row', dose: '3 × 8–10 / bras', rest: '75 s' },
          { id: 'shrug', dose: '3 × 12–15', rest: '75 s' }
        ]
      },
      {
        title: 'Bloc volume',
        badge: '3 séries · repos 60 s',
        note: 'Le Y-raise est un petit mouvement : ne monte pas les épaules.',
        exercises: [
          { id: 'rear-delt-row', dose: '3 × 12–15', rest: '60 s' },
          { id: 'y-raise', dose: '3 × 12–15', rest: '60 s' },
          { id: 'biceps-curl', dose: '3 × 12–15', rest: '60 s' }
        ]
      },
      {
        title: 'Finition gainage',
        badge: '3 séries · repos 45 s',
        note: 'Garde le bas du dos proche du sol et la nuque longue.',
        exercises: [{ id: 'bicycle-crunch', dose: '3 × 12–16', rest: '45 s' }]
      }
    ]
  }
};

/* --------------------------------------------------------------------------
   Programmes hebdomadaires
   -------------------------------------------------------------------------- */

const PLANS = {
  '15': {
    id: '15',
    tabLabel: '15 min',
    tabSub: '4 jours',
    eyebrow: 'Programme débutant · 4 jours / 7',
    heroTitle: 'Un haut du corps plus fort en <em>15 minutes</em>.',
    heroSub: 'Quatre séances courtes, trois jours de repos. Chaque mouvement est démontré en GIF, avec la bonne dose et la bande conseillée.',
    stats: [
      ['4', 'séances'],
      ['3', 'repos'],
      ['15', 'min / séance'],
      ['5', 'mouvements']
    ],
    week: [
      { day: 'Lundi', short: 'Lun', type: 'train', title: 'Base', focus: 'Full haut', session: 'base15', duration: '15 min', accent: '#F2D23E' },
      { day: 'Mardi', short: 'Mar', type: 'rest', title: 'Repos', focus: 'Récupération', duration: '—' },
      { day: 'Mercredi', short: 'Mer', type: 'train', title: 'Dos', focus: 'Dos & posture', session: 'back15', duration: '15 min', accent: '#E45D4E' },
      { day: 'Jeudi', short: 'Jeu', type: 'rest', title: 'Repos', focus: 'Récupération', duration: '—' },
      { day: 'Vendredi', short: 'Ven', type: 'train', title: 'Équilibre', focus: 'Pousser & tirer', session: 'balance15', duration: '15 min', accent: '#20241F' },
      { day: 'Samedi', short: 'Sam', type: 'train', title: 'Bras', focus: 'Bras & gainage', session: 'arms15', duration: '15 min', accent: '#7C55B7' },
      { day: 'Dimanche', short: 'Dim', type: 'rest', title: 'Repos', focus: 'Récupération', duration: '—' }
    ]
  },
  '30': {
    id: '30',
    tabLabel: '30 min',
    tabSub: '4 jours',
    eyebrow: 'Programme progressif · 4 jours / 7',
    heroTitle: 'Plus de volume, toujours <em>sans salle</em>.',
    heroSub: 'Le même rythme de quatre jours, avec des blocs force et volume pour construire du muscle et de la posture.',
    stats: [
      ['4', 'séances'],
      ['3', 'repos'],
      ['30', 'min / séance'],
      ['7', 'mouvements']
    ],
    week: [
      { day: 'Lundi', short: 'Lun', type: 'train', title: 'Push', focus: 'Pectoraux & épaules', session: 'push30', duration: '30 min', accent: '#F2D23E' },
      { day: 'Mardi', short: 'Mar', type: 'rest', title: 'Repos', focus: 'Récupération', duration: '—' },
      { day: 'Mercredi', short: 'Mer', type: 'train', title: 'Pull', focus: 'Dos & biceps', session: 'pull30', duration: '30 min', accent: '#E45D4E' },
      { day: 'Jeudi', short: 'Jeu', type: 'rest', title: 'Repos', focus: 'Récupération', duration: '—' },
      { day: 'Vendredi', short: 'Ven', type: 'train', title: 'Full haut', focus: 'Tout le haut du corps', session: 'full30', duration: '30 min', accent: '#20241F' },
      { day: 'Samedi', short: 'Sam', type: 'train', title: 'Bras', focus: 'Bras & gainage', session: 'arms30', duration: '30 min', accent: '#7C55B7' },
      { day: 'Dimanche', short: 'Dim', type: 'rest', title: 'Repos', focus: 'Récupération', duration: '—' }
    ]
  },
  '60': {
    id: '60',
    tabLabel: '60 min',
    tabSub: '4 jours',
    eyebrow: 'Programme complet · 4 jours / 7',
    heroTitle: 'La séance complète, <em>une heure</em> pour tout travailler.',
    heroSub: 'Un split push / pull sur quatre jours, avec des repos plus longs et plus de séries. Commence par 2 séances par semaine si tu débutes.',
    stats: [
      ['4', 'séances'],
      ['3', 'repos'],
      ['60', 'min / séance'],
      ['7', 'mouvements']
    ],
    week: [
      { day: 'Lundi', short: 'Lun', type: 'train', title: 'Push A', focus: 'Force pectoraux', session: 'pushA60', duration: '60 min', accent: '#F2D23E' },
      { day: 'Mardi', short: 'Mar', type: 'rest', title: 'Repos', focus: 'Récupération', duration: '—' },
      { day: 'Mercredi', short: 'Mer', type: 'train', title: 'Pull A', focus: 'Force dos', session: 'pullA60', duration: '60 min', accent: '#E45D4E' },
      { day: 'Jeudi', short: 'Jeu', type: 'rest', title: 'Repos', focus: 'Récupération', duration: '—' },
      { day: 'Vendredi', short: 'Ven', type: 'train', title: 'Push B', focus: 'Volume & rotation', session: 'pushB60', duration: '60 min', accent: '#20241F' },
      { day: 'Samedi', short: 'Sam', type: 'train', title: 'Pull B', focus: 'Posture & volume', session: 'pullB60', duration: '60 min', accent: '#7C55B7' },
      { day: 'Dimanche', short: 'Dim', type: 'rest', title: 'Repos', focus: 'Récupération', duration: '—' }
    ]
  }
};

/* --------------------------------------------------------------------------
   État et stockage local
   -------------------------------------------------------------------------- */

const STORAGE_KEY = 'bandup-progress-v1';
const state = { plan: '15', day: 0, done: {} };
let currentExerciseMap = new Map();
let restInterval = null;
let restTotal = 60;
let restRemaining = 60;
let restEndAt = 0;
let restRunning = false;
let lastFocusedElement = null;

function safeLoadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved && PLANS[saved.plan]) state.plan = saved.plan;
    if (Number.isInteger(saved.day) && saved.day >= 0 && saved.day < 7) state.day = saved.day;
    if (saved.done && typeof saved.done === 'object') state.done = saved.done;
  } catch (_) {
    /* localStorage peut être indisponible en file://, l'app reste utilisable. */
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {
    /* silencieux */
  }
}

function exerciseKey(planId, dayIndex, blockIndex, exIndex) {
  return `${planId}:${dayIndex}:${blockIndex}:${exIndex}`;
}

function flattenSession(session) {
  return session.blocks.flatMap((block, blockIndex) =>
    block.exercises.map((exercise, exIndex) => ({ ...exercise, blockIndex, exIndex, blockTitle: block.title }))
  );
}

function getDayProgress(planId, dayIndex) {
  const plan = PLANS[planId];
  const day = plan && plan.week[dayIndex];
  if (!day || day.type !== 'train') return { done: 0, total: 0 };
  const exercises = flattenSession(SESSIONS[day.session]);
  const done = exercises.filter((_, index) => {
    const blockIndex = exercises[index].blockIndex;
    const exIndex = exercises[index].exIndex;
    return Boolean(state.done[exerciseKey(planId, dayIndex, blockIndex, exIndex)]);
  }).length;
  return { done, total: exercises.length };
}

function firstTrainingDay(planId) {
  const plan = PLANS[planId];
  return Math.max(0, plan.week.findIndex((day) => day.type === 'train'));
}

function nextTrainingDayFrom(dayIndex) {
  const plan = PLANS[state.plan];
  for (let step = 1; step <= 7; step += 1) {
    const index = (dayIndex + step) % 7;
    if (plan.week[index].type === 'train') return index;
  }
  return firstTrainingDay(state.plan);
}

/* --------------------------------------------------------------------------
   Rendu de la page
   -------------------------------------------------------------------------- */

function renderTabs() {
  document.querySelectorAll('.plan-tab').forEach((tab) => {
    const active = tab.dataset.plan === state.plan;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
}

function renderHero() {
  const plan = PLANS[state.plan];
  document.getElementById('heroEyebrow').innerHTML = `${icon('spark')} ${plan.eyebrow}`;
  document.getElementById('heroTitle').innerHTML = plan.heroTitle;
  document.getElementById('heroSub').textContent = plan.heroSub;
  document.getElementById('heroStats').innerHTML = plan.stats
    .map(([value, label]) => `<div class="stat"><strong>${value}</strong><span>${label}</span></div>`)
    .join('');

  const trainingDays = plan.week
    .map((day, index) => ({ ...day, index }))
    .filter((day) => day.type === 'train');

  document.getElementById('agendaList').innerHTML = trainingDays
    .map(
      (day) => `
      <button class="agenda-row" type="button" data-goto-day="${day.index}">
        <span class="agenda-day">${day.short}</span>
        <span class="agenda-copy">
          <strong>${day.title}</strong>
          <small>${day.focus}</small>
        </span>
        <span class="agenda-duration">${day.duration}</span>
        ${icon('arrow')}
      </button>`
    )
    .join('');

  document.getElementById('agendaRest').innerHTML = `${icon('moon')} <span><strong>3 jours de repos.</strong> C’est là que le muscle se construit.</span>`;
}

function renderWeek() {
  const plan = PLANS[state.plan];
  const grid = document.getElementById('weekGrid');
  grid.innerHTML = plan.week
    .map((day, index) => {
      const selected = index === state.day;
      const isTrain = day.type === 'train';
      const progress = isTrain ? getDayProgress(state.plan, index) : { done: 0, total: 0 };
      const complete = isTrain && progress.total > 0 && progress.done === progress.total;
      return `
        <button class="day-card ${selected ? 'is-selected' : ''} ${isTrain ? 'is-train' : 'is-rest'} ${complete ? 'is-complete' : ''}"
          type="button" data-day="${index}" aria-pressed="${selected}"
          style="--day-accent:${day.accent || '#D8DFD0'}">
          <span class="day-top">
            <span class="day-name">${day.short}</span>
            ${isTrain ? `<span class="day-mark">${complete ? icon('check') : `${progress.done}/${progress.total}`}</span>` : `<span class="day-mark day-mark--rest">${icon('moon')}</span>`}
          </span>
          <strong class="day-title">${day.title}</strong>
          <span class="day-focus">${day.focus}</span>
          <span class="day-duration">${isTrain ? day.duration : 'Récupération'}</span>
        </button>`;
    })
    .join('');
}

function renderWarmup(warmup, type) {
  const isWarmup = type === 'warmup';
  return `
    <details class="ritual" ${isWarmup ? 'open' : ''}>
      <summary>
        <span class="ritual-icon">${icon(isWarmup ? 'flame' : 'refresh')}</span>
        <span class="ritual-copy">
          <strong>${isWarmup ? 'Échauffement' : 'Retour au calme'}</strong>
          <small>${isWarmup ? 'À ne pas sauter' : 'Quelques minutes pour récupérer'}</small>
        </span>
        <span class="ritual-time">${isWarmup ? (warmup.length === 3 ? '2 min' : warmup.length === 5 ? '4 min' : '7 min') : (warmup.length === 3 ? '3 min' : warmup.length === 4 ? '3 min' : '6 min')}</span>
        ${icon('chevron', 'chevron')}
      </summary>
      <ol class="ritual-list">
        ${warmup.map((item) => `<li><span class="ritual-name">${item.name}${item.note ? `<small>${item.note}</small>` : ''}</span><span class="ritual-dose">${item.dose}</span></li>`).join('')}
      </ol>
    </details>`;
}

function renderExerciseCard(exercise, blockIndex, exIndex) {
  const data = EXERCISES[exercise.id];
  const key = exerciseKey(state.plan, state.day, blockIndex, exIndex);
  const checked = Boolean(state.done[key]);
  const restSeconds = parseInt(exercise.rest, 10) || 45;
  return `
    <article class="exercise-card ${checked ? 'is-done' : ''}" data-ex-key="${key}">
      <div class="ex-media">
        <img src="${data.gif}" alt="Démonstration animée : ${data.name} avec une bande élastique" width="180" height="180">
        <span class="gif-badge"><span class="gif-dot"></span>GIF</span>
        <span class="equipment-badge">${data.anchor ? `${icon('anchor')} Ancrage` : 'Sans ancrage'}</span>
      </div>
      <div class="ex-body">
        <div class="ex-tags">
          <span class="muscle-tag">${data.muscles[0]}</span>
          <span class="level-tag">Débutant</span>
        </div>
        <h3>${data.name}</h3>
        <p class="ex-meta"><strong>${exercise.dose}</strong><span class="meta-dot">·</span><span>repos ${exercise.rest}</span></p>
        ${exercise.note ? `<p class="ex-note">${exercise.note}</p>` : ''}
        <div class="ex-actions">
          <button class="action-link" type="button" data-detail="${key}">${icon('info')} Technique</button>
          <button class="action-link" type="button" data-rest="${restSeconds}">${icon('clock')} Repos</button>
          <label class="check">
            <input type="checkbox" data-check="${key}" ${checked ? 'checked' : ''} aria-label="Marquer ${data.name} comme fait">
            <span class="check-box">${icon('check')}</span>
            <span>Fait</span>
          </label>
        </div>
      </div>
    </article>`;
}

function renderSession(day) {
  const session = SESSIONS[day.session];
  const allExercises = flattenSession(session);
  const total = allExercises.length;
  const done = allExercises.filter((exercise) => state.done[exerciseKey(state.plan, state.day, exercise.blockIndex, exercise.exIndex)]).length;

  currentExerciseMap = new Map();
  session.blocks.forEach((block, blockIndex) => {
    block.exercises.forEach((exercise, exIndex) => {
      currentExerciseMap.set(exerciseKey(state.plan, state.day, blockIndex, exIndex), {
        ...exercise,
        blockTitle: block.title
      });
    });
  });

  const blocks = session.blocks
    .map(
      (block, blockIndex) => `
      <section class="block">
        <div class="block-head">
          <div>
            <h3>${block.title}</h3>
            ${block.note ? `<p>${block.note}</p>` : ''}
          </div>
          <span class="block-badge">${block.badge}</span>
        </div>
        <div class="exercise-grid">
          ${block.exercises.map((exercise, exIndex) => renderExerciseCard(exercise, blockIndex, exIndex)).join('')}
        </div>
      </section>`
    )
    .join('');

  document.getElementById('sessionContent').innerHTML = `
    <section class="session-panel" id="session">
      <div class="session-head">
        <div class="session-heading">
          <div class="session-kicker">${day.day} · ${day.duration} <span class="kicker-dot"></span> ${session.kicker}</div>
          <h2>${session.title}<span class="heading-dot" style="--dot:${day.accent}"></span></h2>
          <p>${session.blurb}</p>
        </div>
        <div class="session-equipment">
          <span>${icon('target')} Bandes élastiques</span>
          <span>${icon('timer')} ${day.duration}</span>
        </div>
      </div>

      ${renderWarmup(session.warmup, 'warmup')}

      <div class="session-progress" id="sessionProgress">
        <div class="progress-copy">
          <strong><span id="progressCount">${done}/${total}</span> exercices faits</strong>
          <span id="progressHint">${done === total && total > 0 ? 'Séance terminée, bien joué.' : 'Coche au fur et à mesure.'}</span>
        </div>
        <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}" id="progressBar">
          <span id="progressFill" style="width:${total ? (done / total) * 100 : 0}%"></span>
        </div>
        <button class="progress-toggle" type="button" id="checkAll">${done === total && total > 0 ? 'Tout décocher' : 'Tout cocher'}</button>
      </div>

      ${blocks}

      ${renderWarmup(session.cooldown, 'cooldown')}

      <div class="session-complete" id="sessionDone" ${done === total && total > 0 ? '' : 'hidden'}>
        <span class="complete-icon">${icon('check')}</span>
        <div>
          <strong>Séance terminée.</strong>
          <p>Bois un peu d’eau, note ta bande utilisée et laisse le muscle récupérer.</p>
        </div>
      </div>
    </section>`;
}

function renderRest(day) {
  const next = nextTrainingDayFrom(state.day);
  const nextDay = PLANS[state.plan].week[next];
  document.getElementById('sessionContent').innerHTML = `
    <section class="session-panel rest-panel" id="session">
      <div class="rest-heading">
        <div class="session-kicker">${day.day} · Jour de repos</div>
        <h2>Tu progresses <em>aussi</em> au repos.</h2>
        <p>Le muscle ne se construit pas pendant la séance, mais pendant la récupération. Aujourd’hui, bouge un peu, respire et dors bien.</p>
      </div>
      <div class="rest-grid">
        <article class="rest-card">
          <span class="rest-num">01</span>
          <div class="rest-card-icon">${icon('spark')}</div>
          <h3>Bouge 20–30 min</h3>
          <p>Marche, vélo tranquille ou mobilité douce. Rien qui te met hors d’haleine.</p>
        </article>
        <article class="rest-card">
          <span class="rest-num">02</span>
          <div class="rest-card-icon">${icon('refresh')}</div>
          <h3>Étire ce qui tire</h3>
          <p>Pectoraux, haut du dos, nuque. 5 minutes suffisent, sans forcer.</p>
        </article>
        <article class="rest-card">
          <span class="rest-num">03</span>
          <div class="rest-card-icon">${icon('moon')}</div>
          <h3>Dors 7–9 h</h3>
          <p>Le sommeil est le meilleur complément. Garde un rythme régulier.</p>
        </article>
      </div>
      <div class="next-session">
        <div>
          <span>Prochaine séance</span>
          <strong>${nextDay.day} · ${nextDay.title}</strong>
          <small>${nextDay.focus} · ${nextDay.duration}</small>
        </div>
        <button class="btn btn-primary" type="button" data-goto-day="${next}">Voir la séance ${icon('arrow')}</button>
      </div>
    </section>`;
}

function renderDay() {
  const day = PLANS[state.plan].week[state.day] || PLANS[state.plan].week[0];
  if (day.type === 'rest') renderRest(day);
  else renderSession(day);
}

function renderAll() {
  renderTabs();
  renderHero();
  renderWeek();
  renderDay();
}

/* --------------------------------------------------------------------------
   Interactions
   -------------------------------------------------------------------------- */

function setPlan(planId) {
  if (!PLANS[planId] || planId === state.plan) return;
  state.plan = planId;
  state.day = firstTrainingDay(planId);
  saveState();
  renderAll();
}

function selectDay(index, scroll = false) {
  if (index < 0 || index > 6) return;
  state.day = index;
  saveState();
  renderWeek();
  renderDay();
  if (scroll) {
    requestAnimationFrame(() => {
      document.getElementById('session')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

function updateProgressUI() {
  const checks = Array.from(document.querySelectorAll('[data-check]'));
  if (!checks.length) return;
  const total = checks.length;
  const done = checks.filter((check) => check.checked).length;
  const fill = document.getElementById('progressFill');
  const count = document.getElementById('progressCount');
  const bar = document.getElementById('progressBar');
  const hint = document.getElementById('progressHint');
  const toggle = document.getElementById('checkAll');
  const banner = document.getElementById('sessionDone');

  if (fill) fill.style.width = `${total ? (done / total) * 100 : 0}%`;
  if (count) count.textContent = `${done}/${total}`;
  if (bar) bar.setAttribute('aria-valuenow', String(done));
  if (hint) hint.textContent = done === total ? 'Séance terminée, bien joué.' : 'Coche au fur et à mesure.';
  if (toggle) toggle.textContent = done === total ? 'Tout décocher' : 'Tout cocher';
  if (banner) banner.hidden = !(done === total && total > 0);

  document.querySelectorAll('.exercise-card').forEach((card) => {
    const check = card.querySelector('[data-check]');
    card.classList.toggle('is-done', Boolean(check && check.checked));
  });

  const weekDay = document.querySelector(`.day-card[data-day="${state.day}"]`);
  if (weekDay) {
    const mark = weekDay.querySelector('.day-mark');
    weekDay.classList.toggle('is-complete', done === total && total > 0);
    if (mark) mark.innerHTML = done === total && total > 0 ? icon('check') : `${done}/${total}`;
  }
}

function toggleAllExercises() {
  const checks = Array.from(document.querySelectorAll('[data-check]'));
  if (!checks.length) return;
  const allChecked = checks.every((check) => check.checked);
  checks.forEach((check) => {
    check.checked = !allChecked;
    const key = check.dataset.check;
    if (allChecked) delete state.done[key];
    else state.done[key] = true;
  });
  saveState();
  updateProgressUI();
}

function findExerciseMeta(key) {
  return currentExerciseMap.get(key);
}

function openExerciseDetail(key) {
  const meta = findExerciseMeta(key);
  if (!meta) return;
  const exercise = EXERCISES[meta.id];
  const restSec = parseInt(meta.rest, 10) || 45;
  lastFocusedElement = document.activeElement;
  setModalContent(`
    <div class="detail-grid">
      <div class="detail-media">
        <div class="detail-gif-wrap">
          <img src="${exercise.gif}" alt="Démonstration animée : ${exercise.name}" width="180" height="180">
        </div>
        <div class="detail-media-meta">
          <span><span class="gif-dot"></span> Démonstration animée</span>
          <span>${exercise.anchor ? `${icon('anchor')} Ancrage requis` : 'Sans ancrage'}</span>
        </div>
        <div class="detail-band">
          <span class="detail-label">Bande conseillée</span>
          <strong>${exercise.band}</strong>
        </div>
      </div>
      <div class="detail-copy">
        <div class="ex-tags">
          <span class="muscle-tag">${exercise.muscles.join(' · ')}</span>
          <span class="level-tag">Débutant</span>
        </div>
        <h2>${exercise.name}</h2>
        <p class="detail-summary">${exercise.summary}</p>
        <div class="detail-meta-grid">
          <div><span>Format</span><strong>${meta.dose}</strong></div>
          <div><span>Repos</span><strong>${meta.rest}</strong></div>
          <div><span>Matériel</span><strong>${exercise.setup}</strong></div>
        </div>
        <h3>Comment faire</h3>
        <ol class="detail-steps">${exercise.cues.map((cue) => `<li>${cue}</li>`).join('')}</ol>
        <div class="detail-tip-grid">
          <div class="tip-card tip-card--warn"><span>${icon('info')} À éviter</span><p>${exercise.mistake}</p></div>
          <div class="tip-card tip-card--good"><span>${icon('spark')} Le conseil</span><p>${exercise.tip}</p></div>
        </div>
        <button class="btn btn-primary detail-rest" type="button" data-rest="${restSec}">${icon('timer')} Lancer le repos (${meta.rest})</button>
      </div>
    </div>
  `);
}

function openGuide() {
  lastFocusedElement = document.activeElement;
  setModalContent(`
    <div class="guide-head">
      <span class="guide-kicker">${icon('spark')} Guide rapide</span>
      <h2>Choisir sa bande, sans se tromper.</h2>
      <p>Les couleurs de ton set correspondent à des résistances différentes. Commence plus léger que tu ne le penses : la technique d’abord, la résistance ensuite.</p>
    </div>
    <div class="band-table" role="table" aria-label="Correspondance des couleurs de bandes">
      <div class="band-table-head" role="row">
        <span role="columnheader">Bande</span><span role="columnheader">Niveau</span><span role="columnheader">Résistance</span><span role="columnheader">Quand l’utiliser</span>
      </div>
      ${BANDS.map(
        (band) => `
        <div class="band-row" role="row">
          <span class="band-name" role="cell"><i class="band-swatch" style="--swatch:${band.color}"></i>${band.name}</span>
          <span class="band-level" role="cell">${band.level}</span>
          <span class="band-resistance" role="cell"><strong>${band.lbs}</strong><small>${band.kg}</small></span>
          <span class="band-use" role="cell">${band.use}</span>
        </div>`
      ).join('')}
    </div>
    <div class="guide-columns">
      <section class="guide-block">
        <h3>Pour débuter</h3>
        <ul class="guide-list">
          <li><strong>Jaune et rouge</strong> pour les élévations, les curls et les développés d’épaules.</li>
          <li><strong>Rouge ou noire</strong> pour les rowings et les tirages, si tu contrôles la descente.</li>
          <li><strong>Violette et verte</strong> seulement quand tu fais 15 répétitions propres avec la noire.</li>
        </ul>
      </section>
      <section class="guide-block">
        <h3>Comment progresser</h3>
        <ul class="guide-list">
          <li>D’abord <strong>plus de répétitions</strong> (jusqu’à 15–20).</li>
          <li>Puis <strong>une bande plus forte</strong> ou la bande raccourcie dans la main.</li>
          <li>Enfin <strong>ralentis la descente</strong> à 3–4 secondes.</li>
        </ul>
      </section>
    </div>
    <div class="safety-box">
      <span class="safety-icon">${icon('shield')}</span>
      <div>
        <h3>Sécurité — les 5 règles</h3>
        <ol>
          <li>Inspecte la bande avant chaque séance : pas de déchirure, pas de trou.</li>
          <li>Ancre-la à un point fixe et solide. Tire doucement pour tester avant de forcer.</li>
          <li>Ne l’étire jamais au-delà de 3 fois sa longueur et ne la relâche pas d’un coup.</li>
          <li>Garde le dos droit, les épaules basses et la respiration continue.</li>
          <li>Douleur vive, vertige ou essoufflement anormal : arrête et consulte un professionnel.</li>
        </ol>
      </div>
    </div>
    <div class="guide-footer">
      <p>Démonstrations : <a href="https://github.com/hasaneyldrm/exercises-dataset" target="_blank" rel="noopener noreferrer">exercises-dataset</a> · médias © <a href="https://gymvisual.com/" target="_blank" rel="noopener noreferrer">Gym visual</a>. Contenu éducatif, pas un avis médical.</p>
      <button class="btn btn-primary" type="button" data-close-modal>J’ai compris</button>
    </div>
  `);
}

function setModalContent(html) {
  const modal = document.getElementById('exerciseModal');
  document.getElementById('modalContent').innerHTML = html;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => {
    modal.classList.add('is-open');
    modal.querySelector('.modal-close')?.focus();
  });
}

function closeModal() {
  const modal = document.getElementById('exerciseModal');
  if (!modal || modal.hidden) return;
  modal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  window.setTimeout(() => {
    modal.hidden = true;
    document.getElementById('modalContent').innerHTML = '';
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
  }, 160);
}

/* --------------------------------------------------------------------------
   Minuteur de repos
   -------------------------------------------------------------------------- */

function formatSeconds(value) {
  const seconds = Math.max(0, Math.ceil(value));
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return minutes > 0 ? `${minutes}:${String(rest).padStart(2, '0')}` : String(rest);
}

function updateRestUI() {
  const widget = document.getElementById('restWidget');
  const time = document.getElementById('restTime');
  const ring = document.getElementById('restRing');
  const hint = document.getElementById('restHint');
  const toggle = document.getElementById('restToggle');
  if (!widget || !time || !ring) return;
  const progress = restTotal > 0 ? restRemaining / restTotal : 0;
  ring.style.setProperty('--progress', String(Math.max(0, Math.min(1, progress))));
  time.textContent = restRemaining <= 0 ? 'OK' : formatSeconds(restRemaining);
  hint.textContent = restRemaining <= 0 ? 'Repos terminé. À toi de jouer.' : 'Respire, relâche les épaules.';
  toggle.innerHTML = restRunning ? 'Pause' : restRemaining <= 0 ? 'Relancer' : 'Reprendre';
  widget.classList.toggle('is-finished', restRemaining <= 0);
}

function startRest(seconds) {
  const widget = document.getElementById('restWidget');
  if (!widget) return;
  restTotal = Math.max(5, Number(seconds) || 60);
  restRemaining = restTotal;
  restEndAt = Date.now() + restTotal * 1000;
  restRunning = true;
  widget.hidden = false;
  updateRestUI();
  if (restInterval) window.clearInterval(restInterval);
  restInterval = window.setInterval(() => {
    if (!restRunning) return;
    restRemaining = Math.max(0, (restEndAt - Date.now()) / 1000);
    if (restRemaining <= 0) {
      restRemaining = 0;
      restRunning = false;
      window.clearInterval(restInterval);
      restInterval = null;
      restEndAt = 0;
      playRestBeep();
    }
    updateRestUI();
  }, 200);
}

function toggleRestTimer() {
  const widget = document.getElementById('restWidget');
  if (!widget || widget.hidden) return;
  if (restRemaining <= 0) {
    startRest(restTotal);
    return;
  }
  if (restRunning) {
    restRemaining = Math.max(0, (restEndAt - Date.now()) / 1000);
    restRunning = false;
    if (restInterval) window.clearInterval(restInterval);
    restInterval = null;
  } else {
    restEndAt = Date.now() + restRemaining * 1000;
    restRunning = true;
    restInterval = window.setInterval(() => {
      if (!restRunning) return;
      restRemaining = Math.max(0, (restEndAt - Date.now()) / 1000);
      if (restRemaining <= 0) {
        restRemaining = 0;
        restRunning = false;
        window.clearInterval(restInterval);
        restInterval = null;
        restEndAt = 0;
        playRestBeep();
      }
      updateRestUI();
    }, 200);
  }
  updateRestUI();
}

function closeRestTimer() {
  const widget = document.getElementById('restWidget');
  if (restInterval) window.clearInterval(restInterval);
  restInterval = null;
  restRunning = false;
  if (widget) widget.hidden = true;
}

function playRestBeep() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = 660;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.35);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.4);
    oscillator.addEventListener('ended', () => context.close());
  } catch (_) {
    /* le son est un bonus, jamais bloquant */
  }
}

/* --------------------------------------------------------------------------
   Événements
   -------------------------------------------------------------------------- */

function setupEvents() {
  document.querySelectorAll('.plan-tab').forEach((tab) => {
    tab.addEventListener('click', () => setPlan(tab.dataset.plan));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const tabs = Array.from(document.querySelectorAll('.plan-tab'));
      const current = tabs.indexOf(tab);
      const next = event.key === 'ArrowRight' ? (current + 1) % tabs.length : (current - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
      tabs[next].click();
    });
  });

  document.getElementById('weekGrid').addEventListener('click', (event) => {
    const button = event.target.closest('[data-day]');
    if (button) selectDay(Number(button.dataset.day), true);
  });

  document.getElementById('agendaList').addEventListener('click', (event) => {
    const button = event.target.closest('[data-goto-day]');
    if (button) selectDay(Number(button.dataset.gotoDay), true);
  });

  document.getElementById('startSessionBtn').addEventListener('click', () => {
    const plan = PLANS[state.plan];
    const day = plan.week[state.day];
    const target = day && day.type === 'train' ? state.day : firstTrainingDay(state.plan);
    selectDay(target, true);
  });

  document.getElementById('sessionContent').addEventListener('click', (event) => {
    const gotoButton = event.target.closest('[data-goto-day]');
    if (gotoButton) {
      selectDay(Number(gotoButton.dataset.gotoDay), true);
      return;
    }

    const detailButton = event.target.closest('[data-detail]');
    if (detailButton) {
      openExerciseDetail(detailButton.dataset.detail);
      return;
    }

    const restButton = event.target.closest('[data-rest]');
    if (restButton) {
      startRest(Number(restButton.dataset.rest));
      return;
    }

    if (event.target.closest('#checkAll')) {
      toggleAllExercises();
    }
  });

  document.getElementById('sessionContent').addEventListener('change', (event) => {
    const input = event.target.closest('[data-check]');
    if (!input) return;
    const key = input.dataset.check;
    if (input.checked) state.done[key] = true;
    else delete state.done[key];
    saveState();
    updateProgressUI();
  });

  document.getElementById('openGuideBtn').addEventListener('click', openGuide);
  document.getElementById('openGuideSide').addEventListener('click', openGuide);

  document.getElementById('exerciseModal').addEventListener('click', (event) => {
    if (event.target.closest('[data-close-modal]') || event.target.closest('.modal-backdrop')) {
      closeModal();
      return;
    }
    const restButton = event.target.closest('[data-rest]');
    if (restButton) {
      startRest(Number(restButton.dataset.rest));
      closeModal();
      return;
    }
    const guideLink = event.target.closest('[data-open-guide]');
    if (guideLink) openGuide();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  document.getElementById('restToggle').addEventListener('click', toggleRestTimer);
  document.getElementById('restClose').addEventListener('click', closeRestTimer);

  document.getElementById('resetProgress').addEventListener('click', () => {
    state.done = {};
    saveState();
    renderAll();
  });
}

function init() {
  safeLoadState();
  if (!PLANS[state.plan]) state.plan = '15';
  if (!Number.isInteger(state.day) || state.day < 0 || state.day > 6) state.day = 0;
  setupEvents();
  renderAll();
}

document.addEventListener('DOMContentLoaded', init);
