import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDictById } from '../Dict/DictActions';
import { DICT_REDUCER } from '../Dict/DictReducer';
import DictPropTypes from '../Dict/DictPropTypes';
import List from '../../common/components/List/List';
import style from './edit.scss';

const { shape, object, func } = PropTypes;
class Edit extends Component {

  static propTypes = {
    match: shape({ params: object }).isRequired,
    getDictById: func.isRequired,
    data: shape(DictPropTypes)
  }

  static defaultProps = {
    data: []
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    const { data } = this.props;
    if (data && (data.id !== this.dictId)) {
      this.fetchData();
    }
  }

  get dictId() {
    const { match: { params: { dictId } } } = this.props;
    return +dictId;
  }

  onListItemActionHandler = itemVo => {
    console.log(itemVo);
  }

  fetchData() {
    const { getDictById } = this.props;
    getDictById(this.dictId);
  }

  renderTable = () => {
    const { data: { name, items } } = this.props;
    if (!name && !items) return null;
    return (
      <table className={style.dict}>
        <thead><tr><th>{name}</th></tr></thead>
        <tbody><tr><td><List items={items} onItemAction={this.onListItemActionHandler} /></td></tr></tbody>
      </table>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <div className={style.edit}>
        <section>
          {!data ? 'Fetching dict...' : this.renderTable()}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state[DICT_REDUCER].data
});

const mapDispatchToProps = dispatch => ({
  getDictById: (dictId) => dispatch(getDictById(dictId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
