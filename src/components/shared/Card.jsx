import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

const Card = ({title, children, buttonContent, buttonAction}) => {
  return (
    <div className={'card'}>
      <div className={'card-header'}>
        <div className={'title'}>{title}</div>
        {
          buttonContent ? (
            <div className={'button'} onClick={buttonAction}>
              {buttonContent}
            </div>
          ) : null
        }
      </div>
      <div className={'card-body'}>
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  buttonContent: PropTypes.node,
  buttonAction: PropTypes.func,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default Card;