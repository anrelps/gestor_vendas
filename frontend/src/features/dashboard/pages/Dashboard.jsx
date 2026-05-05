import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DonutChart from '../../../components/charts/DonutChart';
import { getLucroSemanal, getResumoFinanceiro, getResumoMes } from '../../../redux/slices/chartSlice';
import MonthlyResume from '../components/MonthlyResume';
import WeeklyRevenueChart from '../components/WeeklyRevenueChart';
import WelcomeBanner from '../components/WelcomeBanner';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { lucroSemanal, resumoFinanceiro, resumoMes } = useSelector((state) => state.chart);

  useEffect(() => {
    dispatch(getLucroSemanal());
    dispatch(getResumoFinanceiro());
    dispatch(getResumoMes());
  }, [dispatch]);

  return (
    <div className='w-full'>
      <div className='mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
        <WelcomeBanner userName={user?.nome} />

        <div className='grid gap-6 lg:grid-cols-2 items-stretch'>
          <MonthlyResume atual={resumoMes.atual} anterior={resumoMes.anterior} retrasado={resumoMes.retrasado} />
          <WeeklyRevenueChart lucroSemanal={lucroSemanal} />
        </div>

        <DonutChart
          total={resumoFinanceiro.total}
          pago={resumoFinanceiro.pago}
          pendente={resumoFinanceiro.pendente}
          pendente_total={resumoFinanceiro.pendente_total}
        />
      </div>
    </div>
  );
};

export default Dashboard;
