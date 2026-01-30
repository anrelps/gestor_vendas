import DadosVenda from './DadosVenda';
import { useParams } from 'react-router-dom';

const EditarVenda = () => {
  const { id } = useParams();
  const isEditing = !!id;
  return <DadosVenda title='Editar Venda' isEditing={isEditing} vendaId={id} />;
};

export default EditarVenda;
