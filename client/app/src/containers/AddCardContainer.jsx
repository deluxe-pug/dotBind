import React from 'react';
import { connect } from 'react-redux';
import { addCardAction } from '../actions/actionTypes';

let AddCardContainer = ({dispatch}) => {
  let input;
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        console.log('input: ', input.value);
        if (!input.value.trim()) {
          return;
        }
        dispatch(addCardAction(input.value));
        input.value = '';
      }}>
        <input type='url' ref={node => {
          input = node;
        }}/>
        <button type='submit'>
          Add Card
        </button>
      </form>
    </div>
  )
};

AddCardContainer = connect()(AddCardContainer);

export default AddCardContainer;


// class AddCardContainer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputValue: ''
//     }
//   }

//   onInputChange(event) {
//     this.setState({
//       inputValue: event.target.value
//     });
//   } 

//   render() {
//     return (
//       <div>
//         <form onSubmit={e => {
//           e.preventDefault();
//           dispatch(addCardAction(this.state.inputValue));
//         }}>
//           <input 
//             placeholder='Type url here'
//             type='url'
//             value={this.state.inputValue} 
//             onChange={this.onInputChange.bind(this)} />
//           <button type='submit'>Add Card</button>
//         </form>
//       </div>
//     );
//   }
// };