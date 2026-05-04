const WelcomeBanner = ({ userName }) => (
  <div className='rounded-2xl bg-linear-to-r from-primary via-primary-accent to-primary-light p-6 shadow-md border border-primary/20 flex items-center gap-4'>
    <span className='text-3xl'>👋</span>
    <div>
      <div className='text-lg font-semibold text-white drop-shadow'>
        Bem-vindo{userName ? `, ${userName}` : ''}!
      </div>
      <div className='text-sm text-white/80'>Tenha um ótimo dia e boas vendas!</div>
    </div>
  </div>
);

export default WelcomeBanner;
