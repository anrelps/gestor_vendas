// src/pages/Home.jsx
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, token, authChecked } = useSelector(
    (state) => state.user,
  );

  if (token && authChecked && isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lp-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f7f5ff;
          overflow-x: hidden;
          position: relative;
        }

        /* ── Noise overlay ── */
        .lp-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: .5;
        }

        /* ── Animated mesh blobs ── */
        .blob {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 {
          width: 55vw; height: 55vw;
          top: -15%; left: -10%;
          background: radial-gradient(ellipse, #a78bfa40 0%, transparent 70%);
          animation: drift1 14s ease-in-out infinite alternate;
        }
        .blob-2 {
          width: 45vw; height: 45vw;
          bottom: -10%; right: -8%;
          background: radial-gradient(ellipse, #818cf840 0%, transparent 70%);
          animation: drift2 16s ease-in-out infinite alternate;
        }
        .blob-3 {
          width: 28vw; height: 28vw;
          top: 35%; left: 58%;
          background: radial-gradient(ellipse, #c4b5fd35 0%, transparent 70%);
          animation: drift3 18s ease-in-out infinite alternate;
        }
        @keyframes drift1 { to { transform: translate(30px, 50px) scale(1.06); } }
        @keyframes drift2 { to { transform: translate(-25px, -35px) scale(1.04); } }
        @keyframes drift3 { to { transform: translate(-40px, 20px) scale(1.08); } }

        /* ── Nav ── */
        .lp-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 3rem;
          backdrop-filter: blur(16px);
          background: rgba(247,245,255,0.7);
          border-bottom: 1px solid rgba(167,139,250,0.15);
        }
        .lp-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.45rem;
          color: #7c3aed;
          letter-spacing: -0.03em;
        }
        .lp-logo span { color: #a78bfa; }

        /* ── Hero ── */
        .lp-hero {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 6rem 1.5rem 4rem;
        }

        .lp-badge {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          background: rgba(167,139,250,0.15);
          border: 1px solid rgba(167,139,250,0.35);
          border-radius: 999px;
          padding: .35rem 1rem;
          font-size: .8rem;
          font-weight: 500;
          color: #7c3aed;
          letter-spacing: .04em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          animation: fadeUp .6s ease both;
        }
        .lp-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #7c3aed;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .4; transform: scale(.7); }
        }

        .lp-h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 7vw, 6rem);
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #1e1b4b;
          max-width: 820px;
          animation: fadeUp .7s .1s ease both;
        }
        .lp-h1 .accent {
          background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lp-sub {
          margin-top: 1.5rem;
          font-size: 1.15rem;
          font-weight: 300;
          color: #6b7280;
          max-width: 520px;
          line-height: 1.7;
          animation: fadeUp .7s .2s ease both;
        }

        .lp-cta-group {
          display: flex;
          gap: 1rem;
          margin-top: 2.5rem;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeUp .7s .3s ease both;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          padding: .85rem 2.2rem;
          background: linear-gradient(135deg, #7c3aed, #818cf8);
          color: #fff;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 24px rgba(124,58,237,.3), inset 0 1px 0 rgba(255,255,255,.15);
          transition: transform .2s, box-shadow .2s;
          border: none;
          cursor: pointer;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(124,58,237,.4), inset 0 1px 0 rgba(255,255,255,.2);
        }
        .btn-primary svg { transition: transform .2s; }
        .btn-primary:hover svg { transform: translateX(3px); }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          padding: .85rem 2.2rem;
          background: rgba(255,255,255,.8);
          color: #7c3aed;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          border: 1.5px solid rgba(124,58,237,.25);
          transition: all .2s;
          backdrop-filter: blur(8px);
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,1);
          border-color: rgba(124,58,237,.6);
          transform: translateY(-2px);
        }

        /* ── Floating card preview ── */
        .lp-card-wrap {
          position: relative;
          margin-top: 4rem;
          width: 100%;
          max-width: 780px;
          animation: fadeUp .8s .45s ease both;
        }
        .lp-card-glow {
          position: absolute;
          inset: -2px;
          border-radius: 22px;
          background: linear-gradient(135deg, #a78bfa, #818cf8, #c4b5fd);
          filter: blur(18px);
          opacity: .45;
          z-index: -1;
        }
        .lp-card {
          background: rgba(255,255,255,.92);
          border: 1px solid rgba(167,139,250,.25);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(124,58,237,.08);
        }
        .lp-card-header {
          display: flex;
          align-items: center;
          gap: .5rem;
          margin-bottom: 1.25rem;
        }
        .lp-dot { width: 10px; height: 10px; border-radius: 50%; }

        /* ── Features ── */
        .lp-features {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 1.25rem;
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
          animation: fadeUp .8s .55s ease both;
        }
        .feat-card {
          background: rgba(255,255,255,.75);
          border: 1px solid rgba(167,139,250,.2);
          border-radius: 16px;
          padding: 1.5rem;
          backdrop-filter: blur(12px);
          transition: transform .25s, box-shadow .25s;
        }
        .feat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(124,58,237,.12);
        }
        .feat-icon {
          width: 42px; height: 42px;
          border-radius: 10px;
          background: linear-gradient(135deg, #ede9fe, #ddd6fe);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }
        .feat-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: .95rem;
          color: #1e1b4b;
          margin-bottom: .35rem;
        }
        .feat-desc {
          font-size: .85rem;
          color: #6b7280;
          line-height: 1.6;
        }

        /* ── Divider line ── */
        .lp-divider {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto 5rem;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .lp-divider::before, .lp-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(167,139,250,.35), transparent);
        }
        .lp-divider-text {
          font-size: .78rem;
          color: #a78bfa;
          letter-spacing: .08em;
          text-transform: uppercase;
          font-weight: 500;
          white-space: nowrap;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: .75rem;
        }
        @media (max-width: 600px) {
          .lp-nav { padding: 1rem 1.25rem; }
          .lp-hero { padding: 5rem 1rem 3rem; }
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="lp-root">
        {/* Blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        {/* Nav */}
        <nav className="lp-nav">
          <div className="lp-logo">Lumen<span>z</span></div>
          <Link to="/login" className="btn-primary" style={{ padding: '.55rem 1.5rem', fontSize: '.9rem' }}>
            Entrar
          </Link>
        </nav>

        {/* Hero */}
        <section className="lp-hero">
          <div className="lp-badge">
            <span className="lp-badge-dot" />
            Gestão de Vendas · Para Pequenos Negócios
          </div>

          <h1 className="lp-h1">
            Venda mais.<br />
            <span className="accent">Gerencie melhor.</span>
          </h1>

          <p className="lp-sub">
            O Lumenz reúne clientes, produtos e vendas em um só lugar — simples e direto para o seu negócio crescer sem complicação.
          </p>

          <div className="lp-cta-group">
            <Link to="/login" className="btn-primary">
              Acessar o sistema
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a href="#features" className="btn-ghost">Como funciona</a>
          </div>

          {/* UI Preview card */}
          <div className="lp-card-wrap">
            <div className="lp-card-glow" />
            <div className="lp-card">
              <div className="lp-card-header">
                <div className="lp-dot" style={{ background: '#f87171' }} />
                <div className="lp-dot" style={{ background: '#fbbf24' }} />
                <div className="lp-dot" style={{ background: '#34d399' }} />
              </div>
              <div className="stats-grid">
                {[
                  { label: 'Vendas hoje', value: 'R$\u00a01.840', color: '#7c3aed' },
                  { label: 'Clientes', value: '132', color: '#059669' },
                  { label: 'Produtos', value: '48', color: '#d97706' },
                ].map((s) => (
                  <div key={s.label} style={{
                    background: 'rgba(247,245,255,.8)',
                    border: '1px solid rgba(167,139,250,.2)',
                    borderRadius: '12px',
                    padding: '1rem',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: '.78rem', color: '#6b7280', marginTop: '.25rem' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.25rem', background: 'rgba(247,245,255,.8)', border: '1px solid rgba(167,139,250,.15)', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ fontSize: '.72rem', fontWeight: 600, color: '#a78bfa', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: '.75rem' }}>Últimas vendas</div>
                <div style={{ display: 'flex', gap: '.65rem', flexDirection: 'column' }}>
                  {[
                    { cliente: 'Maria Silva', produto: 'Camiseta P', valor: 'R$ 59,90', status: 'pago' },
                    { cliente: 'João Souza', produto: 'Calça Jeans', valor: 'R$ 129,90', status: 'pago' },
                    { cliente: 'Ana Costa', produto: 'Tênis Branco', valor: 'R$ 210,00', status: 'pendente' },
                  ].map((v, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: '50%',
                          background: 'linear-gradient(135deg,#ede9fe,#ddd6fe)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '.7rem', fontWeight: 700, color: '#7c3aed', flexShrink: 0,
                        }}>
                          {v.cliente.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div style={{ fontSize: '.82rem', fontWeight: 500, color: '#1e1b4b' }}>{v.cliente}</div>
                          <div style={{ fontSize: '.72rem', color: '#9ca3af' }}>{v.produto}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '.85rem', fontWeight: 700, color: '#1e1b4b' }}>{v.valor}</div>
                        <div style={{
                          fontSize: '.68rem', fontWeight: 600,
                          color: v.status === 'pago' ? '#059669' : '#d97706',
                          background: v.status === 'pago' ? 'rgba(5,150,105,.1)' : 'rgba(217,119,6,.1)',
                          borderRadius: 99, padding: '1px 7px', display: 'inline-block',
                        }}>{v.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="lp-divider">
          <span className="lp-divider-text">o que você encontra no lumenz</span>
        </div>

        {/* Features */}
        <div id="features" className="lp-features">
          {[
            { icon: '👥', title: 'Cadastro de Clientes', desc: 'Registre e organize sua base de clientes com histórico completo de compras e contatos.' },
            { icon: '📦', title: 'Gestão de Produtos', desc: 'Controle seu catálogo com preços, descrições e disponibilidade sempre atualizados.' },
            { icon: '🛒', title: 'Registro de Vendas', desc: 'Lance vendas rapidamente, vincule ao cliente e acompanhe cada transação em tempo real.' },
            { icon: '📈', title: 'Visão do Negócio', desc: 'Acompanhe o faturamento, os produtos mais vendidos e o desempenho geral do seu negócio.' },
          ].map((f) => (
            <div key={f.title} className="feat-card">
              <div className="feat-icon">{f.icon}</div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;