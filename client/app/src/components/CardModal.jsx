import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import brace from 'brace';
import CardTag from './CardTag';

import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow_night';

import { bindActionCreators } from 'redux';
import { addTagToCardAction, updateCardAction } from '../actions/cardActions';

let input;
class CardModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="row modal-nav">
          <div className="col s10">
            <img className="activator modal-icon" src={this.props.icon} />
            <h5>{this.props.title}</h5>
          </div>
          <div className="col s2">
            <button className="waves-effect waves-light btn-flat close-modal" onClick={this.props.closeModal.bind(this)}>X</button>
          </div>
        </div>

        <div className="modal-editor">
          <AceEditor height="240px" width="100%" mode="javascript" theme="tomorrow_night"
          name="editor" editorProps={{$blockScrolling: true}} value={this.props.code || '// Your code here'} />
        </div>

        <div className="modal-notes input-field">
          <textarea className="notes" defaultValue={'// Edit your notes here. \n' + this.props.note} 
            onChange={this.props.remindSave.bind(this)}></textarea>
        </div>
        <div className="modal-footer">
          <div className="row">
            <div className="row save-bar">
              <div className="col s6">
                <a className="waves-effect waves-light btn modal-link" href={this.props.url}>View Original Resource</a>
              </div>
              <div className="col s6">
                <button className="waves-effect waves-light btn save-button" onClick={this.props.notifyCardUpdate.bind(this)}>Save Changes</button>
              </div>
            </div>

            <hr/>

            <div className="col s8 offset-s2">
              <form onSubmit={ (e) => {
                e.preventDefault();
                if ( !input.value.trim() ) {
                  return;
                }
                this.props.dispatch( addTagToCardAction(input.value, this.props.user_id, this.props.id) );
                input.value = '';
              }}>
                <div className="row">
                  <div className="col s6">
                    <button className="waves-effect waves-light btn add-tag-button">Add Tag</button>
                  </div>
                  <div className="col s6">
                    <input className="tag-input" type="text" placeholder="Add tag" ref={ node => {input = node}} />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="tags-div">
            {this.props.cardTags ? this.props.cardTags.map((cardTag) =>
              <CardTag key={cardTag.tag.id} name={cardTag.tag.name} tagId={cardTag.tag.id} cardTagId={cardTag.id} cardId={this.props.id}/>
            ) : <span></span>} <br/>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addTag: addTagToCardAction}, dispatch);
};
CardModal = connect(mapStateToProps, mapDispatchToProps)(CardModal);
export default CardModal;
