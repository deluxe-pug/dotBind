import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import brace from 'brace';
import CardTag from './CardTag';
import ShareModal from './ShareModal';
import './editor_languages';
import AceEditor from 'react-ace';

import 'brace/theme/tomorrow_night';
import { languages } from './language_object';
import AddTagForm from './AddTagForm';

import { bindActionCreators } from 'redux';
import {
  deleteMessageAction,
  saveMessageAction,
  fetchInboxAction,
} from '../actions/cardActions';

require('../styles/modal.css');

// let input;
let editorCode = '';
let note = '';

class MessageModal extends React.Component {
  constructor(props) {
    super(props);
    editorCode = this.props.code;
    note = this.props.note;
    this.state = {
      displayAddTagForm: false, 
      language: this.props.language,
    };
  }

  editorHasChanged(val) {
    editorCode = val;
  }

  noteHasChanged(event) {
    note = event.target.value;
  }

  saveNewCard(){
    let cardObject = {
      url: this.props.url,
      title: this.props.title,
      code: this.props.code,
      text: this.props.text,
      note: this.props.note,
      icon: this.props.icon,
      domain: this.props.domain,
      language: this.props.language,
    };
    let tags = [];
    this.props.cardTags.forEach( cardTag => tags.push(cardTag.tag.name) );
    this.props.saveMessage(cardObject, localStorage.getItem('githubUsername'), tags);
    this.props.deleteMessage(this.props.id);
    this.props.fetchInbox();
  }

  notifyDelete(){
    console.log('about to remove this message. card_id: ', this.props.id);
    this.props.deleteMessage(this.props.id);
    this.props.fetchInbox();
    Materialize.toast('Message Removed!', 2000, 'rounded notication');
    this.props.closeModal();
  }

  toggleAddTagForm() {
    this.setState({
      displayAddTagForm: !this.state.displayAddTagForm
    });
  }

  render() {
    return (
      <div>

        <div className="row modal-nav">
          <div className="col s8">
            <img className="activator modal-icon" src={this.props.icon} />
            <h5>{this.props.title}</h5>
          </div>

          <div className="close-modal">
            <a onClick={this.props.closeModal.bind(this)}>
              <i className="material-icons close-icon">close</i>
            </a>
          </div>

          <div className="language-menu">
            <select className="modal-select">
              <option value="" >Select Language: </option>
              {languages.map( lang => {
                return this.props.language === lang.value ?
                  <option selected value={lang.value}>{lang.name}</option> :
                  <option value={lang.value}>{lang.name}</option>
              })}
            </select>
          </div>

      </div>

        <div className="modal-editor">
          <AceEditor height="350px" width="100%"
            onFocus={this.props.remindSave.bind(this)}
            onChange={this.editorHasChanged} mode={this.state.language}
            theme="tomorrow_night" name="editor"
            editorProps={{$blockScrolling: true}}
            value={this.props.code || '// Your code here'} />
        </div>

        <div className="modal-notes input-field">
          <textarea className="notes"
            defaultValue={this.props.note || '// Edit your notes here. \n' + this.props.note }
            onChange={this.props.remindSave.bind(this), this.noteHasChanged}>
          </textarea>
          <span className="card-url">
            <a href={this.props.url}>
              {this.props.domain}
            </a>
          </span>
        </div>


        <div className="modal-footer">

          <div className="card-tags">

            { this.props.cardTags ? this.props.cardTags.map((cardTag) =>
              <div className="chip" key={cardTag.tag.id} >{cardTag.tag.name}</div>
            ) : <span></span> }

          </div>

          <div className="buttons-bar">

            <button className="btn save-button"
              onClick={this.saveNewCard.bind(this)}>
              Save to myCards
            </button>

            <button className="btn delete-button"
              onClick={this.notifyDelete.bind(this)}>
              <i className="material-icons">delete</i>
            </button>

          </div>

          <ShareModal cardId={this.props.id} />

        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    cardsState: state.cardsState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    deleteMessage: deleteMessageAction,
    saveMessage: saveMessageAction,
    fetchInbox: fetchInboxAction,
  }, dispatch);
};

MessageModal = connect(mapStateToProps, mapDispatchToProps)(MessageModal);
export default MessageModal;
