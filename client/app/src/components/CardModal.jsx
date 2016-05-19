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
  // addTagToCardAction,
  updateCardAction,
  deleteCardAction,
  // saveCardFromInboxAction
} from '../actions/cardActions';

require('../styles/modal.css');

// let input;
let editorCode = '';
let note = '';

class CardModal extends React.Component {
  constructor(props) {
    super(props);
    editorCode = this.props.code;
    note = this.props.note;
    this.state = {
      displayAddTagForm: false, 
      language: this.props.language,
    };
  }

  // componentWillMount(){
  //   // default language is JavaScript
  //   this.setState({language: 'javascript'});
  // }

  editorHasChanged(val) {
    editorCode = val;
  }

  noteHasChanged(event) {
    note = event.target.value;
  }

  saveChanges() {
    console.log('this.state.language: ', this.state.language);
    let requestBody = {
      id: this.props.id,
      token: localStorage.getItem('dotBindAccessToken'),
      code: editorCode,
      note: note,
      language: this.state.language,
    };
    this.props.updateCard(requestBody);
    Materialize.toast('Changes saved!', 2000, 'rounded notication');
  }

  // saveNewCard(){
  //   let cardObject = {
  //     url: this.props.url,
  //     title: this.props.title,
  //     code: this.props.code,
  //     text: this.props.text,
  //     note: this.props.note,
  //     icon: this.props.icon,
  //     domain: this.props.domain,
  //   };
  //   let tags = [];
  //   this.props.cardTags.forEach( cardTag => tags.push(cardTag.tag.name) );
  //   this.props.saveCard(cardObject, localStorage.getItem('githubUsername'), tags);
  // }

  notifyDelete(){
    console.log(this.props.id);
    this.props.deleteCard(this.props.id);
    Materialize.toast('Card deleted!', 2000, 'rounded notication');
    this.props.closeModal();
  }

  selectLanguage(e){
    console.log('e.target.value: ', e.target.value);
    this.setState({language: e.target.value});
    console.log('this.state.language: ', this.state.language);
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
            <select className="modal-select" onChange={this.selectLanguage.bind(this)}>
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

            <span>
              <a onClick={() => this.toggleAddTagForm()}>
                <i className="material-icons add-tag-icon">mode_edit</i>
              </a>
              {this.state.displayAddTagForm ? 
                <AddTagForm 
                  id={this.props.id}
                  user_id={this.props.user_id} /> : null }
            </span>

            { this.props.cardTags ? this.props.cardTags.map((cardTag) =>
              <CardTag key={cardTag.tag.id} name={cardTag.tag.name} tagId={cardTag.tag.id} cardTagId={cardTag.id} cardId={this.props.id}/>
            ) : <span></span> }

          </div>

          <div className="buttons-bar">
            <button className="btn delete-button"
              onClick={this.notifyDelete.bind(this)}>
              <i className="material-icons">delete</i>
            </button>
          </div>


          <div className="buttons-bar">

            <button className="btn save-button"
              onClick={this.saveChanges.bind(this)}>
              Save
            </button>

            <a className="btn share-button" href="#popup1">
              Share
            </a>

          </div>

          <ShareModal cardId={this.props.id} />

        </div>
      </div>
    );
  }
};

// <button className="waves-effect waves-light btn add-tag-button">Add Tag</button>
// {this.props.cardsState === 'inbox' ? 'Save to my cards' : 'Save Changes'}

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    cardsState: state.cardsState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    // addTag: addTagToCardAction,
    updateCard: updateCardAction,
    deleteCard: deleteCardAction,
    // saveCard: saveCardFromInboxAction,
  }, dispatch);
};
CardModal = connect(mapStateToProps, mapDispatchToProps)(CardModal);
export default CardModal;
