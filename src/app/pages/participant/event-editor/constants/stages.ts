import { StageData } from '../interfaces/stage.interface'

export const StagesData: Record<number, StageData> = {
  1: {
    background: 'assets/images/fondo_enigma.png',
    image: 'assets/images/cofre.png',
    description: `
        Mientras inspeccionáis la consulta del curandero, descubrís una estantería inclinada con
        libros desordenados, frascos rotos y un cofre sellado con un mensaje grabado:
        <span class="italic">«Solo quienes conozcan los secretos del cuerpo podrán abrirlo.»</span>
      `,
    riddle: `
        En el interior del cuerpo humano, más allá de huesos y sangre, mora un vasto reino sin
        reyes ni castillos, pero lleno de vida diminuta, invisible al ojo del monje. No es uno,
        sino miles, y no están solos: interactúan entre sí, y contigo también. Te ayudan a
        digerir, a defenderte y a sanar, como un consejo secreto que mantiene el equilibrio del
        reino interior. No son enfermedad, sino parte de ti. Dime, sabio viajero. <br/>¿Cómo se llama
        este conjunto de seres microscópicos que residen e interactúan en tu cuerpo como aliados
        silenciosos?
      `,
    answer: 'microbiota',
  },
  2: {
    background: 'assets/images/fondo_enigma.png',
    image: 'assets/images/balanza.png',
    description: `
        Dentro del cofre encontráis una vieja balanza y varios objetos dispersos. Una nota reza:
        <span class="italic">«Alimenta el cuerpo, fortalece la vida.»</span>
      `,
    riddle: `
        Debes colocar en la balanza los alimentos que ayuden a mantener el equilibrio interior:
        frutas, verduras, legumbres y alimentos fermentados.
        ¡Cuidado con los objetos engañosos!
      `,
    answer: 'balanza',
  },
  3: {
    background: 'assets/images/fondo_enigma.png',
    image: 'assets/images/casos.png',
    questions: [
      {
        type: 'single-select',
        question:
          'Solo uno de estos merece el barro sagrado (trasplante fecal). Elige con sabiduría.',
        answers: [
          {
            id: 1,
            text: 'Dolor abdominal tras las comidas, sin mejora con dieta.',
            correct: false,
          },
          {
            id: 2,
            text: 'Diarreas recurrentes, fiebres y pruebas positivas repetidas.',
            correct: true,
          },
          {
            id: 3,
            text: 'Estreñimiento crónico desde la infancia.',
            correct: false,
          },
          {
            id: 4,
            text: 'Infecciones urinarias de repetición.',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
        feedback: 'La cura no siempre es destruir… a veces es sembrar de nuevo.',
      },
    ],
    viewResults: {
      award: 'assets/images/map.jpg',
      title: 'Felicidades, has completado la etapa 1',
      description: '',
      buttonText: 'Obtener pista',
    },
  },
  4: {
    background: 'assets/images/fondo_enigma.png',
    description:
      'Ni ungüento ni bisturí servirán si el enemigo no es bien nombrado. Decidme, médicos del porvenir, ¿cuál es el mal más frecuente que infecta el pie maldito?',
    questions: [
      {
        type: 'image',
        question:
          'Solo uno de estos merece el barro sagrado (trasplante fecal). Elige con sabiduría.',
        answers: [
          {
            id: 1,
            img: 'https://placehold.co/150x150',
            label: 'Bacilo Gram -.',
            correct: false,
          },
          {
            id: 2,
            img: 'https://placehold.co/150x150',
            label: 'Cocos Gram + en cadenas',
            correct: false,
          },
          {
            id: 3,
            img: 'https://placehold.co/150x150',
            label: 'Cocos Gram + en racimos',
            correct: true,
          },
          {
            id: 4,
            img: 'https://placehold.co/150x150',
            label: 'Bacilo Gram +.',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
      },
    ],
    viewResults: {
      title: 'El hechizo del pergamino se rompe, revelando el siguiente paso del camino…',
      description: 'muy bien, habéis conseguido avanzar, ahora escuchar atentos...',
      buttonText: 'Continuar',
    },
  },
  5: {
    background: 'assets/images/fondo_enigma.png',
    questions: [
      {
        type: 'multiple-select',
        question:
          'Selecciona cuales son los criterios que deben estar presentes para declarar una infección clínica en una úlcera de pie.',
        description:
          '¿Acaso esta úlcera presenta los signos de una infección clínica, según dictan los códices de Avicena y los pergaminos de Galeno?',
        answers: [
          {
            id: 1,
            text: 'Dolor',
            correct: true,
          },
          {
            id: 2,
            text: 'Calor',
            correct: true,
          },
          {
            id: 3,
            text: 'Edema',
            correct: true,
          },
          {
            id: 4,
            text: 'Eritema',
            correct: true,
          },
          {
            id: 5,
            text: 'Profundidad de la herida',
            correct: false,
          },
          {
            id: 6,
            text: 'Piel seca',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
        feedback:
          'Habéis leído bien los signos del fuego corporal.Cuando haya pus, y dos signos del fuego corporal —dolor, calor, eritema o edema— ,entonces podrá nombrarse infección con voz firme y gesto sabio.',
      },
      {
        type: 'single-select',
        question:
          '¿Cuál de estas opciones representa la forma adecuada de recoger una muestra para cultivo microbiológico en una herida con sospecha de infección profunda en el pie diabético?',
        description:
          'No todo lo que mana es verdad. El pus puede engañar, y la sangre confundir. Si deseáis conocer al         enemigo que se oculta bajo la piel del peregrino, deberéis tomar la muestra con ciencia y arte.',
        answers: [
          {
            id: 1,
            text: 'Tomar exudado visible con torunda antes de limpiar.',
            correct: false,
          },
          {
            id: 2,
            text: 'Frotar la torunda por el borde y piel inflamada.',
            correct: false,
          },
          {
            id: 3,
            text: 'Limpiar profundamente con suero estéril, desinfectar con clorhexidina, y realizar punción-aspiración sobre piel íntegra inflamada en un angulo de 45º.',
            correct: true,
          },
          {
            id: 4,
            text: 'Introducir torunda tras limpieza con infusión de romero y colocarlo en frasco seco.',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
      },
      {
        type: 'single-select',
        question: '¿Cómo deberéis conservarla y transportarla Si llegan en menos de 2 horas?',
        description:
          'La muestra ha sido recolectada con destreza. Ahora debe llegar al alquimista del castillo. Pero cuidado… si el modo de envío no es el adecuado, el enemigo podría escapar antes de ser revelado.',
        answers: [
          {
            id: 1,
            text: 'Refrigerar',
            correct: false,
          },
          {
            id: 2,
            text: 'No refrigerar',
            correct: true,
          },
        ],
        points: 30,
        timeLeft: 120,
        feedback:
          'No refrigerar, pues los gérmenes si llegan al laboratorio en menos de 2h no necesitan ser transportados en frio',
      },
      {
        type: 'single-select',
        question: '¿Cómo deberéis conservarla y transportarla si llegan en más de 2 horas?',
        description:
          'La muestra ha sido recolectada con destreza. Ahora debe llegar al alquimista del castillo. Pero cuidado… si el modo de envío no es el adecuado, el enemigo podría escapar antes de ser revelado.',
        answers: [
          {
            id: 1,
            text: 'Refrigerar',
            correct: true,
          },
          {
            id: 2,
            text: 'No refrigerar',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
        feedback:
          'Refrigerar si el tiempo de traslado al laboratorio es mayor a 2h, pues los gérmenes no toleran el calor y el frío los mantiene en su prisión',
      },
      {
        type: 'single-select',
        question: '¿Cómo deberéis conservarla y transportarla protegidas de la luz?',
        description:
          'La muestra ha sido recolectada con destreza. Ahora debe llegar al alquimista del castillo. Pero cuidado… si el modo de envío no es el adecuado, el enemigo podría escapar antes de ser revelado.',
        answers: [
          {
            id: 1,
            text: 'Protegidas de la luz',
            correct: true,
          },
          {
            id: 2,
            text: 'No protegidas de la luz',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
        feedback: 'Sabio habéis sido, pues los gérmenes no toleran la luz',
      },
      {
        type: 'single-select',
        question:
          '¿Además de en infección intensa, ¿Cuándo se desaconseja el tratamiento con terapia presión negativa en una UPD?',
        description:
          'El alquimista ha oído hablar de una terapia moderna que succiona el mal y acelera la curación (terapia de presión negativa). Pero también ha sido advertido: usada en el momento equivocado, puede empeorar el daño.',
        answers: [
          {
            id: 1,
            text: 'Osteomielitis no tratada',
            correct: true,
          },
          {
            id: 2,
            text: 'UPD en resolución',
            correct: false,
          },
          {
            id: 3,
            text: 'Insuficiencia cardiaca',
            correct: false,
          },
          {
            id: 4,
            text: 'Alergia al yodo',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
      },
      {
        type: 'single-select',
        question: '¿Es adecuado administrar Piperacilina/Tazobactam mediante PICC/Midline?',
        description:
          'El clérigo farmacéutico señala que para administrar el elixir Piperacilina/Tazobactam, debe usarse una vía segura, que no dañe al portador ni se extravíe en la piel del peregrino.',
        answers: [
          {
            id: 1,
            text: 'Si',
            correct: true,
          },
          {
            id: 2,
            text: 'No',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
      },
      {
        type: 'text',
        question:
          'Según la estabilidad de este antibiótico, una vez diluido, es posible administrarlo mediante bomba de infusión intermitente en el domicilio durante periodos de',
        description:
          'El alquimista de la torre os pregunta: ‘¿Este antibiótico puede resistir la jornada completa sin corromperse?',
        answers: [
          {
            id: 1,
            text: '24',
            correct: true,
          },
        ],
        points: 30,
        timeLeft: 120,
      },
    ],
    viewResults: {
      award: 'assets/images/D.png',
      title: 'Felicidades, has completado la etapa 2',
      description:
        'Antes de caer preso del dolor, el curandero del bosque me entregó este pergamino, diciendo que sería de utilidad para quien lograse devolverme el paso. No comprendí sus palabras… hasta hoy.” Con manos aún débiles, extiende un papel arrugado. Al desplegarlo, brillando con luz propia, aparece escrita en tinta seca una sola letra:',
      buttonText: 'Obtener pista',
    },
  },
  6: {
    background: 'assets/images/fondo_enigma.png',
    description: 'Junto a cada uno, tres casillas vacías que exigen ser llenadas con sabiduría.',
    antibioticChallenge: {
      antibiotics: [
        {
          name: 'Ceftriaxona',
          correct: {
            stability: 'Estable 24h',
            administration: 'Acceso venoso periférico',
            note: 'Puede usarse en bolo lento',
          },
        },
        {
          name: 'Meropenem',
          correct: {
            stability: 'Inestable, debe refrigerarse',
            administration: 'PICC o Midline',
            note: 'Necesita reconstitución inmediata antes de usar',
          },
        },
        {
          name: 'Ertapenem',
          correct: {
            stability: 'Estable 24h',
            administration: 'PICC o Midline',
            note: 'No mezclar con bicarbonato',
          },
        },
        {
          name: 'Vancomicina',
          correct: {
            stability: 'Estable 24h',
            administration: 'PICC o Midline',
            note: 'No estable en perfusión continua',
          },
        },
        {
          name: 'Daptomicina',
          correct: {
            stability: 'Estable 12h',
            administration: 'PICC o Midline',
            note: 'Riesgo de miopatía, diluir bien',
          },
        },
        {
          name: 'Amoxicilina clavulanico',
          correct: {
            stability: 'Estable 6-8 horas',
            administration: 'Vía oral',
            note: 'Compatible con administración oral',
          },
        },
      ],
      // Opcional si quieres hacerlo configurable desde aquí también
      options: {
        stability: [
          'Estable 24h',
          'Inestable, debe refrigerarse',
          'Estable 12h',
          'Estable 6-8 horas',
        ],
        administration: ['Acceso venoso periférico', 'PICC o Midline', 'Vía oral'],
        note: [
          'Puede usarse en bolo lento',
          'Necesita reconstitución inmediata antes de usar',
          'No mezclar con bicarbonato',
          'No estable en perfusión continua',
          'Riesgo de miopatía, diluir bien',
          'Compatible con administración oral',
          'No mezclar con otros antibióticos',
        ],
      },
    },
    viewResults: {
      award: 'assets/images/scroll4.png',
      title: 'Felicidades, has logrado identificar correctamente los secretos de cada elixir.',
      description: 'La sabiduría os guía, y el pergamino revela su próximo misterio...',
      buttonText: 'Continuar',
    },
  },
  7: {
    description:
      '¡No todos los elixires valen para esta peste! Los nuevos brebajes de los alquimistas no le afectan... ¿Cuál de estas elecciones sanará sin errar?',
    questions: [
      {
        type: 'single-select',
        question:
          'Elige con sabiduría cuál sería el tratamiento más certero para una infección grave causada por Pseudomonas aeruginosa productora de VIM',
        answers: [
          {
            id: 1,
            text: 'Meropenem-vaborbactam o ceftazidima-avibactam, que destruyen todo β-lactámico enemigo.',
            correct: false,
          },
          {
            id: 2,
            text: 'Colistina o amikacina, pues pocos elixires resisten a tan vil criatura.',
            correct: true,
          },
          {
            id: 3,
            text: 'Imipenem-relebactam, que es fuerte contra toda metalo-magia.',
            correct: false,
          },
          {
            id: 4,
            text: 'Linezolid, extraído de las montañas contra males pulmonares.',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
        feedback:
          'Contra las metalo-bestias como VIM, solo los antiguos venenos —como colistina o la lanza de amikacina— muestran eficacia. Los nuevos compuestos, si bien potentes, nada pueden hacer ante su armadura invisible.',
      },
      {
        type: 'single-select',
        question:
          '¿Es seguro administrar colistina por la vía de los vapores (nebulización) en un paciente de riñones cansados?',
        answers: [
          {
            id: 1,
            text: 'Sí, pues al convertirla en vapores, su camino se queda en el pulmón, y los riñones quedan indemnes.',
            correct: true,
          },
          {
            id: 2,
            text: 'No, la colistina daña los riñones, siempre y sin remedio.',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
      },
      {
        type: 'single-select',
        question: '¿Crees que será efectivo durante todo el día con una sola dosis diaria?',
        answers: [
          {
            id: 1,
            text: 'Sí, porque ha visto en otros campesinos del valle que, poniéndoselo al amanecer o al anochecer, se curan con una sola dosis al día.',
            correct: true,
          },
          {
            id: 2,
            text: 'No, porque necesitan que se les ponga más de una vez al día.',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
      },
      {
        type: 'single-select',
        question:
          '¿Podrá un familiar o vecino aprender a administrar la cura una vez al día durante cuatro días?',
        answers: [
          {
            id: 1,
            text: 'Sí, porque lo ha visto en otros enfermos. No hay más problemas que si lo hiciera el curandero cada día.',
            correct: true,
          },
          {
            id: 2,
            text: 'No, solo lo puede hacer el curandero o sus aprendices.',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
      },
      {
        type: 'single-select',
        question:
          '¿Está relacionada la autoadministración por parte del paciente o sus cuidadores con más complicaciones o reingresos?',
        answers: [
          {
            id: 1,
            text: 'Sí, hay más eventos adversos cuando no lo hace un sanador profesional',
            correct: false,
          },
          {
            id: 2,
            text: 'No, hay tasas de complicaciones similares entre ambas formas de administración',
            correct: true,
          },
        ],
        points: 30,
        timeLeft: 120,
      },
      {
        type: 'text',
        question:
          '¿La educación sanitaria es importante para garantizar la estabilidad de un antimicrobiano que se administre en una bomba o infusor?',
        answers: [
          {
            id: 1,
            text: 'si',
            correct: true,
          },
        ],
        points: 30,
        timeLeft: 120,
      },
      {
        type: 'single-select',
        question:
          '¿Cuál de estas afirmaciones es cierta según los códices actuales en la lucha contra bacilos gramnegativos multirresistentes?',
        answers: [
          {
            id: 1,
            text: 'La colistina y los aminoglucósidos curan tan bien como los nuevos betalactámicos.',
            correct: false,
          },
          {
            id: 2,
            text: 'Si usas ceftazidima-avibactam contra OXA-48, siempre debes añadir colistina o amikacina.',
            correct: false,
          },
          {
            id: 3,
            text: 'Si tienes un buen antibiótico, no importa tanto eliminar el foco de la infección.',
            correct: false,
          },
          {
            id: 4,
            text: 'Todos los nuevos betalactámicos ya han mostrado resistencias en bacilos multirresistentes; y sin control del foco, ni el mejor elixir bastará.',
            correct: true,
          },
        ],
        points: 30,
        timeLeft: 120,
        feedback:
          'Sabía fue vuestra elección. Los elixires son poderosos, sí… pero sin limpiar el foco, la peste siempre vuelve. Y hasta el mejor conjuro ya ha sido burlado por las sombras.',
      },
    ],
    viewResults: {
      award: 'assets/images/4.png',
      title: 'Felicidades, has completado la etapa 3',
      description: '',
      buttonText: 'Obtener pista',
    },
  },
}
