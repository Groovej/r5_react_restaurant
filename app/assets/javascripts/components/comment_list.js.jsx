var CommentList = React.createClass({
  componentDidMount: function(){
    commentStore.addChangeListener(this._onChange);
  },

  componentWillMount: function(){
    commentStore.removeChangeListener(this._onChange);
  },

  render: function(){
    return (
      <div>
        {/* JSON.parse(this.props.comments).map(function(comment){
            return <Comment key={comment.id} {... comment} />;
          })
        */}

        { commentStore.comments().map(function(comment){
            return <Comment key={comment.id} {... comment} />;
          })
        }
      </div>
    );
  },

  _onChange: function(){
    this.forceUpdate();
  }
})
