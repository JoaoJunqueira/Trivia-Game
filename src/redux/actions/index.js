export const ADD_PLAYER_INFO = 'ADD_PLAYER_INFO';

export const addPlayerInfoAction = (name, email) => ({
  type: ADD_PLAYER_INFO,
  payload: {
    name,
    email,
  },
});
