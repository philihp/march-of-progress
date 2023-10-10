import { PlayerColor, StateReducer, Status } from '../../types'

export const start: StateReducer = (state) => {
  return {
    ...state,
    status: Status.PLAYING,
    frame: {
      waitingForBlue: true,
      waitingForOrange: true,
    },
    control: {
      partial: [],
      completion: [],
    },
    territories: [
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
    ],
  }
}
