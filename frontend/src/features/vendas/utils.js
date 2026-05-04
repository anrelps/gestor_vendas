export const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export const formatCurrencyInput = (value) => {
  const digits = String(value).replace(/\D/g, '');
  if (!digits) return '';
  const number = Number(digits) / 100;
  return number.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
