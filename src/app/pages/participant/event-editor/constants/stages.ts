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
      },
      {
        type: 'multiple-select',
        question:
          'Solo uno de estos merece el barro sagrado (trasplante fecal). Elige con sabiduría.',
        answers: [
          {
            id: 1,
            text: 'Dolor abdominal tras las comidas, sin mejora con dieta.',
            correct: true,
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
      {
        type: 'image',
        question:
          'Solo uno de estos merece el barro sagrado (trasplante fecal). Elige con sabiduría.',
        answers: [
          {
            id: 1,
            img: 'asstes/images/frutas.png',
            correct: false,
          },
          {
            id: 2,
            img: 'asstes/images/frutas.png',
            correct: true,
          },
          {
            id: 3,
            img: 'asstes/images/frutas.png',
            correct: false,
          },
          {
            id: 4,
            img: 'asstes/images/frutas.png',
            correct: false,
          },
        ],
        points: 30,
        timeLeft: 120,
      },
      {
        type: 'text',
        question:
          'Solo uno de estos merece el barro sagrado (trasplante fecal). Elige con sabiduría.',
        answers: 'respuesta',
        points: 30,
        timeLeft: 120,
      },
    ],
    award: 'assets/images/map.jpg',
  },
}
