import { ActionConst } from 'react-native-router-flux';

const initialState = {
  scene: {},
  previousScene: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene,
        previousScene: action.previousScene
      };
    default:
      return state;
  }
};
