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
import 'brace/theme/monokai';

let snippetId = 0;
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
    // border: '2px #ffa726 solid',
    borderRadius: '50px',
    marginLeft: '150',
    marginRight: '150',
    marginTop: '60',
    marginBottom: '60',
    backgroundColor: '#fff59d',
    backgroundImage: "url('http://www.peerphinder.com/Pictures/notepadpaper.png')"
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
              <div className="col s2">
                <button className="waves-effect waves-light btn-flat close-modal" onClick={this.closeModal.bind(this)}>X</button>
              </div>
              <div className="col s10 input-field">
                <form onSubmit={ (e) => {
                  if ( !input.value.trim() ) {
                    return;
                  }
                  this.props.dispatch( addTag(input.value) );
                  this.notifyAddTag();
                  input.value =''; }}>
                  <div className="col s6 add-tag-button">
                    <button type="submit" className="waves-effect waves-light btn">Add Tag</button>
                  </div>
                  <div className="col s6">
                    <input type='text' placeholder="Tag" ref={ node => { input = node; }}/>
                  </div>
                </form>
              </div>
            </div>
            <h5>Code Snippet:</h5>
            <div className="modal-editor">
              <AceEditor height="240px" width="100%" mode="javascript" theme="monokai"
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

          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{this.props.title}</span>
            <img className="activator card-img" src={this.props.icon} />
            <p className="card-snippet">
              {this.props.text}...
            </p>
            <p><a href={this.props.url}>{this.props.url}</a></p>
          </div>

          <div className="card-action">
            <div className="card-buttons">
              <button className="waves-effect waves-light btn open-modal" onClick={this.openModal.bind(this)}>
                <i className="material-icons large">info_outline</i>
              </button>
              <button className="waves-effect waves-light btn add-tag">
                <i className="material-icons">label_outline</i>
              </button>
            </div>
            <ul>
              <li>

                {this.props.cardTags.map((cardTag) =>
                  <CardTag key={cardTag.tag.id} name={cardTag.tag.name}/>
                )}
              </li>
            </ul>
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

          // <div className="card-image waves-effect waves-block waves-light">
          //   <img className="activator" src={this.props.icon}></img>
          // </div>

// {this.props.snippets.map( (snippet) =>
//   <span className="block-span" key={snippedId++}>{snippet.content.substring(0,125)}...</span>
// )}
