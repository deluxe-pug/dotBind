import React, { PropTypes } from 'react';
import Modal from 'react-modal';
// import TagsContainer from '../containers/TagsContainer';
import CardTag from './CardTag';

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
    border: '2px #ffa726 solid',
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
        <div className="card custom-card" onClick={this.openModal.bind(this)}>

          <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal.bind(this)}
            onRequestClose={this.closeModal.bind(this)} style={customStyles} >

            <h3 ref="subtitle">Hello</h3>
            <button className="waves-effect waves-light btn close-modal" onClick={this.closeModal.bind(this)}>Close</button>

          </Modal>

          <div className="card-image waves-effect waves-block waves-light">
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">Card Title</span>

            <img className="activator card-image" src={this.props.icon} />

            <p className="card-snippet">
              {this.props.content}
            </p>

            <p><a href={this.props.url}>{this.props.url}</a></p>
          </div>

          <div className="card-action">
            <ul>
              <li>
                {this.props.cardTags.map((cardTag) => {
                  <CardTag key={cardTag.tag.id} {...cardTag.tag}/>
                })}
              </li>

              <li>
                <a className="add-tag modal-trigger" href="#modal1">
                  <i className=" material-icons left">label_outline</i>
                  add tag
                </a>
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
