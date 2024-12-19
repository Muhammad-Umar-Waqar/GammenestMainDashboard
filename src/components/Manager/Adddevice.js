import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export default function AddDeviceSpeedDial() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deviceDetails, setDeviceDetails] = useState({
    id : "",
    port : "",
  });

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setDeviceDetails({id : "", port : "",});
  };

  const handleSave = () => {
    if (deviceDetails.id && deviceDetails.port) {
      onSaveDevice(deviceDetails); // Send the device details to the parent or save to database
      handleClosePopover();
      console.log('Device ID:', deviceDetails.id);
      console.log('Device PORT:', deviceDetails.port);
      alert(`Device ID: ${deviceDetails.id} Device port: ${deviceDetails.port}`);
    } else {
      alert('Please fill in both fields');
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ position: 'relative' }}>
        
      <SpeedDial
        ariaLabel="Add New Device"
        icon={<SpeedDialIcon  openIcon={<AddIcon  />} />}
        onClick={handleOpenPopover}
        className="text-xs scale-75"
       
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <TextField
            fullWidth
            label="Device ID"
            variant="outlined"
            value={deviceDetails.id}
            onChange={(e) => setDeviceDetails((prev)=> ({...prev, id:e.target.value}))}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Device Port"
            variant="outlined"
            value={deviceDetails.port}
            onChange={(e)=> setDeviceDetails((prev)=> ({...prev, port: e.target.value}))}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button variant="outlined" onClick={handleClosePopover}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Create
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
