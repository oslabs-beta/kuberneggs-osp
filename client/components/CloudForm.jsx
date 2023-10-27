import React, { useState, useEffect } from "react";
import { Box, Grid, Button, IconButton, Fab, Typography } from '@mui/material';
import { Link, animateScroll as scroll } from 'react-scroll';
import Clusters from './Clusters'
import Form from './Form';

const CloudForm = () => {
  const [clusters, setClusters] = useState();
  const [clusterName, setClusterName] = useState(null);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState(null);
  const [getCreds, setGetCreds] = useState(false);

  const fetchRequest = async (endpoint, method, card) => {
    // If no "method" is passed, it uses this default header
    let defaultHeader = {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(card)
      };
    // If a method is is passed, it updates the default header
    let header = Object.assign({}, defaultHeader, method);

    const result = await fetch(`${endpoint}`, header)
      .then((data) => data.json())
      // .then((data) => console.log('DATA', data))
      .catch((err) => console.error(err))
    return result;
}

  const handleGetClusters = async (e) => {
    const allClusters = await (fetchRequest('http://localhost:3001/google/getClusters',{method: "POST"}));
    await setClusters(allClusters)
  }

  const handleGetCredentials = async (e) => {
    const credsAreTied = await (fetchRequest('http://localhost:3001/google/getCredentials', {method: "POST"}, {"clusterName": clusterName, "location": location}))
    await setGetCreds(credsAreTied)
  }

  return (
    <>
    <Box id="cluster">

      <Clusters
        clusters={clusters}
        clusterName={clusterName}
        setClusterName={setClusterName}
        setLocation={setLocation}
        setStatus={setStatus}
        handleGetClusters={handleGetClusters}
        
      />

      {clusterName ? (
        <div >
          <Typography variant="h6" component="h6" style={{justifyContent: 'center'}}> 
            Current Cluster: {clusterName}
          </Typography>
          <Typography>
            Status: {status.toLowerCase()}
          </Typography>

          <Button onClick={handleGetCredentials} size="large">
          <Typography> <Fab variant="extended"> Proceed </Fab>   </Typography>  
            <Link
              to="form">
            </Link>
          </Button>
           </div>

      ) : null}

      {getCreds ? (<Form/>) : null}
    </Box>
    </>
  )
}

export default CloudForm;