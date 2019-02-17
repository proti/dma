import React from 'react';
import PropTypes from 'prop-types';
import LabelButton from '../../LabelButton/LabelButton';
import EditableItem from '../../EditableItem/EditableItem';

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
      const itemsWithIds = sortedItems.map((item, index) => ({ ...item, id: index }));
      this.setState({ items: itemsWithIds, label: updatedLabel });
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

    onLabelChangeHandler = vo => this.update(null, vo.value);

    renderLabel = () => {
      const { editable, label } = this.state;
      return (
        <EditableItem
          id="label"
          defaultValue={label}
          disabled={!editable}
          onChange={this.onLabelChangeHandler}
        />
      );
    };

    render() {
      const { items, editable } = this.state;
      const { error } = this.props;
      if (error) {
        return error.message;
      }
      if (!items || !items.length) return 'Fetchind data...';
      return (
        <div>
          <div>
            <LabelButton onClick={this.onEditHandler}>Edit</LabelButton>
          </div>
          <div>{this.renderLabel()}</div>
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
