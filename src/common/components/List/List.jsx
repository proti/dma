import React from 'react';
import PropTypes from 'prop-types';
import style from '../../../scss/_list.scss';

const List = ({ label, children }) => {
  return (
    <div className={style.list}>
      <div>{label}</div>
      <ul>{children}</ul>
    </div>
  );
};

const { string, arrayOf, oneOfType, node } = PropTypes;
List.propTypes = {
  label: oneOfType([node, arrayOf(node), string]),
  children: oneOfType([node, arrayOf(node)])
};

List.defaultProps = {
  label: null,
  children: null
};

export default List;
