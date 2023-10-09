import { initialState } from '../../state'
import { Status, Scenario } from '../../types'
import { complete, execute } from '../config'

describe('commands/execute', () => {
  describe('execute', () => {
    it('can run from setup', () => {
      const s1 = execute({ scenario: Scenario.THIRTY })({
        ...initialState,
        status: Status.SETUP,
      })!
      expect(s1.config?.scenario).toBe('THIRTY')
    })
    it('will not run if game started', () => {
      const s1 = execute({ scenario: Scenario.THIRTY })({
        ...initialState,
        status: Status.PLAYING,
      })!
      expect(s1).toBeUndefined()
    })
    it('will not run if state is undefined', () => {
      const s1 = execute({ scenario: Scenario.THIRTY })(undefined)!
      expect(s1).toBeUndefined()
    })
  })

  describe('complete', () => {
    it('returns nothing if not in SETUP status', () => {
      const c1 = complete([])({
        ...initialState,
        status: Status.PLAYING,
      })!
      expect(c1).toStrictEqual([])
    })
    it('returns list of scenarios if in SETUP status', () => {
      const c1 = complete([])({
        ...initialState,
        status: Status.SETUP,
      })!
      expect(c1).toStrictEqual(['THIRTY'])
    })
  })
})
