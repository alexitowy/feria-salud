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
            correct: false,
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
    ],
  },
}
