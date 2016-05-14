import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import CardTag from './CardTag';
import { addTag } from '../actions/tagActions';
import { bindActionCreators } from 'redux';
import CardModal from './CardModal';

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
    marginLeft: '75',
    marginRight: '75',
    marginTop: '40',
    marginBottom: '0',
    padding: '0px',
    border: 'none',
    backgroundColor: '#F0F0F0',
  }
};

let input;
let sentSaveReminder = false;
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
    Materialize.toast('Click outside to exit', 2000, 'rounded notication');
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  notifyCardUpdate() {
    Materialize.toast('Changes saved!', 2000, 'rounded notication');
  }

  notifyAddTag() {
    Materialize.toast('Tag Added!', 2000, 'rounded notication');
  }

  remindSave(){
    if ( !sentSaveReminder ) {
      Materialize.toast('Remember to save your changes!', 5000, 'rounded notification');
      sentSaveReminder = true;
    }
  }

  render() {
    // console.log('INSIDE CARD COMPONENT: ', this.props);
    return (
      <div className="col s12 m4">
        <div className="card custom-card" >

          <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal.bind(this)}
            onRequestClose={this.closeModal.bind(this)} style={customStyles} >
            <CardModal {...this.props} closeModal={this.closeModal} remindSave={this.remindSave}
              notifyCardUpdate={this.notifyCardUpdate} notifyAddTag={this.notifyAddTag} />
          </Modal>

          <div className='card-header'>
            <span className="card-title activator grey-text text-darken-4 title">{this.props.title.substring(0,25)}...</span>
            <img className="activator card-icon" src={this.props.icon} />
          </div>
          <li className="divider"></li>

          <div className="card-preview open-modal" onClick={this.openModal.bind(this)}>
            <pre>
              <code>
              </code>
            </pre>
          </div>

          <div className="card-button">
          </div>

          <li className="divider"></li>
          <div className='card-footer'>
            <div><a className="card-url" href={this.props.url}>{this.props.url.length > 30 ? this.props.url.substring(0,30) + '...' : this.props.url}</a></div>
            <div className="card-tag">
                <span>Tags:</span>
                {this.props.cardTags.map((cardTag) =>
                  ' ' + cardTag.tag.name + ' ' + '| '
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
