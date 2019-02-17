import React from 'react';
import PropTypes from 'prop-types';
import LabelButton from '../../LabelButton/LabelButton';
import EditableItem from '../../EditableItem/EditableItem';
import style from './withDetails.scss';
import DropDown from '../../DropDown/DropDown';

const withDetails = (WrappedComponent, assignDomain) => {
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

    state = { items: [], label: '', editable: false, errors: [], domainToAssign: null };

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
      const { items, label, domainToAssign } = this.state;
      const { domainList } = this.props;

      const updatedLabel = newLabel || label;
      const sortedItems = newItems ? newItems.sort((a, b) => a.id - b.id) : items;
      const itemsWithIds = sortedItems.map((item, index) => ({ ...item, id: index }));
      const newDomainToAssign =
        !domainToAssign && assignDomain && domainList.length ? domainList[0].id : domainToAssign;

      this.setState({
        items: itemsWithIds,
        label: updatedLabel,
        domainToAssign: newDomainToAssign
      });
    };

    get id() {
      const {
        match: {
          params: { id }
        }
      } = this.props;
      return +id;
    }

    onRowRemoveHandler = rowId => {
      const { items } = this.state;
      const rowsLeft = items.filter(row => row.id !== rowId);
      this.update(rowsLeft);
    };

    onEditHandler = () => {
      this.setState(prevState => ({ editable: !prevState.editable }));
    };

    onDomainAssignHandler = async () => {
      const { getDomainById } = this.props;
      await getDomainById(this.state.domainToAssign);
      const newItems = this.state.items.map(item => {
        const found = this.props.selctedDomain.items.find(colour => colour.domain === item.colour);
        if (found) {
          return { ...item, colour: found.range };
        }
        return item;
      });
      this.update(newItems);
    };

    onDomainChange = item => {
      const { domainList } = this.props;
      const domainId = domainList.find(domain => domain.name === item.value).id;
      this.setState({ domainToAssign: domainId });
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
          newStyle={style.labelInput}
        />
      );
    };

    render() {
      const { items, editable } = this.state;
      const { error, domainList } = this.props;
      if (error) {
        return error.message;
      }
      if (!items || !items.length) return 'Fetchind data...';
      const editLabel = editable ? 'Cancel' : 'Edit';
      return (
        <div className={style.withDetails}>
          <header className={style.header}>
            <LabelButton onClick={this.onEditHandler}>{editLabel}</LabelButton>
            {assignDomain && domainList && (
              <div className={style.assignDomain}>
                <DropDown id="domains" onChange={this.onDomainChange} items={domainList} />
                <LabelButton onClick={this.onDomainAssignHandler} disabled={!editable}>
                  Assign domain
                </LabelButton>
              </div>
            )}
          </header>
          <main>
            <div className={style.labelContainer}>
              Name:<span className={style.label}>{this.renderLabel()}</span>
            </div>
            <div>{super.render()}</div>
          </main>
          {editable && (
            <footer className={style.footer}>
              <LabelButton onClick={this.onSaveHandler}>Save changes</LabelButton>
            </footer>
          )}
        </div>
      );
    }
  }

  return Details;
};
export default withDetails;
