import { NavLink, useLocation } from 'react-router-dom';
import './ControlPanel.css';
import ControlPanelInfo from './ControlPanelInfo';

function ControlPanel() {
  const location = useLocation();

  return (
    <div className='ControlPanel'>
      {ControlPanelInfo.map((item, index) => (
        <NavLink
          key={index}
          to={item.href}
          className={({ isActive }) => 
            `ControlPanel__Link${isActive ? ' active' : ''}`
          }
          isActive={(match) => {
            const isActive = !!match;
            if (index === 0) {
              return isActive || location.pathname === '/';
            }
            return isActive;
          }}
        >
          {item.icon}
        </NavLink>
      ))}
    </div>
  );
}

export default ControlPanel;