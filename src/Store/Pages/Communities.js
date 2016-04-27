import {fromJS} from 'immutable';

const Communities = (state = fromJS({
  Communities: {
    loaded: false,
    data: []
  },
  Community: {
    open: false,
    name: 'Select...'
  }
}), action)=>{
  switch (action.type) {
    case 'COMMUNITIES_INIT':
      return state.setIn(['Communities', 'data'], action.value)
                  .setIn(['Communities', 'loaded'], true);
    case 'COMMUNITIES_CHANGE_COMMUNITY':
      return state.setIn(['Community', 'name'], action.value);
    case 'COMMUNITIES_TOGGLE_SELECT':
      return state.updateIn(['Community', 'open'], (open)=>(!open));
    default:
      return state;
  }
};

export default Communities;
