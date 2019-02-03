import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './home.scss';
import { APP_REDUCER } from '../../app/AppReducer';
import Dict from '../Dict/Dict';
import fetchDataset from '../../app/AppActions';
import { EDIT, HOME, ADD_DICT } from '../../common/Routes';

const { arrayOf, shape, number, string } = PropTypes;
class Home extends PureComponent {
  static propTypes = {
    data: arrayOf(shape({ id: number, name: string })),
    history: shape({})
  }

  static defaultProps = {
    data: null,
    history: {}
  }


  onDictRemoveHandler = async dictId => {
    const { fetchDataset } = this.props;
    await fetchDataset();
    this.goTo(HOME);
  }

  onDictClickHandler = dictId => {
    this.goTo(EDIT + '/' + dictId);
  }

  onNewDictClickHandler = () => {
    this.goTo(ADD_DICT);
  }

  goTo(url) {
    const { history } = this.props;
    history.push(url);
  }

  renderDicts = () => {
    const { data } = this.props;
    return data.map(dict => {
      const { id, ...rest } = dict;
      return <Dict key={id} id={id} {...rest} onRemove={this.onDictRemoveHandler} onClick={this.onDictClickHandler} />;
    });
  }

  render() {
    const { data } = this.props;

    if (!data) return null;
    return (
      <main className={style.home}>
        <section>
          <table className={style.dictList}>
            <thead>
              <tr>
                <th>Dictionaries:</th>
                <th><button type="button" onClick={this.onNewDictClickHandler}>New dictionary</button></th>
              </tr>
            </thead>
            <tbody>{this.renderDicts()}</tbody>
          </table>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  data: state[APP_REDUCER].data
});

const mapDispatchToProps = dispatch => ({
  fetchDataset: () => dispatch(fetchDataset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
