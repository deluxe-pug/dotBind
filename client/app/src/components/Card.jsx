import React, { PropTypes } from 'react';
import Modal from 'react-modal';
// import TagsContainer from '../containers/TagsContainer';
import CardTag from './CardTag';

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
    this.refs.subtitle.style.color = 'black';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  render() {
    return (
      <div className="col s12 m4">

        <div className="card custom-card" >
          <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal.bind(this)}
            onRequestClose={this.closeModal.bind(this)} style={customStyles} >

            <button className="waves-effect waves-light btn close-modal" onClick={this.closeModal.bind(this)}>Close</button>
            <div className="modal-notes">
              <h4 ref="subtitle">Notes:</h4>
              <p>{this.props.note}</p>
            </div>
            <h5>Code Snippet</h5>
            <div id="editor" className="modal-editor">
              <AceEditor height="240px" width="100%" mode="javascript" theme="monokai"  name="UNIQUE_ID_OF_DIV" editorProps={{$blockScrolling: true}} />
            </div>
          </Modal>

          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">Card Title</span>
            <img className="activator card-img" src={this.props.icon} />
            <p className="card-snippet">
              {this.props.content}
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
              </li>
              <li>
                {this.props.cardTags.map((cardTag) => {
                  <CardTag key={cardTag.tag.id} {...cardTag.tag}/>
                })}
              </li>
            </ul>
          </div>

        </div>
      </div>

    );
  }
};

export default Card;

// {this.props.snippets.map( (snippet) =>
//   <span className="block-span" key={snippedId++}>{snippet.content.substring(0,125)}...</span>
// )}
