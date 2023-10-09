import { PCGState } from 'fn-pcg/dist/types'
import { State, Status } from './types'

export const initialState: State = {
  randGen: {} as PCGState,
  status: Status.SETUP,
  control: {
    waitingForBlue: false,
    waitingForOrange: false,
    partial: [],
    completion: [],
  },
}
