import React from 'react';
import PropTypes from 'prop-types';
import './AxisSelect.scss';
import {axisCategories} from './axisCategories';

const AxisSelect = ({label, setAxis, current}) => {
  return (
    <div className={'axis-select form-group mb-0'}>
      <div className={'row'}>
        <div className={'col-sm-3 label'}>{`${label}: `}</div>
        <div className={'col-sm-9'}>
          <select className={'custom-select'} value={current || ''} onChange={({target: {value}}) => setAxis(value)}>
            <option disabled value={''}>{'--------'}</option>
            {
              Object.keys(axisCategories).map(category => (<option key={category}
                                                                   value={category}>{axisCategories[category]}</option>))
            }
          </select>
        </div>
      </div>
    </div>
  );
};

AxisSelect.propTypes = {
  current: PropTypes.string,
  label: PropTypes.string.isRequired,
  setAxis: PropTypes.func
};

export default AxisSelect;