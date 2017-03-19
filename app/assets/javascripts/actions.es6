import AppDispatcher from 'app_dispatcher';
import Constants from 'constants';

//Actions
class Actions {
  static addComment(params) {
    AppDispatcher.dispatch({
      actionType: Constants.ADD_COMMENT,
      comment: params
    })
  }
}

export default Actions;
