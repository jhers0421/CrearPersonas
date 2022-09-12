import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';

export const ContentCard = ({title, url}) => {
  
  const navigate = useNavigate();

  return (
    <Grid item md={3} onClick={() => navigate(`/${url}`)}>
      <Paper elevation={5}>
        <Card>
          <CardContent>
            <Typography variant='h4'>{title}</Typography>
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  )
}
