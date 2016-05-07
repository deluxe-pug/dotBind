import React, { PropTypes } from 'react';
import Modal from 'react-modal';

let snippedId = 0;
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
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
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  render() {
    return (
      <div className="col s12 m4">
        <div className="card custom-card" onClick={this.openModal.bind(this)}>
        <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles} >

        <h2 ref="subtitle">Hello</h2>
        <button onClick={this.closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={this.props.icon}></img>
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">Card Title</span>
              <p className="card-snippet">
                {this.props.snippets.map( (snippet) =>
                  <span className="block-span" key={snippedId++}>{snippet.content.substring(0,125)}...</span>
                )}
              </p>
            <p><a href={this.props.url}>{this.props.url}</a></p>
          </div>
          <div className="card-action">
            <a className="add-tag modal-trigger" href="#modal1">
            <i className=" material-icons left">label_outline</i>
            add tag
            </a>
          </div>
        </div>
      </div>

    );
  }
};

export default Card;
