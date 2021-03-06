import Comment from './comment';
import React from 'react';

class CommentList extends React.Component{

  static get contextTypes() {
    return {
      store: React.PropTypes.object.isRequired
    }
  }

  componentDidMount() {
    this.context.store.addChangeListener(this._onChange.bind(this));
  }

  componentWillMount() {
    this.context.store.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    return <ul>
        {/* JSON.parse(this.props.comments).map(function(comment){
            return <Comment key={comment.id} {... comment} />;
          })
        */}


        { this.context.store.comments(this.props.parent_id).map(function(comment,i ) {
            return <Comment key={i} {... comment} />;
          })
        }
      </ul>
  }

  _onChange() {
    this.forceUpdate();
  }
}

export default CommentList
