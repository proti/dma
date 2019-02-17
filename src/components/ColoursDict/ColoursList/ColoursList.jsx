import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getColours, saveColours } from '../redux/ColoursDictActions';
import style from './coloursList.scss';
import withDictionaryList from '../../../common/components/Dictionary/DictionaryList/DictionaryList';
import List from '../../../common/components/List/List';
import { COLOURS_DICT_REDUCER } from '../redux/ColoursDictReducer';
import { HOME } from '../../../common/Routes';

const { shape, func } = PropTypes;
class ColoursList extends Component {
  static propTypes = {
    history: shape({}),
    getColours: func.isRequired,
    saveColours: func.isRequired
  };
  static defaultProps = {
    history: {}
  };

  componentDidMount() {
    const { getColours } = this.props;
    getColours();
  }

  onItemRemove = async () => {
    const { saveColours } = this.props;
    const { items } = this.state;
    await saveColours(items);
  };

  onItemClick = itemId => {
    const { history } = this.props;
    //history.push(DETAILS + '/' + dictId);
  };

  render() {
    return <List label="Colours:">{this.renderItems()}</List>;
  }
}
const mapStateToProps = state => ({
  data: state[COLOURS_DICT_REDUCER].data,
  error: state[COLOURS_DICT_REDUCER].error
});
const mapDispatchToProps = dispatch => ({
  saveColours: colours => dispatch(saveColours(colours)),
  getColours: () => dispatch(getColours())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDictionaryList(ColoursList));
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import EditableItem from '../../../common/components/EditableItem/EditableItem';
// import { COLOURS_DICT_REDUCER } from '../ColoursDictReducer';
// import { getColours, saveColours } from '../ColoursDictActions';
// import style from './coloursList.scss';
// import { COLOURS_DOMAINS } from '../../../common/Routes';
// import LabelButton from '../../../common/components/LabelButton/LabelButton';
// import List from '../../../common/components/List/List';
// import ListItem from '../../../common/components/List/ListItem/ListItem';

// const { arrayOf, shape, number, string, func } = PropTypes;
// class ColoursList extends Component {
//   state = { colours: [] };

//   static propTypes = {
//     data: arrayOf(shape({ id: number, value: string })),
//     getColours: func.isRequired
//     // saveColours: func.isRequired
//   };

//   static defaultProps = {
//     data: null
//   };

//   componentDidMount() {
//     const { getColours } = this.props;
//     getColours();
//   }

//   componentDidUpdate(prevProps) {
//     const { data } = this.props;
//     if (data && prevProps.data !== data) {
//       this.update(data);
//     }
//   }

//   update = colours => {
//     const sortedColours = colours.sort((a, b) => a.id - b.id);
//     this.setState({ colours: sortedColours });
//   };

//   onColourRemoveHandler = id => {
//     const { colours } = this.state;
//     const newColours = colours.filter(colour => colour.id !== +id);
//     this.update([...newColours]);
//   };

//   onColourClickHandler = dictId => {
//     const { history } = this.props;
//     //history.push(DETAILS + '/' + dictId);
//   };

//   renderItems = () => {
//     const { colours } = this.state;
//     return colours.map(item => {
//       const { id, value } = item;
//       return (
//         <ListItem
//           key={id}
//           id={id}
//           onRemove={this.onColourRemoveHandler}
//           onClick={this.onColourClickHandler}
//         >
//           {value}
//         </ListItem>
//       );
//     });
//   };

//   render() {
//     const { colours } = this.state;

//     if (!colours) return 'Fetching colours...';
//     return <List label="Colours:">{this.renderItems()}</List>;
//   }
//   // componentDidMount() {
//   //   const { getColours } = this.props;
//   //   getColours();
//   // }

//   // componentDidUpdate(prevProps) {
//   //   const { data } = this.props;
//   //   if (data && prevProps.data !== data) {
//   //     this.update(data);
//   //   }
//   // }

//   // update = colours => {
//   //   const sortedColours = colours.sort((a, b) => a.id - b.id);
//   //   this.setState({ colours: sortedColours });
//   // };

//   // itemChangeHandler = vo => {
//   //   const { colours } = this.state;
//   //   const idToNum = +vo.id;
//   //   let currentColour = colours.find(colour => colour.id === idToNum);
//   //   const restColours = colours.filter(colour => colour.id !== idToNum);
//   //   if (!currentColour) {
//   //     currentColour = { id: idToNum };
//   //   }
//   //   currentColour = { ...currentColour, value: vo.value };
//   //   this.update([...restColours, currentColour]);
//   // };

//   // onAddNewColourHandler = () => {
//   //   this.setState(prevState => {
//   //     const colours = prevState.colours;
//   //     const id = colours.length ? colours[colours.length - 1].id + 1 : 0;
//   //     const newColour = { id, value: '' };
//   //     return { colours: [...colours, newColour] };
//   //   });
//   // };

//   // onRemoveColourHandler = id => {
//   //   const { colours } = this.state;
//   //   const newColours = colours.filter(colour => colour.id !== +id);
//   //   this.update([...newColours]);
//   // };

//   // renderColours = () => {
//   //   const { colours } = this.state;

//   //   if (!colours) return 'Fetching colours...';
//   //   return colours.map(colour => {
//   //     const id = colour.id + '';
//   //     const value = colour.value;
//   //     return (
//   //       <tr key={id}>
//   //         <td>
//   //           <EditableItem id={id} defaultValue={value} onChange={this.itemChangeHandler} />
//   //         </td>
//   //         <td>
//   //           <LabelButton id={id} onClick={this.onRemoveColourHandler}>
//   //             Remove
//   //           </LabelButton>
//   //         </td>
//   //       </tr>
//   //     );
//   //   });
//   // };

//   // onSaveHandler = async () => {
//   //   const { colours } = this.state;
//   //   const { saveColours, getColours } = this.props;
//   //   await saveColours(colours);
//   //   getColours();
//   // };

//   // render() {
//   //   return (
//   //     <div className={style.colours}>
//   //       <form noValidate>
//   //         <fieldset>
//   //           <div>
//   //             <span>Colours:</span>
//   //             <Link to={COLOURS_DOMAINS}>Domains</Link>
//   //           </div>
//   //         </fieldset>
//   //         <fieldset>
//   //           <table>
//   //             <thead>
//   //               <tr>
//   //                 <th>Name:</th>
//   //               </tr>
//   //             </thead>
//   //             <tbody>{this.renderColours()}</tbody>
//   //           </table>
//   //         </fieldset>
//   //         <LabelButton onClick={this.onAddNewColourHandler}>Add colour</LabelButton>
//   //         <LabelButton onClick={this.onSaveHandler}>Save changes</LabelButton>
//   //       </form>
//   //     </div>
//   //   );
//   // }
// }
// const mapStateToProps = state => ({
//   error: state[COLOURS_DICT_REDUCER].error,
//   data: state[COLOURS_DICT_REDUCER].data
// });

// const mapDispatchToProps = dispatch => ({
//   getColours: () => dispatch(getColours())
//   // saveColours: colours => dispatch(saveColours(colours))
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ColoursList);
