/* eslint-disable import/no-named-as-default-member */
import { match } from 'ts-pattern'
import { always, head } from 'ramda'
import { State, Control, Command, Status } from './types'

import * as config from './commands/config'

export const control = (state: State, partial: string[], player?: number): Control => {
  const completion = match(head(partial))
    .with(undefined, () => {
      if (state.status === Status.FINISHED) return []
      return [
        //
        ...config.complete([])(state),
      ]
    })
    .with(Command.CONFIG, () => config.complete(partial)(state))
    .otherwise(always([]))

  return {
    ...state.control,
    partial,
    completion,
  }
}
