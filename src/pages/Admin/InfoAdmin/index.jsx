import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import Header from 'components/Header';
import { ApiService } from 'services/api.service';
import { AuthContext } from 'contexts/auth';
import * as S from './style';

const Setting = () => {
  const apiService = new ApiService();
  const { toast, setLoading } = useContext(AuthContext);
  const [data, setData] = useState({ name: '', phoneNumber: '', email: '' });

  const save = async (e) => {
    e.preventDefault();
    setLoading('Agurade...');

    try {
      const response = await apiService.put('/admin/company/owner', data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getData = async (id) => {
    try {
      setLoading('Carregando dados...');
      const { data } = await apiService.get('/admin/company/owner');
      setData(data);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header title="Administrador" back={-1} />

      <Box component="section" noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Nome"
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              InputLabelProps={{ shrink: data.name }}
              margin="dense"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Email"
              value={data?.email}
              type="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              InputLabelProps={{ shrink: data.email }}
              margin="dense"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Telefone"
              value={data?.phoneNumber}
              type="phone"
              onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
              InputLabelProps={{ shrink: data.phoneNumber }}
              margin="dense"
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <S.WrapperButtonSaved>
          <Button variant='contained' onClick={save}>Salvar</Button>
        </S.WrapperButtonSaved>
      </Box>
    </>
  );
};

export default Setting;
