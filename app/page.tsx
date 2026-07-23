"use client";

import { useMemo, useState } from "react";

type Operator = {
  name: string;
  key: string;
  color: string;
  cnpj: string;
  portaria: string;
  odds: [number, number, number];
  score: string;
};

const operators: Operator[] = [
  {
    name: "Superbet",
    key: "superbet",
    color: "#ec1b24",
    cnpj: "54.071.596/0001-40",
    portaria: "SPA/MF nº 2.090/2024",
    odds: [1.62, 4.2, 5.8],
    score: "4,8",
  },
  {
    name: "bet365",
    key: "bet365",
    color: "#007b5b",
    cnpj: "47.123.407/0001-70",
    portaria: "SPA/MF nº 250/2025",
    odds: [1.6, 4.33, 6.0],
    score: "4,7",
  },
  {
    name: "Betano",
    key: "betano",
    color: "#f36c21",
    cnpj: "46.786.961/0001-74",
    portaria: "SPA/MF nº 246/2025",
    odds: [1.65, 4.1, 5.75],
    score: "4,8",
  },
];

const matches = [
  { league: "Brasileirão Série A", home: "Corinthians", away: "Remo", time: "Hoje • 22:30", homeCode: "COR", awayCode: "REM", odds: [1.52, 4.1, 6.9] },
  { league: "Brasileirão Série A", home: "Flamengo", away: "Palmeiras", time: "Amanhã • 19:00", homeCode: "FLA", awayCode: "PAL", odds: [2.15, 3.25, 3.4] },
  { league: "Copa do Mundo", home: "Brasil", away: "Marrocos", time: "Sáb • 16:00", homeCode: "BRA", awayCode: "MAR", odds: [1.72, 3.7, 5.1] },
];

const leagues = [
  ["BR", "Brasileirão Série A", "10 jogos"],
  ["CM", "Copa do Mundo", "8 jogos"],
  ["CL", "Libertadores", "6 jogos"],
  ["PL", "Premier League", "7 jogos"],
  ["CH", "Champions League", "4 jogos"],
];

const trendData = [
  { label: "09h", value: 42 },
  { label: "11h", value: 54 },
  { label: "13h", value: 47 },
  { label: "15h", value: 67 },
  { label: "17h", value: 74 },
  { label: "Agora", value: 86 },
];

function TeamMark({ code, dark = false }: { code: string; dark?: boolean }) {
  return <span className={`team-mark ${dark ? "dark" : ""}`}>{code}</span>;
}

function OperatorLogo({ item }: { item: Operator }) {
  return (
    <span className={`operator-logo ${item.key}`} style={{ "--operator": item.color } as React.CSSProperties}>
      {item.name}
    </span>
  );
}

export default function Home() {
  const [market, setMarket] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState(0);
  const [stake, setStake] = useState(50);
  const [slipOpen, setSlipOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const bestOdd = useMemo(
    () => Math.max(...operators.map((operator) => operator.odds[market])),
    [market],
  );
  const possibleReturn = (stake * bestOdd).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const pickOdd = (index: number) => {
    setMarket(index);
    setSlipOpen(true);
  };

  return (
    <main>
      <div className="legal-rail">
        <strong>18+</strong>
        <span>MINISTÉRIO DA FAZENDA ADVERTE: APOSTA NÃO É INVESTIMENTO</span>
        <span className="legal-wide">• Jogue com responsabilidade • Odds e dados ilustrativos neste protótipo</span>
      </div>
      <div className="regulatory-dock" aria-label="Identificação dos operadores exibidos">
        <strong>OPERADORES EXIBIDOS</strong>
        <span>Superbet — CNPJ 54.071.596/0001-40 · SPA/MF 2.090/2024</span>
        <span>bet365 — CNPJ 47.123.407/0001-70 · SPA/MF 250/2025</span>
        <span>Betano — CNPJ 46.786.961/0001-74 · SPA/MF 246/2025</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Jogo a Jogo — início">
          <span>JOGO</span><i>A</i><span>JOGO</span>
        </a>
        <nav className={mobileMenu ? "open" : ""}>
          <a href="#jogos">Jogos</a>
          <a href="#comparador">Comparador</a>
          <a href="#tendencias">Tendências</a>
          <a href="#operadores">Operadores</a>
          <a href="#responsavel">Jogo responsável</a>
        </nav>
        <button className="menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Abrir menu">☰</button>
        <button className="header-cta" onClick={() => document.querySelector("#comparador")?.scrollIntoView({ behavior: "smooth" })}>
          Comparar odds
        </button>
      </header>

      <section className="hero" id="top">
        <div className="pitch-lines" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <span className="eyebrow light">DADOS, CONTEXTO, MELHORES ESCOLHAS</span>
          <h1>O jogo começa<br />antes do apito.</h1>
          <p>Compare odds em tempo real, entenda o movimento do mercado e encontre operadores autorizados — tudo em um só lugar.</p>
          <div className="hero-actions">
            <a className="button primary" href="#jogos">Ver jogos de hoje <span>↘</span></a>
            <a className="button ghost" href="#como-funciona">Como funciona</a>
          </div>
          <div className="hero-stats">
            <div><strong>38</strong><span>jogos hoje</span></div>
            <div><strong>3</strong><span>operadores comparados</span></div>
            <div><strong>2 min</strong><span>atualização das odds</span></div>
          </div>
        </div>
        <div className="live-panel">
          <div className="live-head"><span><i /> AO VIVO</span><small>Odds atualizadas agora</small></div>
          <div className="live-match">
            <div className="club"><TeamMark code="FLA" dark /><span>Flamengo</span></div>
            <strong className="score">1 <em>68&apos;</em> 1</strong>
            <div className="club"><TeamMark code="PAL" dark /><span>Palmeiras</span></div>
          </div>
          <div className="live-odds">
            <button onClick={() => pickOdd(0)}><span>Casa</span><strong>2.75</strong></button>
            <button onClick={() => pickOdd(1)}><span>Empate</span><strong>2.20</strong></button>
            <button onClick={() => pickOdd(2)}><span>Fora</span><strong>3.80</strong></button>
          </div>
          <p className="mini-warning">18+ • Apostar pode causar dependência.</p>
        </div>
      </section>

      <section className="quick-nav">
        {leagues.map(([code, name, count]) => (
          <button key={name}>
            <span>{code}</span>
            <span><strong>{name}</strong><small>{count}</small></span>
            <b>›</b>
          </button>
        ))}
      </section>

      <section className="section games-section" id="jogos">
        <div className="section-heading">
          <div>
            <span className="eyebrow">PLACAR E MERCADO</span>
            <h2>Jogos em destaque</h2>
          </div>
          <div className="date-switch"><button>‹</button><span>Hoje, 23 jul</span><button>›</button></div>
        </div>
        <div className="games-grid">
          {matches.map((match, index) => (
            <article className={`match-card ${selectedMatch === index ? "selected" : ""}`} key={`${match.home}-${match.away}`}>
              <div className="match-top">
                <span>{match.league}</span><small>{match.time}</small>
              </div>
              <div className="match-clubs">
                <div><TeamMark code={match.homeCode} /><strong>{match.home}</strong></div>
                <span>VS</span>
                <div><TeamMark code={match.awayCode} /><strong>{match.away}</strong></div>
              </div>
              <div className="three-odds">
                {match.odds.map((odd, oddIndex) => (
                  <button key={oddIndex} onClick={() => { setSelectedMatch(index); pickOdd(oddIndex); }}>
                    <small>{["1", "X", "2"][oddIndex]}</small><strong>{odd.toFixed(2)}</strong>
                  </button>
                ))}
              </div>
              <button className="compare-link" onClick={() => { setSelectedMatch(index); document.querySelector("#comparador")?.scrollIntoView({ behavior: "smooth" }); }}>
                Comparar todas as casas <span>→</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="comparator-wrap" id="comparador">
        <div className="section comparator">
          <div className="comparator-title">
            <div>
              <span className="eyebrow light">COMPARADOR JOGO A JOGO</span>
              <h2>Uma partida. Todas as odds.</h2>
            </div>
            <span className="update"><i /> Atualizado há 18s</span>
          </div>

          <div className="selected-game">
            <div><TeamMark code={matches[selectedMatch].homeCode} dark /><strong>{matches[selectedMatch].home}</strong></div>
            <span><small>{matches[selectedMatch].time}</small><b>×</b></span>
            <div><TeamMark code={matches[selectedMatch].awayCode} dark /><strong>{matches[selectedMatch].away}</strong></div>
          </div>

          <div className="market-tabs" role="tablist" aria-label="Mercado">
            {["Vitória casa · 1", "Empate · X", "Vitória fora · 2"].map((label, index) => (
              <button className={market === index ? "active" : ""} onClick={() => setMarket(index)} key={label}>{label}</button>
            ))}
          </div>

          <div className="operator-table">
            <div className="operator-row table-head">
              <span>Operador autorizado</span><span>Odd</span><span>Variação</span><span />
            </div>
            {[...operators].sort((a, b) => b.odds[market] - a.odds[market]).map((operator) => {
              const isBest = operator.odds[market] === bestOdd;
              return (
                <div className={`operator-row ${isBest ? "best" : ""}`} key={operator.name}>
                  <div className="operator-id">
                    <OperatorLogo item={operator} />
                    <span><strong>{operator.name}</strong><small>★ {operator.score} • verificado</small></span>
                  </div>
                  <div className="odd-value"><strong>{operator.odds[market].toFixed(2)}</strong>{isBest && <small>Melhor odd</small>}</div>
                  <span className="variation">↗ +{(1.2 + operator.odds[market] / 10).toFixed(1)}%</span>
                  <button className="bet-button" onClick={() => setSlipOpen(true)}>Ir para a casa ↗</button>
                  <div className="operator-legal">
                    <strong>18+</strong> Ministério da Fazenda adverte: Aposta não é investimento. • CNPJ {operator.cnpj} • {operator.portaria}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="method-note">Odds ilustrativas para validação do layout. Em produção, o feed deve registrar horário da última atualização, origem e condições do mercado.</p>
        </div>
      </section>

      <section className="section insight-grid" id="tendencias">
        <article className="trend-card">
          <span className="eyebrow">INTELIGÊNCIA DE MERCADO</span>
          <h2>Para onde a odd está indo?</h2>
          <p>Veja a pressão do mercado nas últimas horas antes de tomar uma decisão.</p>
          <div className="trend-legend"><span><i /> Vitória Corinthians</span><strong>1.52 <small>▼ 8,4%</small></strong></div>
          <div className="bar-chart">
            {trendData.map((item) => <div key={item.label}><span style={{ height: `${item.value}%` }} /><small>{item.label}</small></div>)}
          </div>
          <div className="insight"><b>↓</b><span><strong>Odd em queda</strong>Mais apostas estão entrando neste mercado. Compare antes do movimento fechar.</span></div>
        </article>
        <article className="calculator-card">
          <span className="eyebrow light">CALCULADORA RÁPIDA</span>
          <h2>Simule, antes de apostar.</h2>
          <p>A ferramenta calcula o retorno bruto possível — não é recomendação nem garantia de ganho.</p>
          <label>Valor da aposta
            <div className="input-wrap"><span>R$</span><input type="number" min="1" value={stake} onChange={(event) => setStake(Number(event.target.value))} /></div>
          </label>
          <label>Melhor odd encontrada
            <div className="calculated-odd">{bestOdd.toFixed(2)} <small>no comparador</small></div>
          </label>
          <div className="return-box"><span>Retorno bruto possível</span><strong>{possibleReturn}</strong><small>Lucro potencial: {(stake * bestOdd - stake).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</small></div>
          <button onClick={() => setSlipOpen(true)}>Adicionar ao cupom demonstrativo</button>
          <p className="mini-warning">18+ • Apostar pode causar dependência • Defina limites.</p>
        </article>
      </section>

      <section className="dark-band">
        <div className="section">
          <div className="section-heading light-heading">
            <div><span className="eyebrow light">LEITURA RÁPIDA</span><h2>O mercado, sem ruído.</h2></div>
            <p>Blocos curtos que o builder do iG pode receber via HTML e feed de dados.</p>
          </div>
          <div className="signal-grid">
            <article><span className="signal-icon">↘</span><small>ODD EM QUEDA</small><strong>Flamengo para vencer</strong><p>De 2.30 para 2.15 nas últimas 3 horas.</p><b>Alta movimentação</b></article>
            <article><span className="signal-icon">◎</span><small>MERCADO POPULAR</small><strong>Ambas marcam</strong><p>62% das seleções neste confronto estão neste mercado.</p><b>4 operadores</b></article>
            <article><span className="signal-icon">≋</span><small>DIVERGÊNCIA</small><strong>Diferença de 7,8%</strong><p>A maior distância entre casas está na vitória visitante.</p><b>Vale comparar</b></article>
          </div>
        </div>
      </section>

      <section className="section operators-section" id="operadores">
        <div className="section-heading">
          <div><span className="eyebrow">TRANSPARÊNCIA</span><h2>Operadores autorizados</h2></div>
          <a href="https://www.gov.br/fazenda/pt-br/composicao/orgaos/secretaria-de-premios-e-apostas" target="_blank" rel="noreferrer">Consultar lista oficial ↗</a>
        </div>
        <div className="review-grid">
          {operators.map((operator, index) => (
            <article key={operator.name}>
              <div className="review-head"><OperatorLogo item={operator} /><span>★ {operator.score}</span></div>
              <h3>{["Melhor variedade de mercados", "Experiência mais completa", "Navegação rápida e clara"][index]}</h3>
              <ul><li>Domínio oficial .bet.br</li><li>Dados regulatórios visíveis</li><li>Ferramentas de jogo responsável</li></ul>
              <div className="review-legal"><strong>CNPJ {operator.cnpj}</strong><span>Autorização {operator.portaria}</span></div>
              <button>Ver análise completa</button>
              <p>18+ • Ministério da Fazenda adverte: Apostar pode causar dependência.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="responsible" id="responsavel">
        <div className="responsible-copy">
          <span className="age-mark">18+</span>
          <div><span className="eyebrow light">JOGO RESPONSÁVEL</span><h2>Informação também é proteção.</h2><p>Apostas são entretenimento com risco financeiro. Nunca use dinheiro de gastos essenciais e não tente recuperar perdas.</p></div>
        </div>
        <div className="responsible-actions">
          <a href="https://www.gov.br/fazenda/pt-br/composicao/orgaos/secretaria-de-premios-e-apostas/jogo-responsavel" target="_blank" rel="noreferrer">Orientações oficiais ↗</a>
          <a href="https://www.gov.br/autoexclusaoapostas" target="_blank" rel="noreferrer">Autoexclusão centralizada ↗</a>
        </div>
      </section>

      <section className="section how" id="como-funciona">
        <span className="eyebrow">PROPOSTA PARA O BUILDER iG</span>
        <h2>Uma arquitetura simples de publicar.</h2>
        <div className="steps">
          <div><b>01</b><strong>Feed único</strong><p>Partidas, horários e odds entram por um JSON controlado.</p></div>
          <div><b>02</b><strong>Widgets modulares</strong><p>Cada seção funciona como bloco HTML independente no builder.</p></div>
          <div><b>03</b><strong>Camada legal</strong><p>Aviso fixo global e dados do operador acoplados a cada CTA.</p></div>
          <div><b>04</b><strong>Medição</strong><p>Cliques por jogo, mercado, operadora e posição do widget.</p></div>
        </div>
      </section>

      <footer>
        <div className="footer-top"><a className="brand" href="#top"><span>JOGO</span><i>A</i><span>JOGO</span></a><p>Odds, contexto e escolhas mais informadas.</p></div>
        <div className="footer-grid">
          <div><strong>Produto</strong><a href="#jogos">Jogos de hoje</a><a href="#comparador">Comparador</a><a href="#tendencias">Tendências</a></div>
          <div><strong>Confiança</strong><a href="#operadores">Operadores</a><a href="#responsavel">Jogo responsável</a><a href="https://www.gov.br/autoexclusaoapostas">Autoexclusão</a></div>
          <div><strong>Importante</strong><p>Este protótipo não recebe apostas. Odds exibidas são ilustrativas. Links externos devem apontar apenas para operadores autorizados.</p></div>
        </div>
        <div className="footer-warning"><b>18+</b><span><strong>MINISTÉRIO DA FAZENDA ADVERTE: APOSTAR PODE CAUSAR DEPENDÊNCIA.</strong> Aposta não é investimento. Jogue com responsabilidade.</span></div>
        <small>© 2026 Jogo a Jogo — protótipo de produto para validação interna.</small>
      </footer>

      <aside className={`bet-slip ${slipOpen ? "open" : ""}`} aria-live="polite">
        <button className="slip-close" onClick={() => setSlipOpen(false)}>×</button>
        <span className="eyebrow">CUPOM DEMONSTRATIVO</span>
        <strong>{matches[selectedMatch].home} × {matches[selectedMatch].away}</strong>
        <p>{["Vitória casa", "Empate", "Vitória fora"][market]} <b>{bestOdd.toFixed(2)}</b></p>
        <small>Não é possível apostar neste protótipo.</small>
        <button className="slip-action" onClick={() => document.querySelector("#comparador")?.scrollIntoView({ behavior: "smooth" })}>Ver comparação</button>
      </aside>
    </main>
  );
}
