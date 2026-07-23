"use client";

import { useMemo, useState } from "react";

type Operator = {
  name: string;
  key: string;
  cnpj: string;
  portaria: string;
  odds: [number, number, number];
  accent: string;
};

const operators: Operator[] = [
  { name: "7K", key: "seven", cnpj: "55.933.850/0001-34", portaria: "SPA/MF nº 322/2025", odds: [1.57, 4.15, 6.75], accent: "#f5a800" },
  { name: "Superbet", key: "superbet", cnpj: "54.071.596/0001-40", portaria: "SPA/MF nº 2.090/2024", odds: [1.59, 4.05, 6.8], accent: "#ed1c24" },
  { name: "Betnacional", key: "betnacional", cnpj: "55.056.104/0001-00", portaria: "SPA/MF nº 2.092/2024", odds: [1.6, 4.2, 6.7], accent: "#006f44" },
  { name: "bet365", key: "bet365", cnpj: "47.123.407/0001-70", portaria: "SPA/MF nº 250/2025", odds: [1.58, 4.1, 6.9], accent: "#087b5d" },
  { name: "Novibet", key: "novibet", cnpj: "50.587.712/0001-27", portaria: "SPA/MF nº 249/2025", odds: [1.62, 4.0, 6.65], accent: "#26348a" },
];

const picks = [
  { sport: "Futebol", league: "Brasileirão 2026", home: "Botafogo", away: "Vitória", homeCode: "BOT", awayCode: "VIT", time: "Hoje • 23:30", odds: [1.76, 3.7, 5.0], verified: "Botafogo / Empate", verifiedOdd: "1.15", operator: "Novibet" },
  { sport: "Futebol", league: "Brasileirão 2026", home: "Corinthians", away: "Remo", homeCode: "COR", awayCode: "REM", time: "Hoje • 23:30", odds: [1.52, 4.1, 6.9], verified: "Ambas marcam — Sim", verifiedOdd: "2.10", operator: "Novibet" },
  { sport: "Futebol", league: "Copa Sul-Americana", home: "Bolívar", away: "Grêmio", homeCode: "BOL", awayCode: "GRE", time: "Hoje • 23:00", odds: [1.73, 4.15, 5.4], verified: "Mais de 2,5 gols", verifiedOdd: "1.78", operator: "bet365" },
];

const legalText = (operator: Operator) =>
  `${operator.name} — CNPJ ${operator.cnpj} · ${operator.portaria}`;

function Team({ code, name }: { code: string; name: string }) {
  return <div className="team"><span>{code}</span><strong>{name}</strong></div>;
}

function OperatorName({ operator }: { operator: Operator }) {
  return <span className={`operator-name ${operator.key}`} style={{ "--accent": operator.accent } as React.CSSProperties}>{operator.name}</span>;
}

function CmsTag({ children }: { children: React.ReactNode }) {
  return <span className="cms-tag">{children}</span>;
}

export default function Home() {
  const [market, setMarket] = useState(0);
  const [stake, setStake] = useState(50);
  const [cmsMode, setCmsMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");

  const rankedOperators = useMemo(
    () => [...operators].sort((a, b) => b.odds[market] - a.odds[market]),
    [market],
  );
  const bestOdd = rankedOperators[0].odds[market];
  const possibleReturn = (stake * bestOdd).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const demonstrate = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <main className={cmsMode ? "cms-mode" : ""}>
      <div className="legal-top">
        <b>18+</b>
        <span>MINISTÉRIO DA FAZENDA ADVERTE: APOSTA NÃO É INVESTIMENTO</span>
        <span className="desktop-legal">• Jogue com responsabilidade</span>
      </div>

      <div className="ig-network">
        <div className="ig-network-inner">
          <a className="ig-mark" href="https://www.ig.com.br" aria-label="Portal iG">iG</a>
          <nav>
            <a href="#">último segundo</a><a href="#">economia</a><a href="#">gente</a><a href="#">esporte</a><a href="#">carros</a><a href="#">pets</a><a href="#">receitas</a>
          </nav>
          <span>Buscar</span>
        </div>
      </div>

      <header className="jj-header">
        <div className="jj-header-inner">
          <a href="#inicio"><img src="/jogoajogo-logo.png" alt="Jogo a Jogo" /></a>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
          <nav className={menuOpen ? "open" : ""}>
            <a href="#palpites">Palpites</a>
            <a href="#comparador">Odds</a>
            <a href="#operadores">Casas de apostas</a>
            <a href="#guias">Guia para apostas</a>
            <a href="#responsavel">Jogo responsável</a>
          </nav>
          <button className="cms-toggle" onClick={() => setCmsMode(!cmsMode)}>{cmsMode ? "Ocultar estrutura" : "Ver estrutura CMS"}</button>
        </div>
      </header>

      <div className="ad-space"><span>PUBLICIDADE</span><div>970 × 90</div></div>

      <section className="page-shell intro" id="inicio">
        <CmsTag>faixaLimpa · 12 colunas</CmsTag>
        <p className="breadcrumb">iG › Esporte › Jogo a Jogo</p>
        <h1>Dicas de apostas e melhores odds</h1>
        <p className="intro-copy">Compare as casas parceiras do Jogo a Jogo, veja os palpites do dia e encontre oportunidades em operadores autorizados.</p>
        <div className="partner-strip">
          {operators.map((operator) => <button key={operator.name} onClick={() => document.querySelector("#operadores")?.scrollIntoView({ behavior: "smooth" })}><OperatorName operator={operator} /></button>)}
        </div>
      </section>

      <section className="page-shell boost-section">
        <CmsTag>compHtml-multi-canais · 12 colunas</CmsTag>
        <div className="section-title">
          <div><span className="kicker">OFERTA EM DESTAQUE</span><h2>Odd turbinada Jogo a Jogo</h2></div>
          <small>Atualizado há 2 min</small>
        </div>
        <article className="boost-card">
          <div className="boost-operator">
            <OperatorName operator={operators[2]} />
            <span>BOOST EXCLUSIVO</span>
          </div>
          <div className="boost-match">
            <small>BRASILEIRÃO 2026</small>
            <strong>Corinthians x Remo</strong>
            <p>Corinthians vence + mais de 1,5 gols</p>
          </div>
          <div className="boost-price">
            <span>ODD ORIGINAL <s>2.30</s></span>
            <button onClick={() => demonstrate("Link demonstrativo para a Betnacional")}>ODD TURBINADA <b>2.70</b></button>
          </div>
          <div className="ad-warning">
            <b>18+</b><span>Ministério da Fazenda adverte: Aposta não é investimento.</span>
          </div>
          <p className="operator-disclosure">NSX Brasil S.A. · CNPJ 55.056.104/0001-00 · Portaria SPA/MF nº 2.092/2024 · Aplicam-se termos e condições.</p>
        </article>
      </section>

      <section className="page-shell" id="palpites">
        <CmsTag>faixa · 3 × col-sm-4</CmsTag>
        <div className="section-title">
          <div><span className="kicker">JOGOS DE HOJE</span><h2>Palpites</h2></div>
          <a href="#">Ver todos</a>
        </div>
        <div className="filter-row">
          <button className="active">Todos</button><button>Futebol</button><button>Brasileirão</button><button>Copa do Mundo</button>
        </div>
        <div className="picks-grid">
          {picks.map((pick) => (
            <article className="pick-card" key={`${pick.home}-${pick.away}`}>
              <div className="pick-meta"><span>{pick.sport}</span><small>{pick.league}</small></div>
              <div className="pick-match">
                <Team code={pick.homeCode} name={pick.home} />
                <div><small>{pick.time}</small><b>VS</b></div>
                <Team code={pick.awayCode} name={pick.away} />
              </div>
              <div className="pick-odds">
                {pick.odds.map((odd, index) => <button key={index} onClick={() => setMarket(index)}><span>{["1", "X", "2"][index]}</span><b>{odd.toFixed(2)}</b></button>)}
              </div>
              <div className="verified-pick">
                <span>✓ ODD VERIFICADA</span>
                <strong>{pick.operator}</strong>
                <p>{pick.verified} <b>{pick.verifiedOdd}</b></p>
              </div>
              <button className="pick-cta" onClick={() => demonstrate("Palpite aberto no protótipo")}>Ver palpite</button>
              <p className="card-legal">18+ • Ministério da Fazenda adverte: Aposta não é investimento.</p>
            </article>
          ))}
        </div>
      </section>

      <div className="ad-space compact"><span>PUBLICIDADE</span><div>728 × 90</div></div>

      <section className="page-shell comparator-section" id="comparador">
        <CmsTag>componenteAjax · 12 colunas</CmsTag>
        <div className="section-title">
          <div><span className="kicker">WIDGET AJAX</span><h2>Compare as odds</h2></div>
          <small><i /> Atualização automática</small>
        </div>
        <div className="event-summary">
          <Team code="COR" name="Corinthians" /><div><span>HOJE • 23:30</span><b>×</b><small>Brasileirão Série A</small></div><Team code="REM" name="Remo" />
        </div>
        <div className="market-switch">
          {["Vitória Corinthians · 1", "Empate · X", "Vitória Remo · 2"].map((item, index) => <button className={market === index ? "active" : ""} onClick={() => setMarket(index)} key={item}>{item}</button>)}
        </div>
        <div className="odds-table">
          <div className="odds-head"><span>Casa de apostas</span><span>Odd</span><span>Retorno estimado</span><span /></div>
          {rankedOperators.map((operator, index) => (
            <div className="odds-row" key={operator.name}>
              <div><OperatorName operator={operator} /><small>{index === 0 ? "Melhor odd" : "Operador autorizado"}</small></div>
              <strong>{operator.odds[market].toFixed(2)}</strong>
              <span>{(100 * operator.odds[market]).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
              <button onClick={() => demonstrate(`Link demonstrativo para ${operator.name}`)}>Apostar ↗</button>
              <p><b>18+</b> Ministério da Fazenda adverte: Aposta não é investimento. • {legalText(operator)}</p>
            </div>
          ))}
        </div>
        <p className="data-note">Odds ilustrativas. Em produção, este bloco pode ser alimentado pelo componenteAjax do publicador, sem alterar a estrutura da home.</p>
      </section>

      <section className="page-shell split-widgets">
        <CmsTag>faixa · 2 × col-sm-6</CmsTag>
        <article className="calculator">
          <span className="kicker">FERRAMENTA</span><h2>Calculadora de retorno</h2>
          <label>Valor da aposta<div><span>R$</span><input type="number" min="1" value={stake} onChange={(event) => setStake(Number(event.target.value))} /></div></label>
          <label>Melhor odd<div className="fixed-value">{bestOdd.toFixed(2)}</div></label>
          <p><span>Retorno bruto possível</span><strong>{possibleReturn}</strong></p>
          <small>Simulação informativa. Não representa garantia de ganho.</small>
        </article>
        <article className="trend-widget">
          <span className="kicker">MOVIMENTO DO MERCADO</span><h2>Odds em alta e queda</h2>
          <div className="trend-row"><span>Corinthians vence</span><b>1.52</b><em>▼ 6,2%</em></div>
          <div className="trend-row"><span>Ambas marcam</span><b>2.10</b><em className="up">▲ 3,8%</em></div>
          <div className="trend-row"><span>Mais de 2,5 gols</span><b>1.78</b><em>▼ 2,1%</em></div>
          <p>Variação baseada nas últimas atualizações do feed. Movimento de odd não é recomendação de aposta.</p>
        </article>
      </section>

      <section className="guides-band" id="guias">
        <div className="page-shell">
          <CmsTag>faixaTemas · 3 × col-sm-4</CmsTag>
          <div className="section-title"><div><span className="kicker">CONTEÚDO DE SERVIÇO</span><h2>Guia para apostas</h2></div><a href="#">Ver todos</a></div>
          <div className="guide-grid">
            <article><span>01</span><small>GUIA</small><h3>Como comparar odds entre diferentes casas</h3><a href="#">Ler guia →</a></article>
            <article><span>02</span><small>EXPLICADOR</small><h3>O que significa 1, X e 2 nas apostas</h3><a href="#">Ler guia →</a></article>
            <article><span>03</span><small>JOGO RESPONSÁVEL</small><h3>Como definir limites antes de começar</h3><a href="#">Ler guia →</a></article>
          </div>
        </div>
      </section>

      <section className="page-shell operators" id="operadores">
        <CmsTag>componenteAjax-cupom · 5 cards</CmsTag>
        <div className="section-title"><div><span className="kicker">PARCEIROS CONTRATADOS</span><h2>Casas de apostas</h2></div></div>
        <div className="operator-grid">
          {operators.map((operator) => (
            <article key={operator.name}>
              <OperatorName operator={operator} />
              <span className="authorized">✓ Autorizada</span>
              <p><strong>CNPJ</strong>{operator.cnpj}</p>
              <p><strong>Autorização</strong>{operator.portaria}</p>
              <button onClick={() => demonstrate(`Review de ${operator.name}`)}>Ver análise</button>
              <small>18+ • Apostar pode causar dependência.</small>
            </article>
          ))}
        </div>
      </section>

      <section className="responsible" id="responsavel">
        <div className="page-shell responsible-inner">
          <b>18+</b>
          <div><span className="kicker">JOGO RESPONSÁVEL</span><h2>Aposta é entretenimento, não investimento.</h2><p>Não use dinheiro de gastos essenciais e nunca tente recuperar perdas. Se precisar, utilize a plataforma centralizada de autoexclusão.</p></div>
          <a href="https://www.gov.br/autoexclusaoapostas" target="_blank" rel="noreferrer">Acessar autoexclusão ↗</a>
        </div>
      </section>

      <footer>
        <div className="page-shell footer-inner">
          <img src="/jogoajogo-logo.png" alt="Jogo a Jogo" />
          <div><strong>Produto</strong><a href="#palpites">Palpites</a><a href="#comparador">Comparador</a><a href="#operadores">Casas parceiras</a></div>
          <div><strong>Informação</strong><a href="#guias">Guia para apostas</a><a href="#responsavel">Jogo responsável</a></div>
          <p>Protótipo para validação interna. Odds ilustrativas e nenhum fluxo realiza apostas.</p>
        </div>
      </footer>

      <div className="regulatory-dock">
        <strong>18+ • OPERADORES EXIBIDOS</strong>
        {operators.map((operator) => <span key={operator.name}>{operator.name}: CNPJ {operator.cnpj} · {operator.portaria}</span>)}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
