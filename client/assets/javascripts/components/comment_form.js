import React from 'react';

class CommentForm extends React.Component {

  static get contextTypes() {
    return {
      actions: React.PropTypes.object.isRequired
    }
  }

  static get propTypes() {
    return {
      isReplying: React.PropTypes.bool,
      onCommentSubmitted: React.PropTypes.func,
      parent_id: React.PropTypes.number
    }
  }

  constructor(props) {
    super();
    this.defaultState = {body: '', author: ''};
    this.state = this.defaultState;
  }

  submitComment(event) {
    event.preventDefault();
    this.context.actions.addComment(_.merge(this.state, { parent_id: this.props.parent_id })) ;
    this.setState(this.defaultState);
    if (this.props.onCommentSubtitted){
      this.props.onCommentSubtitted();
    }
  }

  onFieldChange(event) {
    let prop = {};
    prop[event.target.name] = event.target.value; // {author: event.target.value}
    this.setState(prop);
  }

  render() {
    return <div className={this.props.isReplying ? '' : 'hide'}>
        <form>
          <label>Author</label>
          <input type="text" name="author" onChange={this.onFieldChange.bind(this)} value={this.state.author} />
          <label> Comment </label>
          <textarea name="body" value={this.state.body} onChange={this.onFieldChange.bind(this)} />
          <button className="success button" onClick={this.submitComment.bind(this)} type="submit">Submit</button>
        </form>
      </div>
  }
}

export default CommentForm;
