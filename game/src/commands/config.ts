import { assoc, complement, propEq } from 'ramda'
import { CompleteReducer, Config, StateReducer, Status } from '../types'

export const execute =
  (params: Config): StateReducer =>
  (state) => {
    if (state === undefined) return undefined
    if (complement(propEq(Status.SETUP, 'status'))(state)) return undefined
    return assoc<Config, 'config'>('config', params)(state)
  }

export const complete: CompleteReducer = (partial) => (state) => []

export default undefined
