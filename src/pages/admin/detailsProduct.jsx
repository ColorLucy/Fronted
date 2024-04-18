import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const DetailItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
}));

function Detail({ id, name, handleDetailClick }) {
    const handleClick = () =>  {
        handleDetailClick(id);
    }

    return(
        <Grid item xs={4} key={id}>
            <DetailItem onClick={handleClick}>
                <Button size='small' color='inherit'> {name}</Button>
            </DetailItem>
        </Grid>
    );
}

export default function ProductDetails({ details }) {
  const handleDetailClick = (detailId) => {
    console.log(`Detalle clickeado; ${detailId}`);
  };

  return (
    <Grid container spacing={1.5}>
      {details.map((detail) => (
        <Detail
          key={detail.id}
          id={detail.id}
          name={detail.name}
          handleDetailClick={handleDetailClick}
        />
      ))}
    </Grid>
  );
}
