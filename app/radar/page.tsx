"use client";

import { useState } from "react";
import "./radar.css";

const resources = [
  ["icon-tips.svg", "Sugestões de Apostas", "Tips baseadas em dados e análises rigorosas."],
  ["icon-scanner.svg", "Scanner de Oportunidades", "Mercados com potencial identificados automaticamente."],
  ["icon-match.svg", "Analisar Partidas", "Estatísticas avançadas e tendências de equipa."],
  ["icon-robot.svg", "Robô de Gols ao Vivo", "Alertas em tempo real durante as partidas."],
  ["icon-bank.svg", "Gestão de Banca", "Controle financeiro e histórico completo."],
  ["icon-alert.svg", "Alertas Telegram", "Receba sinais instantaneamente no telemóvel."],
  ["icon-support.svg", "Atendimento Prioritário", "Suporte dedicado para assinantes premium."],
  ["icon-live.svg", "Estatísticas em Direto", "Dados ao vivo de todas as ligas monitoradas."],
  ["icon-h2h.svg", "Histórico H2H", "Confrontos diretos e análise aprofundada."],
  ["icon-odds.svg", "Odds em Tempo Real", "Comparação entre casas de apostas."],
];

const performancePeriods = [
  {
    label: "Últimos 30 dias",
    values: [["ROI", "+18.4%", "↗"], ["YIELD", "+4.2%", "%"], ["ASSERTIVIDADE", "63.1%", "◎"], ["PICKS REALIZADAS", "218", "▣"], ["ODD MÉDIA", "1.87", "▤"], ["UNIDADES", "+8.3u", "◆"]],
  },
  {
    label: "Últimos 90 dias",
    values: [["ROI", "+15.7%", "↗"], ["YIELD", "+3.8%", "%"], ["ASSERTIVIDADE", "61.9%", "◎"], ["PICKS REALIZADAS", "604", "▣"], ["ODD MÉDIA", "1.84", "▤"], ["UNIDADES", "+21.6u", "◆"]],
  },
  {
    label: "Últimos 12 meses",
    values: [["ROI", "+13.2%", "↗"], ["YIELD", "+3.4%", "%"], ["ASSERTIVIDADE", "60.8%", "◎"], ["PICKS REALIZADAS", "2.418", "▣"], ["ODD MÉDIA", "1.82", "▤"], ["UNIDADES", "+76.4u", "◆"]],
  },
  {
    label: "Histórico completo",
    values: [["ROI", "+12.9%", "↗"], ["YIELD", "+3.2%", "%"], ["ASSERTIVIDADE", "60.4%", "◎"], ["PICKS REALIZADAS", "4.806", "▣"], ["ODD MÉDIA", "1.81", "▤"], ["UNIDADES", "+148u", "◆"]],
  },
];

const communityStats = [
  ["♧", "+30.000", "Usuários cadastrados"],
  ["▥", "+1,8M", "Análises realizadas"],
  ["♜", "+125.000", "Sinais enviados"],
  ["▣", "+95.000", "Partidas analisadas"],
];

const reviews = [
  ["JM", "João Martins", "Trader Esportivo", "Plataforma muito útil, com estatísticas detalhadas e análises geradas por IA que ajudam bastante na tomada de decisões."],
  ["BG", "Bruno Gomes", "Analista de Futebol", "O Radar deixou a preparação dos jogos mais rápida. Consigo cruzar tendências e odds em poucos minutos."],
  ["ND", "Nuno Duarte", "Apostador recreativo", "A organização dos dados e os alertas ajudam-me a acompanhar apenas os mercados que realmente interessam."],
  ["EM", "Eduardo Melo", "Gestor de comunidade", "Uma experiência simples para quem procura informação, contexto e histórico antes de tomar uma decisão."],
];

const faqs = [
  ["O que é o Radar Jogo a Jogo?", "O Radar Jogo a Jogo é uma plataforma de análise esportiva que reúne estatísticas, probabilidades, tendências e sinais para ajudar você a tomar decisões mais informadas antes de apostar."],
  ["Como os sinais são gerados?", "Os sinais são produzidos a partir do cruzamento de dados históricos, estatísticas em tempo real e modelos analíticos. Eles não representam garantia de resultado."],
  ["Como recebo os alertas?", "Os alertas ficam disponíveis na plataforma e podem ser enviados à comunidade do Radar no Telegram."],
  ["Posso cancelar quando quiser?", "Sim. O plano pode ser cancelado a qualquer momento, sem fidelidade."],
  ["Em quais dispositivos posso acessar?", "A interface é responsiva e pode ser utilizada em computador, tablet ou telemóvel."],
  ["Existe período de teste?", "A disponibilidade de teste gratuito pode variar conforme a campanha apresentada no momento do cadastro."],
  ["Como funciona a cobrança?", "A cobrança é recorrente conforme o período escolhido, mensal ou anual, e pode ser interrompida pelo utilizador."],
  ["Os resultados são garantidos?", "Não. Apostas envolvem risco e nenhum dado, análise ou sinal garante lucro ou resultado futuro."],
  ["O Radar é indicado para iniciantes?", "Sim. Os recursos foram organizados para servir tanto utilizadores iniciantes quanto pessoas habituadas a análises esportivas."],
];

const menu = [
  ["Performance", "performance"],
  ["Recursos", "recursos"],
  ["Estatísticas", "estatisticas"],
  ["Comunidade", "comunidade"],
  ["Planos", "planos"],
  ["Reviews", "reviews"],
  ["FAQs", "faqs"],
];

export default function RadarPage() {
  const [period, setPeriod] = useState(0);
  const [annual, setAnnual] = useState(false);
  const [reviewStart, setReviewStart] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const orderedReviews = reviews.map((_, index) => reviews[(index + reviewStart) % reviews.length]);

  return (
    <main className="radar-page">
      <div className="radar-warning">◉ Ministério da Fazenda adverte: Aposta não é investimento. <u>Jogue com responsabilidade.</u></div>

      <header className="radar-header">
        <a className="radar-logo" href="#top" aria-label="Radar Jogo a Jogo">
          <img src="radar/radar-mark.svg" alt="" />
          <span><b>RADAR</b><small>JOGO A JOGO</small></span>
        </a>
        <nav className={menuOpen ? "open" : ""}>
          {menu.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="radar-actions"><a href="#planos">Entrar</a><a className="radar-primary small" href="#planos">Criar Conta Grátis</a></div>
        <button className="radar-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu"><i /><i /><i /></button>
      </header>

      <section className="radar-hero" id="top">
        <div className="radar-hero-media"><img src="radar/hero-base.jpg" alt="" /><img src="radar/hero-overlay.jpg" alt="" /></div>
        <div className="radar-hero-shade" />
        <div className="radar-container radar-hero-content">
          <span className="radar-pill">✦ Dados ao vivo · Análises independentes</span>
          <h1>Dados, estatísticas e<br />insights para apostar<br />com <em>mais informação.</em></h1>
          <div className="radar-hero-actions"><a className="radar-primary" href="#planos">Criar Conta Grátis</a><a className="radar-secondary" href="#performance">Ver Performance</a></div>
          <div className="radar-players"><span>BG</span><span>ND</span><span>EM</span><span>CA</span><p><b>+30.000</b> players cadastrados</p></div>
        </div>
      </section>

      <div className="radar-topics">
        {["Dados atualizados em tempo real", "Análises independentes", "Ambiente seguro", "Jogo responsável", "Estatísticas auditáveis"].map((topic) => <span key={topic}>✓ {topic}</span>)}
      </div>

      <section className="radar-section" id="performance">
        <SectionHeading eyebrow="TRANSPARÊNCIA TOTAL" title="Performance Verificável" description="Resultados reais, auditáveis e baseados em dados. Sem edição, sem seleção." />
        <div className="radar-periods">{performancePeriods.map((item, index) => <button className={period === index ? "active" : ""} onClick={() => setPeriod(index)} key={item.label}>{item.label}</button>)}</div>
        <div className="radar-performance-grid">
          {performancePeriods[period].values.map(([label, value, icon]) => <article key={label}><div><span>{label}</span><i>{icon}</i></div><strong>{value}</strong></article>)}
        </div>
        <a className="radar-outline-button" href="#estatisticas">Ver Todas as Estatísticas</a>
      </section>

      <section className="radar-section radar-soft" id="recursos">
        <SectionHeading eyebrow="RECURSOS" title="O Arsenal Completo para Você" description="Tudo o que você precisa para analisar, acompanhar e encontrar oportunidades." />
        <div className="radar-resource-grid">
          {resources.map(([icon, title, copy], index) => <article className={index >= 8 ? "wide" : ""} key={title}><span><img src={`radar/${icon}`} alt="" /></span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="radar-section" id="estatisticas">
        <SectionHeading eyebrow="ESTATÍSTICAS" title={<>A comunidade Radar cresce<br />todos os dias</>} />
        <div className="radar-stat-grid">{communityStats.map(([icon, value, label]) => <article key={label}><i>{icon}</i><strong>{value}</strong><span>{label}</span></article>)}</div>
      </section>

      <section className="radar-community" id="comunidade">
        <img className="radar-watermark" src="radar/radar-watermark.svg" alt="" />
        <div className="radar-container radar-community-grid">
          <div><span className="radar-eyebrow">COMUNIDADE</span><h2>Telegram</h2><p>Participe na comunidade Radar Jogo a Jogo no Telegram e acompanhe estatísticas, análises, probabilidades e informações em tempo real para tomar decisões mais informadas antes de apostar.</p><a className="radar-primary" href="#comunidade">Entrar no Telegram</a></div>
          <img className="radar-telegram" src="radar/telegram.png" alt="Radar Jogo a Jogo no Telegram" />
        </div>
      </section>

      <section className="radar-plans" id="planos">
        <div className="radar-pricing">
          <img src="radar/pricing-bg.png" alt="" />
          <div className="radar-pricing-shade" />
          <div className="radar-pricing-copy"><span className="radar-eyebrow">PLANOS</span><h2>Desbloqueie<br />Todos os<br /><em>Recursos</em></h2><p>Acesso completo à plataforma Radar.</p><div><button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>Mensal</button><button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>Anual</button></div></div>
          <article className="radar-price-card"><span className="radar-pill">✦ Best value</span><h3>{annual ? "R$ 99,00" : "R$ 9,90"} <small>/{annual ? "ano" : "mês"}</small></h3><ul>{["Todas as análises", "Scanner de oportunidades", "Estatísticas avançadas", "Alertas Telegram", "Gestão de banca", "Histórico completo", "Atendimento prioritário"].map((item) => <li key={item}>✓ {item}</li>)}</ul><button className="radar-primary">Assinar Agora</button><small>Cancele quando quiser · Sem fidelidade</small></article>
        </div>
      </section>

      <section className="radar-section radar-reviews" id="reviews">
        <SectionHeading eyebrow="REVIEWS" title={<>Experiências reais, resultados<br />comprovados</>} />
        <div className="radar-review-track">{orderedReviews.map(([initials, name, role, quote]) => <article key={name}><p>“{quote}”</p><div><b>{initials}</b><span><strong>{name}</strong><small>{role}</small></span></div></article>)}</div>
        <div className="radar-review-nav"><span><i className="active" /><i /><i /></span><div><button onClick={() => setReviewStart((reviewStart + reviews.length - 1) % reviews.length)}>‹</button><button onClick={() => setReviewStart((reviewStart + 1) % reviews.length)}>›</button></div></div>
      </section>

      <section className="radar-section radar-soft radar-faqs" id="faqs">
        <SectionHeading eyebrow="FAQs" title="Perguntas Frequentes" />
        <div className="radar-faq-list">{faqs.map(([question, answer], index) => <details open={index === 0} key={question}><summary>{question}<span>⌄</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <footer className="radar-footer">
        <div className="radar-container">
          <div className="radar-footer-main">
            <div><a className="radar-logo" href="#top"><img src="radar/radar-mark.svg" alt="" /><span><b>RADAR</b><small>JOGO A JOGO</small></span></a><p>Inteligência artificial aplicada ao<br />mercado desportivo.</p></div>
            <div><nav>{menu.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav><a className="radar-telegram-link" href="#comunidade">● Entrar Comunidade Telegram</a></div>
          </div>
          <div className="radar-responsible"><b>18+ | Proibido para menores de 18 anos · Jogue com responsabilidade</b><span>Aplicam-se termos e condições. Aposta não é investimento.</span></div>
        </div>
        <div className="radar-footer-bottom"><span>© 2026 Radar Jogo a Jogo. Todos os direitos reservados.</span><span>Powered by Jogo a Jogo</span></div>
      </footer>
    </main>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description?: string }) {
  return <div className="radar-heading"><span className="radar-eyebrow">{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}
