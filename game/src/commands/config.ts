import { assoc } from 'ramda'
import { CompleteReducer, Config, StateReducer } from '../types'

export const execute = (params: Config): StateReducer => assoc<Config, 'config'>('config', params)

export const complete: CompleteReducer = (partial) => (state) => []

export default undefined
