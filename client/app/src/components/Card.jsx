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
    marginLeft: '150',
    marginRight: '150',
    marginTop: '55',
    marginBottom: '55',
    padding: '0px',
    border: 'none',
    backgroundColor: '#F0F0F0',
  }
};

let input;
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
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  notifyCardUpdate() {
    Materialize.toast('Changes saved!', 2000, 'rounded');
  }

  notifyAddTag() {
    Materialize.toast('Tag Added!', 2000, 'rounded');
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
            <h5>Notes:</h5>

            <div className="modal-notes">
              <p>{this.props.note}</p>
            </div>
            <div className="modal-footer">
              <button className="waves-effect waves-light btn" onClick={this.notifyCardUpdate.bind(this)}>Save Changes</button>
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
                Tags:
                {this.props.cardTags.map((cardTag) =>
                  <CardTag key={cardTag.tag.id} name={cardTag.tag.name}/>
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
