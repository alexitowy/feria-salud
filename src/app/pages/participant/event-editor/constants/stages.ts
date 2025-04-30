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
        reino interior. No son enfermedad, sino parte de ti. Dime, sabio viajero, ¿Cómo se llama
        este conjunto de seres microscópicos que residen e interactúan en tu cuerpo como aliados
        silenciosos?
      `,
    answer: 'microbiota',
  },
  2: {
    background: 'assets/images/fondo_enigma.png',
    image: 'assets/images/balanza.webp',
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
    background: 'assets/images/fondo_casos.png',
    image: 'assets/images/casos.png',
    description: `
        Un monje herido se acerca buscando ayuda. Debes analizar los casos clínicos y encontrar
        la causa común de sus dolencias para salvarlo.
      `,
    riddle: `
        Los síntomas apuntan a un desequilibrio en el reino invisible.
        ¿Cuál es la alteración que conecta los casos?
        (Respuesta: "disbiosis")
      `,
    answer: 'disbiosis',
  },
}
