import React from 'react';
import Modal from 'react-modal';
import brace from 'brace';
import CardTag from './CardTag';

import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow_night';

const CardModal = (props) => (
  <div>

    <div className="row modal-nav">
      <div className="col s10">
        <img className="activator modal-icon" src={props.icon} />
        <h5>{props.title}</h5>
      </div>
      <div className="col s2">
        <button className="waves-effect waves-light btn-flat close-modal" onClick={props.closeModal.bind(this)}>X</button>
      </div>
    </div>

    <div className="modal-editor">
      <AceEditor height="240px" width="100%" mode="javascript" theme="tomorrow_night"
      name="editor" editorProps={{$blockScrolling: true}} value={props.code || '// Your code here'} />
    </div>

    <h5 className="modal-heading">Notes:</h5>
    <div className="modal-notes input-field">
      <textarea className="notes" defaultValue={props.note} onChange={props.remindSave.bind(this)}></textarea>
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
      {props.cardTags ? props.cardTags.map((cardTag) =>
          <CardTag key={cardTag.tag.id} name={cardTag.tag.name} tagId={cardTag.tag.id} cardTagId={cardTag.id} cardId={props.id}/>
      ) : <span></span>} <br/>
      <div className="row save-bar">
        <div className="col s6">
          <a className="waves-effect waves-light btn modal-link" href={props.url}>View Original Resource</a>
        </div>
        <div className="col s6">
          <button className="waves-effect waves-light btn save-button" onClick={props.notifyCardUpdate.bind(this)}>Save Changes</button>
        </div>
      </div>

    </div>
  </div>
);

export default CardModal;
