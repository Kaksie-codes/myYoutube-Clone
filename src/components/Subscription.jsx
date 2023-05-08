import React from 'react'
import SensorsOutlinedIcon from '@mui/icons-material/SensorsOutlined';

const Subscription = ({img, name}) => {
    function truncate(string, n){
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }
  return (
    <div className="subscription">
        <img src={img} alt="channel image" />
        <div>
            <small>{truncate(name, 15)}</small>
            <SensorsOutlinedIcon className='nav__icon'/>
        </div>        
    </div>
  )
}

export default Subscription;