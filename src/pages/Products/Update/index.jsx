import { useContext, useEffect, useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from 'contexts/auth';
import { ApiService } from 'services/api.service';
import Header from 'components/Header';
import ComplementProduct from 'components/ComplementProduct';
import FormProduct from 'components/FormProduct';
import ButtonFloat from 'components/ButtonFloat';

const Update = () => {
  const apiService = new ApiService();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setLoading, toast } = useContext(AuthContext);
  const [tabCurrent, setTabCurrent] = useState(0);
  const [complements, setComplements] = useState([]);
  const [complementsErrors, setComplementsErrors] = useState([]);
  const [dataProduct, setDataProduct] = useState(null);

  const getProduct = async () => {
    try {
      setLoading('Buscando produto...');
      const { data } = await apiService.get('/admin/products/' + id);
      setDataProduct({
        name: data.name,
        description: data.description || '',
        code: data.code || '',
        price: data.price,
        discountPrice: data.discountPrice || 0,
        status: data.isActive,
        category: data.category._id,
        unit: data.unit,
        images: [data.images[0]?.url],
      });
      setComplements(data.complements);
    } catch (error) {
      toast.error('Erro ao buscar o produto');
    } finally {
      setLoading(null);
    }
  };

  const validateData = () => {
    let errors = 0;

    const dataForm = dataProduct;
    setDataProduct({});

    if (!dataProduct.name.trim().length) {
      toast.error('O nome do produto não pode ficar vazio');
      errors += 1;
    }
    if (isNaN(Number(dataProduct.price))) {
      toast.error('Preço é obrigatório');
      errors += 1;
    } else {
      Number(dataProduct.price) <= 0 
        ? toast.error('Preço é deve ser maior que zero')
        : dataForm.price = Number(dataProduct.price);
    }
    if (dataProduct.discountPriceFormat) {
      dataForm.discountPrice = Number(dataProduct.discountPrice);
    }
    if (dataProduct.discountPrice && !dataProduct.discountPrice > 0) {
      toast.error('Preço do desconto inválido');
      errors += 1;
    }
    if (!dataProduct.category) {
      toast.error('Selecione a categoria do produto');
      errors += 1;
    }

    setDataProduct(dataForm);
    return errors ? false : true;
  };

  const handleSubmit = async () => {
    if (!validateData()) return;
    if (complements.length) {
      if (complementsErrors.length) return toast.error(complementsErrors.join('\n\n'));
    }

    setLoading('Salvando...');

    try {
      const formData = new FormData();
      formData.append('name', dataProduct.name);
      formData.append('description', dataProduct.description);
      formData.append('code', dataProduct.code);
      formData.append('price', dataProduct.price);
      formData.append('discountPrice', dataProduct.discountPrice);
      formData.append('isActive', dataProduct.status);
      formData.append('category', dataProduct.category);
      formData.append('unit', dataProduct.unit);
      formData.append('images', dataProduct.images[0]);
      formData.append('imageId', dataProduct.images[0].id);
      formData.append('complements', JSON.stringify(complements));

      await apiService.put(`/admin/products/${id}`, formData, true);

      toast.success('Produto atualizado!');
      setTimeout(() => {navigate({ pathname: '/admin/products' }); }, 2000);
    } catch (e) {
      toast.error(e.response.data?.message || 'Erro ao atualizar produto');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, newValue) => setTabCurrent(newValue);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <section>
      <Header title="Editar produto" back={-1} />

      <Tabs value={tabCurrent} onChange={handleChange} variant="scrollable">
        <Tab label="Detalhes" />
        <Tab label="Complementos" />
      </Tabs>

      <Box component="section" sx={{ mb: '48px' }}>
        {tabCurrent === 0 ? (
          dataProduct
          && <FormProduct 
              initialData={dataProduct} 
              getData={data => setDataProduct(data)} 
            />
        ) : (
          <section style={{ marginTop: '1rem' }}>
            <ComplementProduct
              complementsValue={complements}
              getValue={(value, errors) => {
                setComplements(value);
                setComplementsErrors(errors);
              }}
            />
          </section>
        )}
      </Box>

      <ButtonFloat text="Salvar" onClick={() => handleSubmit()} />
    </section>
  );
};

export default Update;
