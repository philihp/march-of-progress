import { always, pipe, when } from 'ramda'
import { createPcg32, randomInt } from 'fn-pcg'
import { CompleteReducer, PlayerColor, Scenario, Start, State, StateReducer, Status } from '../types'
import { start as thirtyStart } from '../board/scenario/thirty'

// we could get more entropy with a second seed, but
// honestly this is fine for now.
const PCG_PERIOD = 42069

// this is a brute-forced seed given the above, which
// results in a noop shuffle for 2, 3, 4, or even 5 elements
const MAGIC_SEED = 2692

const preventNonSetupStart: StateReducer = (state) =>
  // TODO: this is vomit, but branch coverage checked
  when(({ status }: State) => status !== Status.SETUP, always(undefined))(state as State)

const randomizeStart =
  (seed: number): StateReducer =>
  (state) => {
    const randInit = createPcg32({}, seed, PCG_PERIOD)
    const [randInt, randGen] = randomInt(0, 2, randInit)
    return {
      ...(state as State),
      status: Status.PLAYING,
      randGen,
      initiative: randInt % 2 === 0 ? PlayerColor.BLUE : PlayerColor.ORANGE,
    }
  }

// TODO: this should be dependency injected somehow, since
// we go up into a different directory, but I'll let it go for
// now and let the whole thing grow into a mess before refactoring
const scenarios: Record<Scenario, StateReducer> = {
  [Scenario.THIRTY]: thirtyStart,
}

const scenarioStart: StateReducer = (state) => {
  if (state?.config?.scenario === undefined) return undefined
  return scenarios[state!.config.scenario](state as State)
}

export const execute = ({ seed }: Start): StateReducer =>
  pipe(
    //
    preventNonSetupStart,
    randomizeStart(seed ?? MAGIC_SEED),
    scenarioStart
  )

export const complete: CompleteReducer = (partial) => (state) => {
  if (state.status !== Status.SETUP) return []
  return ['']
}

export default undefined
