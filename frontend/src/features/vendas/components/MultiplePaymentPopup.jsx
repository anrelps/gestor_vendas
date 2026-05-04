import { useState, useEffect } from 'react';

const MultiplePaymentPopup = ({ cliente = null, vendasIds = null, onClose, onConfirm }) => {
    const [valor, setValor] = useState('');
    const [metodo, setMetodo] = useState(null);
    const [valorError, setValorError] = useState('');
    const [metodoError, setMetodoError] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 10);
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => onClose?.(), 300);
    };

    const formatarValor = (v) => {
        const num = v.replace(/\D/g, '');
        if (!num) return '';
        const float = (parseInt(num) / 100).toFixed(2);
        return float.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleValorChange = (e) => {
        const formatted = formatarValor(e.target.value);
        setValor(formatted);
        if (valorError) setValorError('');
    };

    const valorNumerico = () => {
        return parseFloat(valor.replace(/\./g, '').replace(',', '.')) || 0;
    };

    const handleConfirm = () => {
        let hasError = false;
        if (!valor || valorNumerico() <= 0) {
            setValorError('Informe um valor válido maior que zero.');
            hasError = true;
        }
        if (!metodo) {
            setMetodoError('Selecione uma forma de distribuição.');
            hasError = true;
        }
        if (hasError) return;

        onConfirm?.({
            valor: valorNumerico(),
            metodo,
            cliente: cliente || null,
            vendasIds: vendasIds || null,
        });
    };

    const quantidadeVendas = vendasIds?.length ?? null;

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
            
            <div className={`fixed inset-0 bg-black/65 backdrop-blur-md flex items-center justify-center z-9999 p-4 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`} onClick={(e) => e.target === e.currentTarget && handleClose()}>
                <div className="bg-gray-50 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all duration-350" role="dialog" aria-modal="true" aria-labelledby="mpp-title" style={{boxShadow: '0 0 0 1px rgba(85, 5, 143, 0.12), 0 32px 64px rgba(85, 5, 143, 0.18), 0 8px 16px rgba(0,0,0,0.08)', transform: visible ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.97)', opacity: visible ? 1 : 0}}>

                    {/* Header */}
                    <div className="bg-purple-900 px-7 py-6 relative flex items-start gap-3.5">
                        <div className="w-10 h-10 min-w-10 bg-white/15 rounded-xl flex items-center justify-center mt-0.5">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="rgba(255,255,255,0.9)"/>
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h2 id="mpp-title" className="text-white text-base font-semibold m-0 mb-1 leading-tight tracking-tight">Distribuição de Pagamento em Lote</h2>
                            <p className="text-white/70 text-xs font-normal m-0 leading-relaxed">Distribua um valor entre múltiplas vendas automaticamente</p>
                        </div>
                        <button className="absolute top-4 right-4 w-7 h-7 bg-white/10 border-0 rounded-lg cursor-pointer text-white flex items-center justify-center transition-colors hover:bg-white/20" onClick={handleClose} aria-label="Fechar">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>

                    {/* Warning */}
                    <div className="mx-6 mt-5 bg-yellow-50 border-l-4 border border-yellow-400 rounded-xl p-3 flex gap-2.5 items-start">
                        <svg className="w-4 h-4 mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" stroke="#f5c842" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-yellow-900 text-xs font-medium m-0 leading-relaxed">
                            <strong>Atenção:</strong> Esta ação irá atualizar o valor de{' '}
                            {quantidadeVendas ? `${quantidadeVendas} vendas` : 'várias vendas'} de uma só vez. Verifique os dados antes de confirmar.
                        </p>
                    </div>

                    {/* Context badges */}
                    {(cliente || (vendasIds && vendasIds.length > 0)) && (
                        <div className="mx-6 mt-3.5 flex gap-2 flex-wrap">
                            {cliente && (
                                <span className="bg-purple-900/8 border border-purple-900/20 rounded-full px-3 py-1.5 text-xs font-medium text-purple-900 flex items-center gap-1.5">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" stroke="#55058f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    {typeof cliente === 'string' ? cliente : cliente?.nome ?? 'Cliente selecionado'}
                                </span>
                            )}
                            {vendasIds && vendasIds.length > 0 && (
                                <span className="bg-purple-900/8 border border-purple-900/20 rounded-full px-3 py-1.5 text-xs font-medium text-purple-900 flex items-center gap-1.5">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                        <rect x="2" y="7" width="20" height="14" rx="2" stroke="#55058f" strokeWidth="2.2"/>
                                        <path d="M16 7V5a2 2 0 00-4 0v2M8 11h.01M12 11h.01M16 11h.01" stroke="#55058f" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    {vendasIds.length} venda{vendasIds.length !== 1 ? 's' : ''} selecionada{vendasIds.length !== 1 ? 's' : ''}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Body */}
                    <div className="px-6 py-5">
                        <p className="text-xs font-bold text-gray-700 mb-2 tracking-wide uppercase">Valor a distribuir</p>
                        <div className="relative mb-1.5">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-purple-900 pointer-events-none" style={{fontFamily: 'JetBrains Mono'}}>R$</span>
                            <input
                                className={`w-full px-3.5 py-3 pl-9 border-2 rounded-xl text-lg font-bold font-mono text-gray-900 bg-white outline-none transition-all ${valorError ? 'border-red-500' : 'border-gray-300'} focus:border-purple-900 focus:shadow-lg focus:shadow-purple-900/10`}
                                type="text"
                                inputMode="numeric"
                                placeholder="0,00"
                                value={valor}
                                onChange={handleValorChange}
                                autoFocus
                                style={{fontFamily: 'JetBrains Mono'}}
                            />
                        </div>
                        {valorError && <p className="text-xs text-red-500 mt-1.5 font-medium">{valorError}</p>}

                        <div className="flex items-center gap-2.5 my-5">
                            <div className="flex-1 h-px bg-gray-300" />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Forma de distribuição</span>
                            <div className="flex-1 h-px bg-gray-300" />
                        </div>

                        <div className="flex flex-col gap-2.5 mb-1.5">
                            {/* Opção 1 */}
                            <button
                                className={`border-2 rounded-2xl px-4 py-3.5 cursor-pointer transition-all flex items-center gap-3.5 bg-white text-left w-full ${metodo === 'split_equally' ? 'border-purple-900 bg-purple-900/5 shadow-lg shadow-purple-900/8' : 'border-gray-300 hover:border-purple-900/40 hover:bg-purple-900/3'}`}
                                onClick={() => { setMetodo('split_equally'); setMetodoError(''); }}
                            >
                                <div className={`w-10 h-10 min-w-10 rounded-2xl flex items-center justify-center transition-colors ${metodo === 'split_equally' ? 'bg-purple-900/10' : 'bg-gray-100'}`}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14M5 8h14M5 16h14" stroke={metodo === 'split_equally' ? '#55058f' : '#6b7280'} strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-bold text-gray-900 mb-0.5">Dividir igualmente</div>
                                    <div className="text-xs text-gray-500 leading-relaxed">
                                        O valor é dividido em partes iguais entre todas as vendas
                                    </div>
                                </div>
                                <div className={`w-4.5 h-4.5 min-w-4.5 rounded-full border-2 flex items-center justify-center transition-all ${metodo === 'split_equally' ? 'border-purple-900' : 'border-gray-300'}`}>
                                    <div className={`w-2 h-2 rounded-full bg-purple-900 transition-all ${metodo === 'split_equally' ? 'opacity-100 scale-100' : 'opacity-0 scale-40'}`} />
                                </div>
                            </button>

                            {/* Opção 2 */}
                            <button
                                className={`border-2 rounded-2xl px-4 py-3.5 cursor-pointer transition-all flex items-center gap-3.5 bg-white text-left w-full ${metodo === 'oldest_first' ? 'border-purple-900 bg-purple-900/5 shadow-lg shadow-purple-900/8' : 'border-gray-300 hover:border-purple-900/40 hover:bg-purple-900/3'}`}
                                onClick={() => { setMetodo('oldest_first'); setMetodoError(''); }}
                            >
                                <div className={`w-10 h-10 min-w-10 rounded-2xl flex items-center justify-center transition-colors ${metodo === 'oldest_first' ? 'bg-purple-900/10' : 'bg-gray-100'}`}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 8v4l3 3M3.05 11a9 9 0 1017.9 0" stroke={metodo === 'oldest_first' ? '#55058f' : '#6b7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M3 3v5h5" stroke={metodo === 'oldest_first' ? '#55058f' : '#6b7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-bold text-gray-900 mb-0.5">Da mais antiga à mais recente</div>
                                    <div className="text-xs text-gray-500 leading-relaxed">
                                        Abate nas vendas mais antigas primeiro, até o valor zerar
                                    </div>
                                </div>
                                <div className={`w-4.5 h-4.5 min-w-4.5 rounded-full border-2 flex items-center justify-center transition-all ${metodo === 'oldest_first' ? 'border-purple-900' : 'border-gray-300'}`}>
                                    <div className={`w-2 h-2 rounded-full bg-purple-900 transition-all ${metodo === 'oldest_first' ? 'opacity-100 scale-100' : 'opacity-0 scale-40'}`} />
                                </div>
                            </button>
                        </div>
                        {metodoError && <p className="text-xs text-red-500 font-medium">{metodoError}</p>}
                    </div>

                    {/* Footer */}
                    <div className="flex gap-2.5 px-6 pb-6">
                        <button className="flex-1 px-3 py-3 border-2 border-gray-300 rounded-xl bg-white text-gray-700 text-sm font-bold cursor-pointer font-sans transition-all hover:border-gray-400 hover:bg-gray-50" onClick={handleClose}>Cancelar</button>
                        <button className="flex-2 px-3 py-3 border-0 rounded-xl bg-purple-900 text-white text-sm font-bold cursor-pointer font-sans flex items-center justify-center gap-2 transition-all hover:bg-purple-950 active:scale-98 shadow-lg shadow-purple-900/35 hover:shadow-purple-900/45 hover:shadow-xl" onClick={handleConfirm}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Distribuir pagamento
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default MultiplePaymentPopup;
