import { BiWindows } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { LuComputer } from "react-icons/lu";
import { BiCode } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { BiGame } from "react-icons/bi";
import { BiSave } from "react-icons/bi";
import { BiNote } from "react-icons/bi";
import { SiDatev } from "react-icons/si";
import { CgCalculator } from "react-icons/cg";

const ControlPanelInfo = [
{
icon : <BiWindows/> ,
href : "*"
},
{
icon : <BiUser/> ,
href : "/BiUser"
},
{
icon : <CgCalculator/> ,
href : "/AgeCalculator"
},
{
icon : <BiEdit/> ,
href : "/Note"
},
{
icon : <BiSave/> ,
href : "/Save"
},
{
icon : <BiGame/> ,
href : "/GamePage"
}
]


export default ControlPanelInfo ;