import React from 'react';
import PropTypes from 'prop-types';

function Spin(props) {
  const { isTrue } = props;
  return (
    <div
      className={ ` ${!isTrue ? 'hidden' : 'flex'} h-12 w-12 border-2
        border-r-gray-200 mt-10
        border-b-gray-200 border-t-purple-400 animate-spin ease-linear rounded-full` }
    />
  );
}

Spin.propTypes = {
  isTrue: PropTypes.bool.isRequired,
};
export default Spin;
