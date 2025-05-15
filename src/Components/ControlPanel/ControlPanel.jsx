import { NavLink } from 'react-router-dom';
import './ControlPanel.css';
import ControlPanelInfo from './ControlPanelInfo';

function ControlPanel() {
  return (
    <div className='ControlPanel'>
      {ControlPanelInfo.map((item, index) => (
        <NavLink
          key={index}
          to={item.href}
          className="ControlPanel__Link"
        >
          {item.icon}
        </NavLink>
      ))}
    </div>
  );
}

export default ControlPanel;