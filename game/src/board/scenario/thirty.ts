import { Card, PlayerColor, State, StateReducer, Status } from '../../types'

export const start: StateReducer = (state) => {
  return {
    ...state,
    status: Status.PLAYING,
    frame: {
      waiting: {
        [PlayerColor.BLUE]: true,
        [PlayerColor.ORANGE]: true,
      },
    },
    control: {
      [PlayerColor.BLUE]: {
        partial: [],
        completion: [],
      },
      [PlayerColor.ORANGE]: {
        partial: [],
        completion: [],
      },
    },
    tableau: {
      [PlayerColor.BLUE]: {
        strength: 2,
        armies: [
          { color: PlayerColor.BLUE, fortified: false },
          { color: PlayerColor.BLUE, fortified: false },
        ],
        hand: [
          Card.MOVE1,
          Card.MOVE2,
          Card.RECRUIT,
          Card.FORTIFY,
          Card.ATTACK,
          Card.ATTACK1,
          Card.STRENGTH,
          Card.SCORE,
        ],
        discard: [],
        points: 0,
      },
      [PlayerColor.ORANGE]: {
        strength: 2,
        armies: [
          { color: PlayerColor.ORANGE, fortified: false },
          { color: PlayerColor.ORANGE, fortified: false },
        ],
        hand: [
          Card.MOVE1,
          Card.MOVE2,
          Card.RECRUIT,
          Card.FORTIFY,
          Card.ATTACK,
          Card.ATTACK1,
          Card.STRENGTH,
          Card.SCORE,
        ],
        discard: [],
        points: 0,
      },
    },
    territories: [
      {
        name: 'Orange',
        vpSpace: 3,
        armies: [],
      },
      {
        name: 'Neutral',
        vpSpace: 2,
        armies: [],
      },
      {
        name: 'Blue',
        vpSpace: 3,
        armies: [],
      },
    ],
  } as State
}
