import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ListItem from '../../List/ListItem/ListItem';

const withDictionaryList = WrappedComponent => {
  const { arrayOf, shape, number, string } = PropTypes;

  class DictionaryList extends WrappedComponent {
    static displayName = `withDictionaryList(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    static propTypes = {
      data: arrayOf(shape({ id: number, name: string }))
    };

    static defaultProps = {
      data: null
    };

    constructor(props) {
      super(props);
      return this;
    }
    state = { items: [] };

    componentDidUpdate(prevProps) {
      const { data } = this.props;
      if (data && prevProps.data !== data) {
        this.update(data);
      }
    }

    update = (items, eventHandler) => {
      const sortedItems = items.sort((a, b) => a.id - b.id);
      this.setState({ items: sortedItems }, eventHandler);
    };

    onItemRemoveHandler = itemId => {
      const { items } = this.state;
      const newItems = items.filter(item => item.id !== +itemId);
      this.update([...newItems], () => this.onItemRemove(itemId));
    };

    renderItems = () => {
      const { items } = this.state;
      return items.map(item => {
        const { id, name } = item;
        return (
          <ListItem key={id} id={id} onRemove={this.onItemRemoveHandler} onClick={this.onItemClick}>
            {name}
          </ListItem>
        );
      });
    };

    render() {
      const { items } = this.state;
      const { error } = this.props;
      if (error) {
        return error.message;
      }
      if (!items) return 'Fetchind data...';
      return super.render();
    }
  }

  return withRouter(DictionaryList);
};
export default withDictionaryList;
