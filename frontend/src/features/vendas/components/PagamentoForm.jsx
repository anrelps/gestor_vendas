import { FileText } from 'lucide-react';

const PagamentoForm = ({ valorPago, valorTotal, onValorPagoChange, onValorTotalChange, onCancel, onSave, loadingSaving, isEditing, onGerarPDF }) => (
  <div className='mt-8'>
    <div className='bg-white border border-gray-200 rounded-md px-6 py-4 flex flex-col gap-3 w-full max-w-full mx-auto shadow-sm'>
      <div className='flex gap-4 mb-2'>
        <div className='flex-1'>
          <label className='block text-xs text-gray-500 mb-1'>Valor Pago</label>
          <input
            type='text'
            inputMode='decimal'
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring text-base'
            placeholder='R$ 0,00'
            value={valorPago}
            onChange={onValorPagoChange}
          />
        </div>
        <div className='flex-1'>
          <label className='block text-xs text-gray-500 mb-1'>Valor Total</label>
          <input
            type='text'
            inputMode='decimal'
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring text-base'
            placeholder='R$ 0,00'
            value={valorTotal}
            onChange={onValorTotalChange}
          />
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <button
          onClick={onCancel}
          className='flex-1 px-3 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition'
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          disabled={loadingSaving}
          className='flex-1 px-3 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 transition'
        >
          {loadingSaving ? 'Salvando...' : 'Salvar'}
        </button>
      </div>

      {isEditing && (
        <div className='flex gap-2 mt-2'>
          <button
            onClick={onGerarPDF}
            className='flex-1 px-3 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2'
          >
            <FileText size={18} /> Gerar PDF
          </button>
        </div>
      )}
    </div>
  </div>
);

export default PagamentoForm;
