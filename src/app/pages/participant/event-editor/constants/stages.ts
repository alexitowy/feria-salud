import { StageData } from '../interfaces/stage.interface'

export const StagesData: Record<number, StageData> = {
  1: {
    name: ' El enigma del cofre',
    background: 'assets/images/fondo_enigma.webp',
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
    name: ' El enigma del equilibrio',
    background: 'assets/images/fondo_enigma.webp',
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
    name: 'Preguntas enigma equilibrio',
    background: 'assets/images/fondo_enigma.webp',
    image: 'assets/images/casos.png',
    questions: [
      {
        type: 'single-select',
        question:
          '1- Solo uno de estos merece el barro sagrado. Escoge con sabiduría entre los siguientes:',
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
      },
    ],
    viewResults: {
      award: 'assets/images/map.jpg',
      title: 'Vuestra elección ha sido justa',
      description:
        'El curandero os ha dejado esta pista (mapa antiguo) ... Guardadlo bien. Lo necesitaréis pronto.',
      buttonText: 'Obtener pista',
    },
    dashboard: {
      audio: 'assets/audio/3.mp3',
    },
  },
  4: {
    name: ' El enigma del pie maldito',
    background: 'assets/images/fondo_enigma.webp',
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
    name: ' Preguntas pie maldito',
    background: 'assets/images/fondo_enigma.webp',
    questions: [
      {
        type: 'multiple-select',
        question:
          '1- Posad vuestra mirada y marcad con sabiduría, aquellos signos que, junto al exudado purulento, declaran una infección clínica de Ulcera de pie diabética.',
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
        question: `Elegid, ¿cuál de estas opciones representa la forma adecuada de recoger una muestra para cultivo
microbiológico en una herida con sospecha de infección profunda en el pie diabético?`,
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
          '6- Decid entonces: ¿en cuál de estos escenarios no debe usarse esta terapia, además de en una infección activa?',
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
      award: 'assets/images/D.webp',
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
    name: ' El enigma de los elixires',
    background: 'assets/images/fondo_enigma.webp',
    description: 'Junto a cada uno, tres casillas vacías que exigen ser llenadas con sabiduría.',
    antibioticChallenge: {
      antibiotics: [
        {
          name: 'Ceftriaxona',
          correct: {
            stability: 'Estable 24h',
            note: 'Puede usarse en bolo lento',
          },
        },
        {
          name: 'Meropenem',
          correct: {
            stability: 'Estable 30h según estudios recientes',
            note: 'Necesita reconstitución inmediata antes de usar',
          },
        },
        {
          name: 'Vancomicina',
          correct: {
            stability: 'Estable 24h',
            note: 'Ojo al síndrome del hombre rojo',
          },
        },
        {
          name: 'Daptomicina',
          correct: {
            stability: 'Estable 12h',
            note: 'Riesgo de miopatía si se asocia a estatinas',
          },
        },
        {
          name: 'Amoxicilina/Clavulánico',
          correct: {
            stability: 'Estable 6-8 horas',
            note: 'Compatible con administración oral',
          },
        },
        {
          name: 'Ceftazidima/Avibactam',
          correct: {
            stability: 'Estable 24h a temperatura ambiente (últimos estudios)',
            note: 'Ojo con diarreas por Clostridium difficile',
          },
        },
      ],
      options: {
        stability: [
          'Estable 24h',
          'Inestable, debe refrigerarse',
          'Estable 12h',
          'Estable 6-8 horas',
          'Estable 30h según estudios recientes',
          'Estable 24h a temperatura ambiente (últimos estudios)',
        ],
        note: [
          'Puede usarse en bolo lento',
          'Necesita reconstitución inmediata antes de usar',
          'Ojo con diarreas por Clostridium difficile',
          'No estable en perfusión continua',
          'Riesgo de miopatía si se asocia a estatinas',
          'Compatible con administración oral',
          'No mezclar con otros antibióticos',
          'Ojo al síndrome del hombre rojo',
        ],
      },
    },
    dashboard: {
      audio: 'assets/audio/6.mp3',
    },
  },
  7: {
    name: 'Preguntas de los elixires',
    questions: [
      {
        type: 'image',
        description:
          'Dicen que este elixir —ceftazidima-avibactam— ha vencido otras pestes (KPC y OXA-48) …',
        question: '1- ¿Será suficiente contra la oscuridad de las metalobetalactamasas (NDM/VIM)?',
        answers: [
          {
            id: 1,
            img: 'assets/images/no.jpg',
            label: 'No',
            correct: true,
            height: false,
          },
          {
            id: 2,
            img: 'assets/images/si.jpg',
            label: 'Si',
            correct: false,
            height: false,
          },
        ],
        points: 30,
        timeLeft: 120,
        feedback: `El elixir no bastó… y pronto notasteis algo más:<br>
                    <strong>piernas hinchadas, orina escasa, espuma en la vasija.</strong><br>
                    Los riñones del joven estaban rendidos.<br><br>
                    El aprendiz del curandero ofrece su ayuda...`,
      },
      {
        type: 'single-select',
        description:
          'Existe un viejo polvo, la colistina, que puede tornarse en vapores y ser llevado directo a sus pulmones. No os asustéis por su fama: si va por el aire, no daña los riñones…',
        question: '2- ¿Acaso me equivoco?',
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
        feedback: `El joven respiraba mejor, y la colistina no tocó sus riñones.<br>
                  Pero la batalla no ha terminado. El sanador del castillo os advierte:<br>
                  “Si queréis mantener el brebaje constante en la sangre… debéis dar el primer golpe con fuerza.”<br>
                  “Los elixires de infusión continua no surten efecto sin una dosis inicial.”`,
      },
      {
        type: 'single-select',
        question:
          '3- Para que los betalactámicos o vancomicina actúen desde el inicio en una infusión continua, es necesario…',
        answers: [
          {
            id: 1,
            text: '…administrarlo lentamente sin pausa.',
            correct: false,
          },
          {
            id: 2,
            text: '…iniciar con una dosis de carga en bolo.',
            correct: true,
          },
          {
            id: 3,
            text: '…mezclarlo con otra pócima antibiótica.',
            correct: false,
          },
          {
            id: 4,
            text: '…mantenerlo frío durante toda la infusión.',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
        feedback: `El infusor cuelga del costado del peregrino. La pócima fluye sin descanso.<br>
                    Pero el anciano sanador frunce el ceño y os mira con gravedad:<br>
                    “Un solo descuido... y el elixir puede perder su fuerza.”<br>
                    “¿Habéis enseñado al paciente cómo cuidar su frasco de vida?”`,
      },
      {
        type: 'text',
        question:
          '4- ¿Es importante la educación sanitaria para mantener estable un antimicrobiano en bomba o infusor?',
        answers: [
          {
            id: 1,
            text: 'si',
            correct: true,
          },
        ],
        points: 30,
        timeLeft: 120,
        feedback: `El infusor fluye sin falla, pero no siempre será un sanador quien lo administre.<br><br>
                    Un joven cuidador pregunta:<br>
                    “¿Y si lo hacemos nosotros? ¿No basta con tener cuidado?”`,
      },
      {
        type: 'single-select',
        question:
          '5- ¿Existe alguna diferencia en cuanto a complicaciones o reingresos si la administración se realiza por paciente/familiares versus personal sanitario?',
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
        feedback: `El campesino mejoraba.<br>
                  La fiebre cedía, los mocos perdían su hedor, y el aliento volvía.<br>
                  Pero un sanador, curioso, hojeó los textos...<br>
                  En los márgenes halló una advertencia:<br>
                  “Hasta el mejor elixir puede fallar… si el mal no se arranca de raíz.”`,
      },
      {
        type: 'single-select',
        question:
          '6- ¿Cuál de estas afirmaciones es cierta según los códices actuales en la lucha contra bacilos gramnegativos multirresistentes?',
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
      },
    ],
    viewResults: {
      award: 'assets/images/3.webp',
      title: 'Sabía fue vuestra elección',
      description: `Los elixires son poderosos, sí… pero sin limpiar el foco, la peste siempre vuelve.
                    Y hasta el mejor conjuro ya ha sido burlado por las sombras.”<br>
                    <strong>“El camino continúa. Es hora de unir las pistas… y hallar al curandero.”</strong>`,
      buttonText: 'Obtener pista',
    },
    dashboard: {},
  },
}
