import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
// import TagsContainer from '../containers/TagsContainer';
import CardTag from './CardTag';
import { addTag } from '../actions/tagActions';
import { bindActionCreators } from 'redux';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow_night';

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(38, 50, 56, 0.90)',
  },
  content : {
    borderRadius: '15px',
    marginLeft: '125',
    marginRight: '125',
    marginTop: '45',
    marginBottom: '0',
    padding: '0px',
    border: 'none',
    backgroundColor: '#F0F0F0',
  }
};

let input;
let sentSaveReminder = false;
class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.setState({modalIsOpen: false});
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = 'black';
    Materialize.toast('Click outside to exit', 2000, 'rounded notication');
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  notifyCardUpdate() {
    Materialize.toast('Changes saved!', 2000, 'rounded notication');
  }

  notifyAddTag() {
    Materialize.toast('Tag Added!', 2000, 'rounded notication');
  }

  remindSave(){
    if ( !sentSaveReminder ) {
      Materialize.toast('Remember to save your changes!', 5000, 'rounded notification');
      sentSaveReminder = true;
    }
  }

  render() {
    return (
      <div className="col s12 m4">
        <div className="card custom-card" >

          <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal.bind(this)}
            onRequestClose={this.closeModal.bind(this)} style={customStyles} >

            <div className="row modal-nav">
              <div className="col s10">
                <img className="activator modal-icon" src={this.props.icon} />
                <h5>{this.props.title}</h5>
              </div>
              <div className="col s2">
                <button className="waves-effect waves-light btn-flat close-modal" onClick={this.closeModal.bind(this)}>X</button>
              </div>
            </div>
            <div className="modal-editor">
              <AceEditor height="240px" width="100%" mode="javascript" theme="tomorrow_night"
              name="editor" editorProps={{$blockScrolling: true}} value={this.props.code} />
            </div>
            <h5 className="modal-heading">Notes:</h5>

            <div className="modal-notes input-field">
              <textarea className="notes" defaultValue={this.props.note} onChange={this.remindSave.bind(this)}></textarea>
            </div>
            <hr/>

            <div className="modal-footer">

              <div className="row">
                <div className="col s8 offset-s2">
                  <div className="col s6">
                    <input className="tag-input" type="text" placeholder="Add tag" />
                  </div>
                  <div className="col s6">
                    <button className="waves-effect waves-light btn">Add Tag</button>
                  </div>
                </div>
              </div>
              {this.props.cardTags ? this.props.cardTags.map((cardTag) =>
                  <CardTag key={cardTag.tag.id} name={cardTag.tag.name} id={cardTag.tag.id} cardId={this.props.id}/>
              ) : <span></span>} <br/>
              <div className="row save-bar">
                <div className="col s6">
                  <a className="waves-effect waves-light btn modal-link" href={this.props.url}>View Original Resource</a>
                </div>
                <div className="col s6">
                  <button className="waves-effect waves-light btn save-button" onClick={this.notifyCardUpdate.bind(this)}>Save Changes</button>
                </div>
              </div>

            </div>
          </Modal>

          <div className='card-header'>
            <span className="card-title activator grey-text text-darken-4 title">{this.props.title.substring(0,25)}...</span>
            <img className="activator card-icon" src={this.props.icon} />
          </div>
          <li className="divider"></li>

          <div className="card-preview open-modal" onClick={this.openModal.bind(this)}>
            <pre>
              <code>
                {this.props.text}...
              </code>
            </pre>
          </div>

          <div className="card-button">
          </div>

          <li className="divider"></li>
          <div className='card-footer'>
            <div><a className="card-url" href={this.props.url}>{this.props.url.length > 30 ? this.props.url.substring(0,30) + '...' : this.props.url}</a></div>
            <div className="card-tag">
                <span>Tags:</span>
                {this.props.cardTags.map((cardTag) =>
                  ' ' + cardTag.tag.name + ' ' + '| '
                )}
                <a><i className="material-icons small-icon">mode_edit</i></a>
            </div>
          </div>

        </div>
      </div>

    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addTag: addTag}, dispatch);
}
Card = connect(mapDispatchToProps)(Card);

export default Card;

// <form onSubmit={ (e) => {
//   if ( !input.value.trim() ) {
//     return;
//   }
//   this.props.dispatch( addTag(input.value) );
//   this.notifyAddTag();
//   input.value =''; }}>
//   <div className="col s6 add-tag-button">
//     <button type="submit" className="waves-effect waves-light btn">Add Tag</button>
//   </div>
//   <div className="col s6">
//     <input type='text' placeholder="Tag" ref={ node => { input = node; }}/>
//   </div>
// </form>
