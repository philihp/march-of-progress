import { match, P } from 'ts-pattern'
import { State, Command, Config } from './types'
import { execute as config } from './commands/config'

export const reducer = (state: State, [command, ...params]: string[]): State | undefined => {
  return match<[string, string[]], State | undefined>([command, params])
    .with([Command.CONFIG, [P.select('scenario')]], (params) => config(params as Config)(state))
    .otherwise((command) => undefined)
}
