import Layout from '../Layout';

const Dashboard = () => {
    return (
        <Layout>
            <div className='w-full'>
                <div className='w-full md:mt-0 mt-12'>
                    <div className='w-full md:flex md:justify-between md:gap-3 md:space-y-0 space-y-3'>
                        <div className='w-full p-8 bg-gray-200 text-center rounded-2xl shadow-md'>
                            <p className='text-slate-800'>Vendas/Serviços do mês</p>
                            <span className='text-primary font-semibold'>R$ 1.500</span>
                        </div>
                        <div className='w-full p-8 bg-gray-200 text-center rounded-2xl shadow-md'>
                            <p className='text-slate-800'>Valor recebido/mês</p>
                            <span className='text-primary font-semibold'>R$ 1.000</span>
                        </div>
                        <div className='w-full p-8 bg-gray-200 text-center rounded-2xl shadow-md'>
                            <p className='text-slate-800'>Valor pendente/mês</p>
                            <span className='text-red-700 font-semibold'>R$ 500,00</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
