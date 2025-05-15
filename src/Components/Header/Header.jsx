import "./Header.css";
import { BsSearch } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import HeaderLinks from "./HeaderLinks";
import { FaBars } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import LogoPhoto from '../../Assist/images/Muhammad.jpg';
import ThemeToggle from '../ThemeToggle/ThemeToggle '

function Header({openSide , openearch}) {


  return (
    <header className="Header">
      <div className="Header__Logo">
        <img className="Header__Logo__Photo" src={LogoPhoto} alt="Logo" />
        <span className="Header__Logo__Tag">Elhajj</span>
      </div>

      <div className="Header__Other">
        <div className="Header__Links">
          {HeaderLinks && HeaderLinks.length > 0
            ? HeaderLinks.map((item, index) => (
                <a
                
                  className="Header__Links__Link" 
                  href={item.path}
              
                >
                  {item.name}
                </a>
              ))
            : null}
          
        </div>
        
        <div className="Header__Social__Media">
        {/* <ThemeToggle/> */}
          <a target="_blank" href="https://www.instagram.com/elhajj_coding" className="Header__Social__Media__Link">
            <BsInstagram className="Header__Social__Media__Link__Icon" />
            <span className="Header__Social__Media__Link__Name">Instagram</span>
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/muhammad-elhajj-489580335" className="Header__Social__Media__Link">
            <BsLinkedin className="Header__Social__Media__Link__Icon" />
            <span className="Header__Social__Media__Link__Name">LinkedIn</span>
          </a>
          <a target="_blank" href="https://github.com/MuhammadElhajj" className="Header__Social__Media__Link">
            <BsGithub className="Header__Social__Media__Link__Icon" />
            <span className="Header__Social__Media__Link__Name">Github</span>
          </a>
        </div>
        <div className="icon__part">
        <ThemeToggle/>
      <FaBars  className="Header__Bars__Icons" onClick={openSide}/>
      </div>
      </div>
      {/* <FaBars  className="Header__Bars__Icons"/> */}
    </header>
  );
}

export default Header;
