import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Collapse from '@mui/material/Collapse';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import ListItemText from '@mui/material/ListItemText';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';

function SideBarItem({ item, handleListItemClick, isExtended}) {

  return (
      <ListItemButton
          sx={{pl: item.isInsideSubList === true ? 5 : 2 }}
          onClick={handleListItemClick}
      >
          <ListItemIcon>
              {item.icon}
          </ListItemIcon>
      <ListItemText primary={item.text} />
      {item.text === "Processes" ? (isExtended ? <ExpandLess /> : <ExpandMore />) : null}
      
      </ListItemButton>
  );
}

const drawerWidth = 240;

class SideBarButtons {
  constructor(text, icon, subMenuButtons, isInsideSubList) {
    this.text = text;
    this.icon = icon;
    this.subMenuButtons = subMenuButtons;
    this.isInsideSubList = isInsideSubList;
  }
}


export default function SideBar() {

  const [isExtended, setIsExtended] = useState(true);

  const nestedListOfButtons = [
    new SideBarButtons("Pending", <WorkHistoryIcon />, null, true),
    new SideBarButtons("Open", <WorkIcon />, null, true),
    new SideBarButtons("Closed", <WorkOffIcon />, null, true),
  ];
  
  const ListOfButtons = [
    new SideBarButtons("Processes", <BusinessCenterOutlinedIcon />, nestedListOfButtons, false),
    new SideBarButtons("Networking", <PeopleIcon />, null, false),
  ];

  function handleListItemClick(page){
    if(page === "Processes"){
      setIsExtended(!isExtended);
    }
  }

  function renderItem(item, index){
    return(
      <SideBarItem 
        handleListItemClick={()=>{handleListItemClick(item.text);}}
        item={item}
        isExtended={isExtended}
        key={item.text}
      />
    );
  }

  function renderListItems(list){
    return(
      list.map((item, index) => {
        return (
          <div key={item.text}>
          {renderItem(item, index)}
          {item.subMenuButtons !== null &&
            <Collapse in={isExtended} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.subMenuButtons.map((item, index) => {
                  return renderItem(item, index);
                })}
              </List>
            </Collapse>
          }
          </div>
        );
      })
    );
  }

  return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {renderListItems(ListOfButtons)}
          </List>          
        </Box>
      </Drawer>
  );
}
