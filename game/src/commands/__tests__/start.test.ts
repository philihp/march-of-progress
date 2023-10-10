import { count, map, pipe, range } from 'ramda'
import { initialState } from '../../state'
import { Status, Scenario, PlayerColor, State } from '../../types'
import { complete, execute } from '../start'

describe('commands/start', () => {
  const s0 = {
    ...initialState,
    config: {
      scenario: Scenario.THIRTY,
    },
  }

  describe('execute', () => {
    it('will start the game and shuffle player order', () => {
      const s1 = execute({ seed: undefined })(s0)!
      expect(s1.status).toBe(Status.PLAYING)
    })
    it('returns undefined if no scenario configured', () => {
      const s1 = execute({})({
        ...initialState,
      })!
      expect(s1).toBeUndefined()
    })

    it('will start the game with seed 42', () => {
      const s1 = execute({ seed: 42 })(s0)!
      expect(s1.status).toBe(Status.PLAYING)
      expect(s1.initiative).toBe(PlayerColor.ORANGE)
    })
    it('will start the game with seed 12345', () => {
      const s1 = execute({ seed: 12345 })(s0)!
      expect(s1.status).toBe(Status.PLAYING)
      expect(s1.initiative).toBe(PlayerColor.BLUE)
    })
    it('approximate distribution of seeds is around 50%', () => {
      // this uses the first 1000 integers as seeds, but always uses
      // zero through 1000, so it won't be a flaky test
      const RUNS = 1000
      const initiativeBlue = pipe(
        range(0),
        map((n) => execute({ seed: n })(s0)),
        count((s1) => s1?.initiative === PlayerColor.BLUE)
      )(RUNS)
      expect(initiativeBlue / RUNS).toBeCloseTo(0.5)
    })
    it('calls the THIRTY scenario start method', () => {
      const s1 = {
        ...s0,
        config: {
          scenario: Scenario.THIRTY,
        },
      }
      const s2 = execute({ seed: 42 })(s1)!
      expect(s2.territories).toStrictEqual([
        {
          name: 'Orange',
          owner: PlayerColor.ORANGE,
        },
        {
          name: 'Neutral',
        },
        {
          name: 'Blue',
          owner: PlayerColor.BLUE,
        },
      ])
    })
  })

  describe('complete', () => {
    it('offers empty string if all is good', () => {
      const partial = [] as string[]
      const s0: State = {
        ...initialState,
      }
      const c0 = complete(partial)(s0)
      expect(c0).toStrictEqual([''])
    })
    it('cannot send if status is not setup', () => {
      const partial = [] as string[]
      const s0: State = {
        ...initialState,
        status: Status.PLAYING,
      }
      const c0 = complete(partial)(s0)
      expect(c0).toStrictEqual([])
    })
  })
})
