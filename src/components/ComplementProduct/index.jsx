import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { propsTextField } from 'utils/form';


const ComplementProduct = ({ complementsValue, getValue }) => {
  const initComplement = { name: '', max: 1, min: 0, isRequired: null, options: [{ name: '', price: 0 }] };

  const [complements, setComplements] = useState([...complementsValue]);

  const setValue = (index, key, value) => {
    const complementsCurrent = [...complements];
    complementsCurrent[index][key] = value;
    getValue(complementsCurrent, validateData());
  };

  const setValueOption = (index, indexOption, key, value) => {
    const complementsCurrent = [...complements];
    complementsCurrent[index]['options'][indexOption][key] = value;
    getValue(complementsCurrent, validateData());
  };

  const addComplement = (index) => {
    const complementsCurrent = [...complements];
    complementsCurrent[index]['options'].push({ name: '', price: 0 });
    setComplements(complementsCurrent);
  };

  const addComplementGroup = () => setComplements([...complements, initComplement]);

  const validateData = () => {
    const errors = [];
    let hasOptionsEmpty = 0;

    complements.forEach((item, index) => {
      if (!item.name.trim().length) {
        errors.push(`O nome do ${index+1}º complemento está em branco.`);
        return errors;
      }

      if (item.isRequired === null || item.isRequired === undefined) {
        errors.push(`Selecione se o complemento "${item.name.trim() || index}" é obrigatório ou não.`);
      }

      if (item.max <= 0) {
        errors.push(`A quantidade máxima deve ser maior do que zero.`);
      }

      if (item.isRequired && item.min <= 0) {
        errors.push(`O complemento "${item.name.trim() || index}" é obrigatório, por isso a quantidade mínima deve ser maior que zero (0).`);
      }

      item.options.forEach((option, i) => {
        if (!option.name.trim().length) hasOptionsEmpty++;
      });

      // if(hasOptionsEmpty) errors.push(`Existe opção em branco no complemento "${item.name.trim() || index}".`);
    });

    return errors;
  };

  useEffect(() => {
    if (!complementsValue.length) return setComplements([initComplement]);
    console.log('ook')
  }, []);

  return (
    <Grid container spacing={2} sx={{ width: '100%', margin: 'auto' }}>
      {complements.map((item, index) => {
        const options = item.options || [];

        return (
          <Accordion key={`complent-${index}`} sx={{ width: '100%', margin: 'auto' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{complements[index]['name'] || `${(index + 1)} - Grupo de complemento`}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    {...propsTextField}
                    InputLabelProps={{ shrink: true }}
                    label="Nome"
                    value={complements[index]['name']}
                    onChange={(e) => setValue(index, 'name', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 1.1, mb: 1.1 }}>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Indique se a categoria é necessária para pedir o prato
                  </Typography>

                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => setValue(index, 'isRequired', false)}
                        checked={complements[index]['isRequired'] === false}
                      />
                    }
                    label="Opcional, o cliente pode ou não selecionar os itens."
                  />

                  <br />

                  <FormControlLabel
                    sx={{ mt: 1 }}
                    control={
                      <Checkbox
                        onChange={() => setValue(index, 'isRequired', true)}
                        checked={complements[index]['isRequired'] === true}
                      />
                    }
                    label="Obrigatório, o cliente deve selecionar  1 ou mais itens para adicionar o pedido no carrinho."
                  />
                </Grid>

                <Grid item xs={5} sm={5}>
                  <TextField
                    {...propsTextField}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    label="Quant. mínima"
                    type="number"
                    value={complements[index]['min']}
                    onChange={(e) => setValue(index, 'min', e.target.value)}
                  />
                </Grid>

                <Grid item xs={5} sm={5}>
                  <TextField
                    {...propsTextField}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    label="Quant. máxima"
                    type="number"
                    value={complements[index]['max']}
                    onChange={(e) => setValue(index, 'max', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography><strong>Opções</strong></Typography>
                </Grid>

                {options.map((option, indexOption) => (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        {...propsTextField}
                        margin="none"
                        size="small"
                        label="Nome"
                        value={complements[index]['options'][indexOption]['name']}
                        onChange={(e) => setValueOption(index, indexOption, 'name', e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...propsTextField}
                        margin="none"
                        size="small"
                        label="Valor adicional (R$)"
                        value={complements[index]['options'][indexOption]['price']}
                        onChange={(e) => setValueOption(index, indexOption, 'price', e.target.value)}
                      />
                    </Grid>

                    {/* <Grid item xs={0.5} sm={2}>
                      <Button variant="outlined" sx={{ margin: 'auto' }} onClick={() => addComplement(index)}>
                        <DeleteIcon />
                      </Button>
                    </Grid> */}
                  </>
                ))}

                <Grid item xs={12}>
                  <Button variant="outlined" onClick={() => addComplement(index)}>
                    + Novo complemento
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}

      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'end', flexWrap: 'wrap', mt: 2, gap: 1 }}
      >
        <Button variant="contained" onClick={addComplementGroup}>
          Novo grupo de complemento
        </Button>

        <Button variant="contained" onClick={addComplementGroup}>
          Importar grupo
        </Button>
      </Grid>
    </Grid>
  );
};

export default ComplementProduct;
