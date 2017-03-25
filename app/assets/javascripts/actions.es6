import AppDispatcher from 'app_dispatcher';
import Constants from 'constants';
import Api from 'api'

//Actions
class Actions {
  static addComment(params) {
    Api.post('/restaurants/1/comments', {
      comment: params
    }).then( resp => {
      return resp.json();
    }).then( comment => {
      AppDispatcher.dispatch({
        actionType: Constants.ADD_COMMENT,
        comment: comment
      })
    })
  }

  static setComments(params) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_COMMENTS,
      comments: params
    })
  }
}

export default Actions;
