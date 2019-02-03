import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './home.scss';
import { APP_REDUCER } from '../../app/AppReducer';
import List from '../../common/components/List/List';
import ListItemPropTypes from '../../common/components/List/ListItem/ListItemPropTypes';
import ListItem from '../../common/components/List/ListItem/ListItem';
import Dict from '../Dict/Dict';

const { arrayOf, shape } = PropTypes;
class Home extends PureComponent {

  static propTypes = {
    data: arrayOf(shape(ListItemPropTypes))
  }

  static defaultProps = {
    data: null
  }

  renderDicts = () => {
    const { data } = this.props;
    return data.map(dict => {
      const { id, ...rest } = dict;
      return <Dict key={id} id={id} {...rest} />;
    });
  }

  render() {
    const { data } = this.props;
    if (!data) return null;
    return (
      <main className={style.home}>
        <section>
          <table className={style.dictList}>
            <thead><tr><th>Dictionaries:</th></tr></thead>
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
  dictEdit: () => dispatch()
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
