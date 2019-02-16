import React from 'react';
import PropTypes from 'prop-types';
import LabelButton from '../../LabelButton/LabelButton';

const withDetails = WrappedComponent => {
  const { arrayOf, shape, number, string, object } = PropTypes;

  class Details extends WrappedComponent {
    static displayName = `withDetails(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    static propTypes = {
      data: shape({ id: number, name: string, items: arrayOf(object) })
    };

    static defaultProps = {
      data: null
    };

    constructor(props) {
      super(props);
      return this;
    }

    state = { items: [], label: '', editable: false, errors: [] };

    componentDidMount() {
      this.fetchData();
    }

    componentDidUpdate() {
      const { data } = this.props;
      if (data && data.id !== this.id) {
        this.fetchData();
      }
    }

    update = (newItems, newLabel) => {
      const { items, label } = this.state;
      const updatedLabel = newLabel || label;
      const sortedItems = newItems ? newItems.sort((a, b) => a.id - b.id) : items;
      this.setState({ items: sortedItems, label: updatedLabel });
    };

    get id() {
      const {
        match: {
          params: { id }
        }
      } = this.props;
      return +id;
    }

    onEditHandler = () => {
      this.setState(prevState => ({ editable: !prevState.editable }));
    };

    render() {
      const { items, editable } = this.state;
      const { error } = this.props;
      if (error) {
        return error.message;
      }
      if (!items) return 'Fetchind data...';
      return (
        <div>
          <div>
            <LabelButton onClick={this.onEditHandler}>Edit</LabelButton>
          </div>
          <div>{super.render()}</div>
          <div>
            {editable && <LabelButton onClick={this.onSaveHandler}>Save changes</LabelButton>}
          </div>
        </div>
      );
    }
  }

  return Details;
};
export default withDetails;
