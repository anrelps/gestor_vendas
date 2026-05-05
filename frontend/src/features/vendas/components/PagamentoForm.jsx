import { FileText } from 'lucide-react';

const PagamentoForm = ({ valorPago, valorTotal, onValorPagoChange, onValorTotalChange, onCancel, onSave, loadingSaving, isEditing, onGerarPDF }) => (
  <div className='mt-4 bg-white rounded-xl border border-gray-100 shadow-xs p-6'>
    <div className='flex gap-4 mb-5'>
      <div className='flex-1'>
        <label className='block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5'>
          Valor Pago
        </label>
        <input
          type='text'
          inputMode='decimal'
          className='w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-gray-700 placeholder-gray-400'
          placeholder='R$ 0,00'
          value={valorPago}
          onChange={onValorPagoChange}
        />
      </div>
      <div className='flex-1'>
        <label className='block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5'>
          Valor Total
        </label>
        <input
          type='text'
          inputMode='decimal'
          className='w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-gray-700 placeholder-gray-400'
          placeholder='R$ 0,00'
          value={valorTotal}
          onChange={onValorTotalChange}
        />
      </div>
    </div>

    <div className='flex flex-col gap-2'>
      <div className='flex gap-2'>
        <button
          onClick={onCancel}
          className='flex-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition cursor-pointer'
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          disabled={loadingSaving}
          className='flex-1 px-4 py-2.5 rounded-lg bg-primary text-sm font-medium text-white hover:bg-primary/90 transition disabled:opacity-60 cursor-pointer'
        >
          {loadingSaving ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
      {isEditing && (
        <button
          onClick={onGerarPDF}
          className='w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-primary/5 text-sm font-medium text-primary hover:bg-primary/10 transition inline-flex items-center justify-center gap-2 cursor-pointer'
        >
          <FileText size={15} />
          Gerar PDF
        </button>
      )}
    </div>
  </div>
);

export default PagamentoForm;
