import React, { useState } from 'react';
import { Button, Chip, Grid, IconButton, Tooltip, Stack } from '@mui/material';
import { ContentCopy, InfoOutlined, KeyboardArrowUp } from '@mui/icons-material';
import { Element, Link, animateScroll as scroll } from 'react-scroll';
import minikubeBlock from '../assets/mkube-floating.png';


import { Link as RouterLink } from 'react-router-dom';

const MinikubeSetup = () => {
  const [isCopied, setIsCopied] = useState(false);

  // Code for copy to clipboard functionality
  const minikubeStartCode = 'minikube start';
  const copyToClipboard = () => {
    navigator.clipboard.writeText(minikubeStartCode)
      .then(() => {
        setIsCopied(true);
      });
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Grid container spacing={2} className='minikube' id='minikube-setup-instructions'>

      {/* Scroll to landing page button */}
      <Grid item xs={12} className='setup-header'>
        <Link class='nav-button'
          to='landing'
          spy={true}
          smooth={true}
          duration={900} 
          >
          <IconButton>
            <KeyboardArrowUp />
          </IconButton>
        </Link>
      </Grid>
      
      <Grid item md={5} >
        <img src={minikubeBlock} className='setup-img'/>
      </Grid>

      <Grid item md={7} className='setup-content'>
        <h1>Deploy Kubernetes cluster with Minikube</h1>

        <p>Before getting started, you'll need:</p>
        <ol>
          <li>A container or virtual machine manager</li>
          <li>Minikube installed on your machine</li>
        </ol>

        <Grid className='setup-paper'>
          <h3><Chip label='1' /> Set up your container <InfoOutlined /></h3>
          <p>We support Docker, Hyperkit, etc. All you'll need is the name of your container.</p>
        </Grid>

        <Grid className='setup-paper'>
          <h3><Chip label='2' /> Install Minikube</h3>
          <p>Click here for instructions on how to install.</p>
        </Grid>

        <Grid className='setup-paper'>
          <h3><Chip label='3' /> Start Minikube</h3>
          <p>Run this command in your terminal to get started.</p>
          <div class='code-snippet'>
            <pre>{minikubeStartCode}</pre>
            <Tooltip title={isCopied ? 'Copied!' : 'Copy'} >
              <IconButton onClick={copyToClipboard} style={{ color: '#272a36' }}>
                <ContentCopy/>
              </IconButton>
            </Tooltip>
          </div>
        </Grid>
      </Grid>

      <Grid xs={12} className='setup-footer'>
        <Stack justifyContent='center' alignItems='center'>
          <h3> Ready to deploy?</h3>
          <RouterLink to='/form'>
            <Button variant='contained'>
              Let's go!
            </Button>
          </RouterLink>
        </Stack>
      </Grid>

    </Grid>
  )
};

export default MinikubeSetup;