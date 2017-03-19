import Comment from 'components/comment';

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
    return <div>
        {/* JSON.parse(this.props.comments).map(function(comment){
            return <Comment key={comment.id} {... comment} />;
          })
        */}

        { this.props.store.comments().map((comment) => {
            return <Comment key={comment.id} {... comment} />;
          })
        }
      </div>
  }

  _onChange() {
    this.forceUpdate();
  }
}

export default CommentList;
