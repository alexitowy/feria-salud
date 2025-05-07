import { StageData } from '../interfaces/stage.interface'

export const StagesData: Record<number, StageData> = {
  1: {
    background: 'assets/images/fondo_enigma.png',
    image: 'assets/images/cofre.png',
    description: `
        Vuestra misión es clara: abrid el cofre, desentrañad el enigma que guarda en su interior y continuad
        vuestro camino hacia la verdad. Pero cuidado… solo una mente afilada y un espíritu atento podrán
        comprender lo que yace oculto tras sus cerraduras.
      `,
    riddle: `
        En el interior del cuerpo humano, más allá de huesos y sangre,
        mora un vasto reino sin reyes ni castillos,
        pero lleno de vida diminuta, invisible al ojo del monje.
        No es uno, sino miles, y no están solos:
        interactúan entre sí, y contigo también.
        Te ayudan a digerir, a defenderte y a sanar,
        como un consejo secreto que mantiene el equilibrio del reino interior.
        No son enfermedad, sino parte de ti.
`,
    answer: 'microbiota',
    dashboard: {
      audio: 'assets/audio/enigma_1.mp3',
    },
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
    dashboard: {},
  },
  3: {
    background: 'assets/images/fondo_enigma.png',
    image: 'assets/images/casos.png',
    questions: [
      {
        type: 'single-select',
        description:
          '“Cuando el invasor regresa una y otra vez, no basta con limpiar… hay que restaurar.” “Solo uno de estos merece el barro sagrado (trasplante fecal), Elige con sabiduría”. Elegir el único caso donde está indicado el trasplante fecal',
        question:
          '1- Solo uno de estos merece el barro sagrado (trasplante fecal). Elige con sabiduría.',
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
      title: 'Vuestra elección ha sido justa',
      description:
        'El curandero os ha dejado esta pista (mapa antiguo) ... Guardadlo bien. Lo necesitaréis pronto.',
      buttonText: 'Obtener pista',
    },
    dashboard: {},
  },
  4: {
    background: 'assets/images/fondo_enigma.png',
    description:
      'Ni ungüento ni bisturí servirán si el enemigo no es bien nombrado. Señaladme, médicos del porvenir',
    questions: [
      {
        type: 'image',
        question: '1- ¿qué germen mora con mayor frecuencia en las heridas del pie diabético?',
        answers: [
          {
            id: 1,
            img: 'assets/images/bacilo_negativo.jpg',
            label: 'Bacilo Gram -.',
            correct: false,
          },
          {
            id: 2,
            img: 'assets/images/coco_cadena.jpg',
            label: 'Cocos Gram + en cadenas',
            correct: false,
          },
          {
            id: 3,
            img: 'assets/images/coco_racimos.jpg',
            label: 'Cocos Gram + en racimos',
            correct: true,
          },
          {
            id: 4,
            img: 'assets/images/bacilo.jpg',
            label: 'Bacilo Gram +.',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
      },
    ],
    dashboard: {},
  },
  5: {
    background: 'assets/images/fondo_enigma.png',
    questions: [
      {
        type: 'multiple-select',
        question:
          '1- Selecciona cuales son los criterios que deben estar presentes para declarar una infección clínica en una úlcera de pie.',
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
          '<strong>Habéis leído bien los signos del fuego corporal.</strong><br>Mas sabed esto: no todo lo que mana es verdad.<br>Si deseáis nombrarlo por su nombre y combatirlo con ciencia, deberéis <strong>tomar la muestra con arte y precisión.</strong>',
      },
      {
        type: 'single-select',
        question:
          '2- ¿Cuál de estas opciones representa la forma adecuada de recoger una muestra para cultivo microbiológico en una herida con sospecha de infección profunda en el pie diabético?',
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
        feedback: `<strong>La muestra ha sido tomada con destreza, como dictan las artes del buen sanador.</strong><br>
                  La punción-aspiración ha revelado su fidelidad, si usáis torunda, que sea con limpieza, presión y ciencia.<br><br>
                  <strong>Mas aún queda un paso crucial…</strong><br>
                  La muestra debe llegar a su destino.<br>
                  Pero si el envío es torpe, el enemigo podría escapar antes de ser revelado.`,
      },
      {
        type: 'single-select',
        question: '3- ¿Debe ir la muestra al frío?',
        description:
          'Sabios viajeros, decir SI o NO en cada supuesto de las condiciones para transportar la muestra si el trayecto dura menos de 2 horas…',
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
      },
      {
        type: 'single-select',
        question: '4- ¿Debe ir la muestra al frío?',
        description:
          'Sabios viajeros, decir SI o NO en cada supuesto de las condiciones para transportar la muestra si el camino supera las 2 horas…',
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
      },
      {
        type: 'single-select',
        question: '5- ¿Debéis proteger la muestra de sus rayos?',
        description:
          'Sabios viajeros, decir SI o NO en cada supuesto de las condiciones para transportar la muestra, sobre la luz del día...',
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
        feedback: `<strong>El alquimista revelara al enemigo.</strong><br>
                  Ahora, sanador, <strong>debéis actuar.</strong><br><br>
                  Se dice que la presión negativa cura…<br>
                  <strong>Pero usada sin juicio, puede herir más que sanar.<strong><br>`,
      },
      {
        type: 'single-select',
        question:
          '6- ¿en cuál de estos escenarios no debe usarse esta terapia, además de en una infección activa?',
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
        feedback: `<strong>El alquimista ha revelado al enemigo. Ahora, el clérigo farmacéutico os entrega el remedio.</strong><br>
                  Pero advierte: “No basta con tener el elixir… ha de entregarse por la vía justa.”`,
      },
      {
        type: 'single-select',
        question: '7- ¿Es correcto usar un PICC o Midline para ello?',
        description: 'Se os encomienda administrar Piperacilina/Tazobactam.',
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
        feedback: `<strong>Habéis elegido la vía con sabiduría, y el elixir ya recorre las venas del peregrino.</strong><br>
                    Mas el alquimista de la torre lanza una nueva pregunta, mientras observa el brebaje burbujear`,
      },
      {
        type: 'image',
        question:
          '8- Una vez diluido, ¿cuántas horas puede administrarse Piperacilina/Tazobactam mediante bomba de infusión en el hogar?',
        description: 'Escoged bien… el tiempo es vida.',
        answers: [
          {
            id: 1,
            img: 'assets/images/24.jpg',
            label: '24',
            correct: true,
          },
          {
            id: 2,
            img: 'assets/images/12.jpg',
            label: '12',
            correct: false,
          },
          {
            id: 3,
            img: 'assets/images/03.jpg',
            label: '03',
            correct: false,
          },
          {
            id: 4,
            img: 'assets/images/15.jpg',
            label: '15',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
      },
    ],
    viewResults: {
      award: 'assets/images/D.png',
      title: 'Habéis obrado con sabiduría.',
      description: `El germen ha sido vencido, y el peregrino comienza a sanar.<br>
                    Con voz débil, os llama:<br>
                    “El curandero del bosque me dio esto…<br>
                    Dijo que sería útil para quien me devolviese el paso.”`,
      buttonText: 'Obtener pista',
    },
    dashboard: {
      audio: 'assets/audio/enigma_2.mp3',
      video: 'assets/video/pie_maldito.mp4',
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
    dashboard: {},
  },
  7: {
    description:
      '¡No todos los elixires valen para esta peste! Los nuevos brebajes de los alquimistas no le afectan... ¿Cuál de estas elecciones sanará sin errar?',
    questions: [
      {
        type: 'single-select',
        description:
          '¡No todos los elixires valen para esta peste! Los nuevos brebajes de los alquimistas no le afectan... ¿Cuál de estas elecciones sanará sin errar?',
        question:
          '1- Elige con sabiduría cuál sería el tratamiento más certero para una infección grave causada por Pseudomonas aeruginosa productora de VIM',
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
        desciption:
          'Existe un viejo polvo, la colistina, que puede tornarse en vapores y ser llevado directo a sus pulmones. No os asustéis por su fama: si va por el aire, no daña los riñones… ¿Acaso me equivoco?',
        question:
          '2- ¿Es seguro administrar colistina por la vía de los vapores (nebulización) en un paciente de riñones cansados?',
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
        description:
          'El joven mejora tras varios días de tratamiento con los vapores del aprendiz del curandero. Respira mejor, tose menos… pero los mocos verdes y asquerosos persisten. Una anciana que ha viajado desde las Tierras del Norte ofrece una solución más poderosa: dos pociones raras —ceftazidima-avibactam y cefiderocol— que, dice, pueden infundirse directo a la sangre una vez al día, justo al amanecer. —Así lo hacen en los valles del norte —explica—, y les dura toda la jornada.',
        question: '3- ¿Crees que será efectivo durante todo el día con una sola dosis diaria?',
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
        description:
          'La anciana asiente. Pero hay un problema: solo puede volver cada cuatro días lunares. Tiene demasiados enfermos que visitar en las tierras lejanas. —Puedo enseñar a un familiar a preparar y administrar el remedio —dice—. Pero ¿será eso seguro?',
        question:
          '4- ¿Podrá un familiar o vecino aprender a administrar la cura una vez al día durante cuatro días?',
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
        description:
          'El paciente, tumbado bajo la sombra de un olivo, con el infusor atado a su brazo, preguntó con voz débil: —¿Y si no lo hace el hechicero? ¿Y si lo hace ella sola, como le habéis enseñado… me puede hacer daño? Uno de los sanitarios, que había leído las escrituras del gremio del siglo XXI (conocido como IDSA), sonrió. —A veces, en otros reinos, incluso los cuidadores han sido instruidos para hacerlo. Y los resultados… han sido buenos.',
        question:
          '5- ¿Está relacionada la autoadministración por parte del paciente o sus cuidadores con más complicaciones o reingresos?',
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
        description:
          'Los días pasaron y el joven campesino mejoraba. La fiebre cedía, los mocos verdes se iban volviendo menos asquerosos y su aliento volvía con más fuerza al pecho. La anciana del norte partió, y fue una mujer del pueblo quien quedó a cargo del tratamiento. Antes de marcharse, la anciana dejó un manuscrito con advertencias y recomendaciones para conservar las pócimas en buenas condiciones, pues dijo: —Estos nuevos remedios son poderosos, pero su fuerza puede disiparse si no se guardan bien. No todos los conjuros duran lo mismo, y hay quienes olvidan que el calor, el frío o la luz pueden descomponer su esencia.',
        question:
          '6- ¿La educación sanitaria es importante para garantizar la estabilidad de un antimicrobiano que se administre en una bomba o infusor?',
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
        description:
          'Uno de los sanitarios, inquieto, revisó las fórmulas. En los márgenes de los textos, escritos con letra apurada,\n encontró una advertencia:\n “Los nuevos elixires combaten a los bacilos oscuros… pero hasta el mejor de ellos puede fallar si no se arranca el mal de raíz.”',
        question:
          '7- ¿Cuál de estas afirmaciones es cierta según los códices actuales en la lucha contra bacilos gramnegativos multirresistentes?',
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
    dashboard: {},
  },
}
