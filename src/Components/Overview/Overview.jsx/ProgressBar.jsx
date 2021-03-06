import React from 'react'
import PropTypes from 'prop-types'

const ProgressBar = props => {
    const {value, max}  = props;

return (
    <progress style={{width: "100%"}} value={value} max={max} />
)
    
};

ProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
}

export default ProgressBar