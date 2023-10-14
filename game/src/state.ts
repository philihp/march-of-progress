import { PCGState } from 'fn-pcg/dist/types'
import { PlayerColor, State, Status } from './types'

export const initialState: State = {
  randGen: {} as PCGState,
  status: Status.SETUP,
  frame: {
    waiting: {
      [PlayerColor.BLUE]: false,
      [PlayerColor.ORANGE]: false,
    },
  },
  control: {
    [PlayerColor.BLUE]: {
      partial: [],
      completion: [],
    },
    [PlayerColor.ORANGE]: {
      partial: [],
      completion: [],
    },
  },
  territories: [],
  tableau: {
    [PlayerColor.BLUE]: {
      strength: 1,
      armies: [],
      points: 0,
      hand: [],
      discard: [],
    },
    [PlayerColor.ORANGE]: {
      strength: 1,
      armies: [],
      points: 0,
      hand: [],
      discard: [],
    },
  },
  points: 35,
}
