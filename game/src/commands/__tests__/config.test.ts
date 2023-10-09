import { initialState } from '../../state'
import { Status, Scenario } from '../../types'
import { execute } from '../config'

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
  })
})
