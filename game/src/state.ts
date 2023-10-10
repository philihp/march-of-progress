import { PCGState } from 'fn-pcg/dist/types'
import { State, Status } from './types'

export const initialState: State = {
  randGen: {} as PCGState,
  status: Status.SETUP,
  frame: {
    waitingForBlue: false,
    waitingForOrange: false,
  },
  control: {
    partial: [],
    completion: [],
  },
  territories: [],
}
