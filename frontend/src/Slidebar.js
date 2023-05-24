import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import rmk from './rmk.png';
import ShopIcon from '@mui/icons-material/Shop';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StoreIcon from '@mui/icons-material/Store';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CategoryIcon from '@mui/icons-material/Category';
import FestivalIcon from '@mui/icons-material/Festival';
import LogoutIcon from '@mui/icons-material/Logout';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

function Slidebar() {
  return (
    <div >
  <Sidebar className='sidebar'>
  <Menu>
    <div className='row'> <MenuItem> <img src={rmk} className='logo'/> </MenuItem></div>
    <div className='cont'>
    <div className='row'> <Link to='/purs' className='pur linkt'> <MenuItem className='sub-nav sub-n'> <ShopIcon className="linkt"/>Purchase  </MenuItem></Link></div>
 <div className='row'><Link to='/dis' className="linkt"><MenuItem className='sub-n'><LocalShippingIcon className="linkt"/> Dispatch  </MenuItem></Link></div>
 <div className='row'><Link to='/stock' className="linkt"><MenuItem className='sub-n'><StoreIcon className="linkt"/> Available Stock </MenuItem></Link></div>
 <div className='row'> <Link to='/rep' className="linkt"><MenuItem className='sub-n'><AssessmentIcon className="linkt"/> Reports </MenuItem></Link></div>

 <div className='row'><Link to='/' className="linkt"> <MenuItem className='sub-n'><LogoutIcon className="linkt"/> Logout </MenuItem></Link></div>
    </div>
  </Menu>
</Sidebar>
    </div>
  )
}

export default Slidebar