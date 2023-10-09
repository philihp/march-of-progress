import { PCGState } from 'fn-pcg/dist/types'

export enum Command {
  CONFIG = 'CONFIG',
  START = 'START',
}

export enum Scenario {
  THIRTY = 'THIRTY',
}

export type Config = {
  scenario: Scenario
}

export enum PlayerColor {
  ORANGE = 'O',
  BLUE = 'B',
}

export type StartParams = {
  seed?: number
}

export enum Status {
  SETUP = 'SETUP',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
}

export type ActionConfig = { command: Command.CONFIG; params: Config }
export type ActionStart = { command: Command.START; params: StartParams }
export type Action = ActionConfig | ActionStart

export type Control = {
  waitingForBlue: boolean
  waitingForOrange: boolean
  partial: string[]
  completion: string[]
}

export type State = {
  status: Status
  randGen?: PCGState
  config?: Config
  control: Control
}
export type StateReducer = (state: State | undefined) => State | undefined

export type CompleteReducer = (partial: string[]) => (state: State) => string[]
