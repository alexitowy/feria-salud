export interface StageData {
  name: string
  background?: string
  image?: string
  description?: string
  riddle?: string
  answer?: string
  questions?: any[]
  award?: string
  viewResults?: any
  antibioticChallenge?: any
  dashboard: {
    audio?: string
    video?: string
  }
}
