import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import brace from 'brace';
import CardTag from './CardTag';
import ShareModal from './ShareModal';
import './editor_languages';
import AceEditor from 'react-ace';

import 'brace/theme/tomorrow_night';

import { bindActionCreators } from 'redux';
import {
  addTagToCardAction,
  updateCardAction,
  deleteCardAction,
  saveCardFromInboxAction
} from '../actions/cardActions';

const languages = [
  {key:0, value: 'coffee', name: 'Coffee Script'},
  {key:1, value: 'csharp', name: 'C#'},
  {key:2, value: 'css', name: 'CSS'},
  {key:3, value: 'c_cpp', name: 'C++'},
  {key:4, value: 'elixir', name: 'Elixir'},
  {key:5, value: 'golang', name: 'Golang'},
  {key:6, value: 'handlebars', name: 'Handlebars'},
  {key:7, value: 'haskell', name: 'Haskell'},
  {key:8, value: 'html', name: 'HTML'},
  {key:9, value: 'lua', name: 'Lua'},
  {key:10, value: 'java', name: 'Java'},
  {key:11, value: 'json', name: 'JSON'},
  {key:12, value: 'javascript', name: 'JavaScript'},
  {key:13, value: 'markdown', name: 'Markdown'},
  {key:14, value: 'matlab', name: 'Matlab'},
  {key:15, value: 'mysql', name: 'MySQL'},
  {key:16, value: 'objectivec', name: 'Objective-C'},
  {key:17, value: 'php', name: 'PHP'},
  {key:18, value: 'python', name: 'Python'},
  {key:19, value: 'r', name: 'R'},
  {key:20, value: 'ruby', name: 'Ruby'},
  {key:21, value: 'rust', name: 'Rust'},
  {key:22, value: 'sass', name: 'Sass'},
  {key:23, value: 'scala', name: 'Scala'},
  {key:24, value: 'typescript', name: 'Typescript'},
  {key:25, value: 'xml', name: 'XML'}
];


let input;
let editorCode = '';
let note = '';
class CardModal extends React.Component {
  constructor(props) {
    super(props);
    editorCode = this.props.code;
    note = this.props.note;

    var stuff = [];
    for ( let i = 0; i < languages.length; i++ ) {
      stuff.push({key: i, value: languages[i]})
    }
    console.log(JSON.stringify(stuff));
  }

  componentWillMount(){
    // default language is JavaScript
    this.setState({language: 'javascript'});
  }

  editorHasChanged(val) {
    editorCode = val;
  }

  noteHasChanged(event) {
    note = event.target.value;
  }

  saveChanges() {
    let requestBody = {
      id: this.props.id,
      token: localStorage.getItem('dotBindAccessToken'),
      code: editorCode,
      note: note,
    };
    this.props.updateCard(requestBody);
    Materialize.toast('Changes saved!', 2000, 'rounded notication');
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
    };
    let tags = [];
    this.props.cardTags.forEach( cardTag => tags.push(cardTag.tag.name) );
    this.props.saveCard(cardObject, localStorage.getItem('githubUsername'), tags);
  }

  notifyDelete(){
    console.log(this.props.id);
    this.props.deleteCard(this.props.id);
    Materialize.toast('Card deleted!', 2000, 'rounded notication');
    this.props.closeModal();
  }

  render() {
    return (
      <div>
        <div className="row modal-nav">
          <div className="col s10">
            <img className="activator modal-icon" src={this.props.icon} />
            <h5>{this.props.title}</h5>
            <div className="input-field">
              <select className="modal-select col s4">
                <option value=""  >Select a language: </option>
                {languages.map( lang => {
                  return <option value={lang.value}>{lang.name}</option>
                })}
              </select>
            </div>
          </div>
          <div className="col s2">
            <button className="waves-effect waves-light btn-flat close-modal" onClick={this.props.closeModal.bind(this)}>X</button>

          </div>
        </div>

        <div className="modal-editor">
          <AceEditor height="240px" width="100%"
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
        </div>
        <div className="modal-footer">
          <div className="row">
            <div className="row save-bar">
              <div className="col s8 offset-s4">
                <button className="waves-effect waves-light btn delete-button"
                  onClick={this.notifyDelete.bind(this)}>
                  <i className="material-icons">delete</i>
                </button>
                <button className="waves-effect waves-light btn save-button"
                  onClick={this.props.cardsState !== 'inbox' ?
                  this.saveChanges.bind(this) : this.saveNewCard.bind(this)}>
                  {this.props.cardsState === 'inbox' ? 'Save to my cards' : 'Save Changes'}
                </button>
              </div>
              <a className="modal-link" href={this.props.url}>
                {this.props.domain}
              </a>
            </div>

            <div className="col s8 offset-s2">
              { this.props.cardsState !== 'inbox' ?
                <form onSubmit={ (e) => {
                e.preventDefault();
                if ( !input.value.trim() ) {
                  return;
                }
                this.props.dispatch( addTagToCardAction(input.value.toLowerCase(), this.props.user_id, this.props.id) );
                input.value = '';
                }}>
                <div className="row">
                  <div className="col s6">
                    <button className="waves-effect waves-light btn add-tag-button">Add Tag</button>
                  </div>
                  <div className="col s4">
                    <input className="tag-input" type="text" placeholder="Add tag" ref={ node => {input = node}} />
                  </div>
                </div>
              </form> : null }
            </div>
          </div>
          <div className="tags-div">
            {this.props.cardTags ? this.props.cardTags.map((cardTag) =>
              <CardTag key={cardTag.tag.id} name={cardTag.tag.name} tagId={cardTag.tag.id} cardTagId={cardTag.id} cardId={this.props.id}/>
            ) : <span></span>} <br/>
          </div>

          <a className="waves-effect waves-light btn share-button" href="#popup1">
            Share This Card
          </a>

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
    addTag: addTagToCardAction,
    updateCard: updateCardAction,
    deleteCard: deleteCardAction,
    saveCard: saveCardFromInboxAction,
  }, dispatch);
};
CardModal = connect(mapStateToProps, mapDispatchToProps)(CardModal);
export default CardModal;
