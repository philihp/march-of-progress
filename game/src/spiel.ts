import { join, map, pipe, reduce, reject, split } from 'ramda'
import { State } from './types'
import { reducer } from './reducer'
import { initialState } from './state'

export const spiel = pipe(
  join(''),
  split('\n'),
  map((s) => s.trim()),
  reject((s) => s === ''),
  map((s) => s.split(' ')),
  reduce((state: State | undefined, command: string[]) => reducer(state!, command), initialState)
)
