import { PCGState } from 'fn-pcg/dist/types'

export enum Command {
  CONFIG = 'config',
  START = 'start',
}

export enum Scenario {
  THIRTY = 'thirty',
}

export type Config = {
  scenario: Scenario
}

export type Start = {
  seed?: number
}

export enum PlayerColor {
  ORANGE = 'orange',
  BLUE = 'blue',
}

export type StartParams = {
  seed?: number
}

export enum Status {
  SETUP = 'setup',
  PLAYING = 'playing',
  FINISHED = 'finished',
}

export type ActionConfig = { command: Command.CONFIG; params: Config }
export type ActionStart = { command: Command.START; params: StartParams }
export type Action = ActionConfig | ActionStart

// These are things focused on relaying to the player's interface, and will not
// be visible to other players.
export type Control = {
  partial: string[]
  completion: string[]
}

// These are things relayed to the player that show the current UI state of what
// is to happen.
export type Frame = {
  waitingForBlue: boolean
  waitingForOrange: boolean
}

export type Territory = {
  name: string
  owner?: PlayerColor
}

export type State = {
  status: Status
  randGen?: PCGState
  config?: Config
  control: Control
  frame: Frame
  initiative?: PlayerColor
  territories: Territory[]
}
export type StateReducer = (state: State | undefined) => State | undefined

export type CompleteReducer = (partial: string[]) => (state: State) => string[]
