import { Navigate, useParams } from 'react-router-dom';
import DadosVenda from '../components/DadosVenda';

const EditarVenda = () => {
  const { id } = useParams();
  if (!id || !Number.isFinite(Number(id))) {
    return <Navigate to='/vendas' replace />;
  }

  return <DadosVenda title='Editar Venda' isEditing={true} vendaId={id} />;
};

export default EditarVenda;
