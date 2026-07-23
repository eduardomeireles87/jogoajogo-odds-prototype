"use client";

import { useMemo, useState } from "react";
import IgHeader from "./components/IgHeader";
import OddsAssistant from "./components/OddsAssistant";

type Operator = {
  name: string;
  legalName: string;
  key: string;
  logo: string;
  surface: string;
  cnpj: string;
  portaria: string;
  odds: [number, number, number];
};

const operators: Operator[] = [
  { name: "7K", legalName: "ANA Gaming Brasil S.A.", key: "seven", logo: "7kbet.svg", surface: "#171b18", cnpj: "55.933.850/0001-34", portaria: "SPA/MF nº 322, de 17/02/2025", odds: [1.57, 4.15, 6.75] },
  { name: "bet365", legalName: "HS do Brasil Ltda.", key: "bet365", logo: "bet365.webp", surface: "#087b5d", cnpj: "47.123.407/0001-70", portaria: "SPA/MF nº 250, de 07/02/2025", odds: [1.58, 4.1, 6.9] },
  { name: "Superbet", legalName: "SPRBT Interactive Brasil Ltda.", key: "superbet", logo: "superbet.webp", surface: "#ed1c24", cnpj: "54.071.596/0001-40", portaria: "SPA/MF nº 2.090, de 30/12/2024", odds: [1.59, 4.05, 6.8] },
  { name: "Betnacional", legalName: "NSX Brasil S.A.", key: "betnacional", logo: "betnacional.webp", surface: "#006f44", cnpj: "55.056.104/0001-00", portaria: "SPA/MF nº 2.092, de 30/12/2024", odds: [1.6, 4.2, 6.7] },
  { name: "Novibet", legalName: "NVBT Gaming Ltda.", key: "novibet", logo: "novibet.webp", surface: "#26348a", cnpj: "50.587.712/0001-27", portaria: "SPA/MF nº 249, de 07/02/2025", odds: [1.62, 4.0, 6.65] },
];

const picks = [
  { sport: "Futebol", league: "Brasileirão 2026", home: "Botafogo", away: "Vitória", homeCode: "BOT", awayCode: "VIT", time: "Hoje • 23:30", odds: [1.76, 3.7, 5.0], verified: "Botafogo / Empate", verifiedOdd: "1.15", operator: "Novibet" },
  { sport: "Futebol", league: "Brasileirão 2026", home: "Corinthians", away: "Remo", homeCode: "COR", awayCode: "REM", time: "Hoje • 23:30", odds: [1.52, 4.1, 6.9], verified: "Ambas marcam — Sim", verifiedOdd: "2.10", operator: "Novibet" },
  { sport: "Futebol", league: "Copa Sul-Americana", home: "Bolívar", away: "Grêmio", homeCode: "BOL", awayCode: "GRE", time: "Hoje • 23:00", odds: [1.73, 4.15, 5.4], verified: "Mais de 2,5 gols", verifiedOdd: "1.78", operator: "bet365" },
];

const dailyTickets = [
  {
    badge: "ODD 3+",
    league: "BRASILEIRÃO 2026",
    match: "Corinthians x Remo + Botafogo x Vitória",
    selection: "Corinthians vence + Botafogo ou empate",
    odd: "3.25",
    profile: "MAIOR RETORNO",
  },
  {
    badge: "ODD EQUILIBRADA",
    league: "BRASILEIRÃO 2026",
    match: "Corinthians x Remo",
    selection: "Mais de 1,5 gols na partida",
    odd: "1.72",
    profile: "ESCOLHA DO DIA",
  },
];

const agendaFixtures = [
  { league: "Copa Sul-Americana 2026", time: "23:00 · 23/07", home: "BOL", away: "GRE", odds: ["1.62", "4.10", "5.55"], status: "PRÉ-JOGO" },
  { league: "Brasileirão Série A 2026", time: "23:30 · 23/07", home: "COR", away: "REM", odds: ["1.58", "4.10", "6.90"], status: "PRÉ-JOGO", href: "jogo/corinthians-remo/" },
  { league: "Brasileirão Série A 2026", time: "23:30 · 23/07", home: "BOT", away: "VIT", odds: ["1.76", "3.68", "5.00"], status: "PRÉ-JOGO" },
  { league: "Copa Sul-Americana 2026", time: "01:30 · 24/07", home: "BOC", away: "OHI", odds: ["1.47", "4.30", "7.10"], status: "EM BREVE" },
];

const championships = [
  {
    name: "Brasileirão Série A",
    games: [
      { name: "Corinthians x Remo", odds: [[1.57, 4.15, 6.75], [1.58, 4.1, 6.9], [1.59, 4.05, 6.8], [1.6, 4.2, 6.7], [1.62, 4.0, 6.65]] },
      { name: "Botafogo x Vitória", odds: [[1.74, 3.72, 5.1], [1.76, 3.68, 5.0], [1.73, 3.75, 5.2], [1.75, 3.7, 5.15], [1.78, 3.65, 5.05]] },
    ],
  },
  {
    name: "Brasileirão Série B",
    games: [
      { name: "Athletic x São Bernardo", odds: [[2.2, 3.05, 3.25], [2.18, 3.1, 3.3], [2.22, 3.0, 3.28], [2.16, 3.12, 3.35], [2.24, 3.08, 3.2]] },
      { name: "Cuiabá x Atlético-GO", odds: [[2.05, 3.15, 3.55], [2.08, 3.1, 3.5], [2.02, 3.2, 3.62], [2.1, 3.08, 3.48], [2.06, 3.18, 3.58]] },
    ],
  },
  {
    name: "Copa Sul-Americana",
    games: [
      { name: "Bolívar x Grêmio", odds: [[1.72, 4.1, 5.45], [1.73, 4.15, 5.4], [1.7, 4.2, 5.5], [1.75, 4.05, 5.35], [1.74, 4.12, 5.42]] },
      { name: "Boca Juniors x O'Higgins", odds: [[1.45, 4.35, 7.2], [1.47, 4.3, 7.1], [1.46, 4.4, 7.0], [1.48, 4.25, 7.15], [1.44, 4.45, 7.25]] },
    ],
  },
];

const latestNews = [
  {
    category: "PROGRAMAÇÃO",
    title: "Futebol na TV: Grêmio e Corinthians entre os destaques do dia",
    description: "Equipes brasileiras têm compromissos pela Série A e pela Copa Sul-Americana; saiba onde assistir aos duelos.",
    image: "https://i0.statig.com.br/bancodeimagens/4q/75/50/4q7550plbwkhyqpg8iixik9bo.jpg",
    href: "https://esporte.ig.com.br/jogoajogo/2026-07-23/futebol-na-tv-quinta-feira-programacao-brasileirao-liga-europa-corinthians-gremio-onde-assistir.html",
    time: "HÁ 20 MINUTOS",
  },
  {
    category: "BRASILEIRÃO",
    title: "Corinthians tenta se aproximar do G-4 contra o ameaçado Remo",
    description: "Timão quer vencer de olho na zona da Libertadores, enquanto o Leão Azul luta para sair do Z-4.",
    image: "https://i0.statig.com.br/bancodeimagens/71/o0/c0/71o0c0vchrh6cba9voi511v89.jpg",
    href: "https://esporte.ig.com.br/jogoajogo/2026-07-23/corinthians-remo-brasileirao-19-rodada-prognostico-onde-assistir.html",
    time: "HÁ 14 HORAS",
  },
  {
    category: "BRASILEIRÃO",
    title: "Botafogo e Vitória se enfrentam em duelo atrasado da 4ª rodada",
    description: "Equipes fazem confronto direto para se aproximar do G-4 do Brasileirão.",
    image: "https://i0.statig.com.br/bancodeimagens/1e/ls/pg/1elspg14mqevimbhhzg6zot2s.jpg",
    href: "https://esporte.ig.com.br/jogoajogo/2026-07-22/botafogo-vitoria-brasileirao-4-rodada-prognostico-onde-assistir.html",
    time: "22/07/2026 · 23:48",
  },
  {
    category: "TRANSFERÊNCIAS",
    title: "Transfer Ban: os 3 clubes brasileiros impedidos de contratar",
    description: "São Paulo, Corinthians e Santos entraram na janela sem poder inscrever novos jogadores.",
    image: "https://i0.statig.com.br/bancodeimagens/48/c9/27/48c92752b8kk3crx6lamhjg5s.jpg",
    href: "https://esporte.ig.com.br/jogoajogo/2026-07-22/transfer-ban-3-clubes-brasileiros-impedidos-contratar-sao-paulo-corinthians-santos.html",
    time: "22/07/2026 · 18:10",
  },
];

const mostRead = [
  "Futebol na TV: veja os jogos de hoje e onde assistir",
  "Corinthians x Remo: horário, odds e transmissão",
  "Brasileirão Série A: classificação e próximos jogos",
  "Bolívar x Grêmio: dados do pré-jogo",
  "Compare as odds dos jogos desta rodada",
];

const bettingGuides = [
  {
    category: "OFERTAS",
    title: 'Inglaterra x Argentina: duelo tem "Tá Pago" e "Aposta Sem Risco"',
    image: "https://i0.statig.com.br/bancodeimagens/77/8y/qm/778yqm20gb2lwr03wbl8xo265.jpg",
    href: "https://esporte.ig.com.br/jogoajogo/2026-07-15/copa-do-mundo-semifinal-inglaterra-argentina-superbet-ofertas-ta-pago-aposta-sem-risco.html",
  },
  {
    category: "OFERTA",
    title: "bet365 lança o Desafio de 6 Placares para o Brasileirão",
    image: "https://i0.statig.com.br/bancodeimagens/28/g5/le/28g5lev2ujmnl3ssailqtjmvq.jpg",
    href: "https://esporte.ig.com.br/jogoajogo/2026-07-15/brasileirao-serie-a-bet365-desafio-6-placares-acerto-premios-dinheiro-creditos-apostas.html",
  },
  {
    category: "COPA 2026",
    title: "França x Marrocos: prognóstico da luta por vaga na semifinal",
    image: "https://i0.statig.com.br/bancodeimagens/9x/ux/t7/9xuxt76b1d2x83lxzymogkmlq.jpg",
    href: "https://esporte.ig.com.br/jogoajogo/2026-07-09/franca-marrrocos-copa-do-mundo-2026-quartas-de-final-dica-gol-prognostico.html",
  },
  {
    category: "COPA 2026",
    title: "França x Marrocos: revanche terá Segunda Chance da Betnacional",
    image: "https://i0.statig.com.br/bancodeimagens/ct/83/o1/ct83o1cvyo89xov75h2sl4x7s.jpg",
    href: "https://esporte.ig.com.br/jogoajogo/2026-07-08/franca-marrocos-copa-do-mundo-2026-quartas-de-final-apostas-esportivas-ofertas.html",
  },
];

const legalText = (operator: Operator) =>
  `${operator.legalName} — CNPJ ${operator.cnpj} · ${operator.portaria}`;

const igChannels = [
  ["Home", "https://www.ig.com.br/"],
  ["Último Segundo", "https://ultimosegundo.ig.com.br/"],
  ["Economia", "https://economia.ig.com.br/"],
  ["Gente", "https://gente.ig.com.br/"],
  ["Esporte", "https://esporte.ig.com.br/"],
  ["Carros", "https://carros.ig.com.br/"],
  ["Delas", "https://delas.ig.com.br/"],
  ["Deles", "https://deles.ig.com.br/"],
  ["Saúde", "https://saude.ig.com.br/"],
  ["Queer", "https://queer.ig.com.br/"],
  ["Canal do Pet", "https://canaldopet.ig.com.br/"],
  ["Receitas", "https://receitas.ig.com.br/"],
  ["Turismo", "https://turismo.ig.com.br/"],
  ["Tecnologia", "https://tecnologia.ig.com.br/"],
  ["iG Mais", "https://igmais.ig.com.br"],
];

const igCorporateLinks = [
  ["Anuncie", "https://centraldoanunciante.ig.com.br/"],
  ["Política de privacidade", "https://institucional.ig.com.br/2020-11-05/politica-de-privacidade-ig.html"],
  ["Termos de Uso", "https://institucional.ig.com.br/2020-11-05/termos-de-uso.html"],
  ["Institucional", "https://institucional.ig.com.br/"],
  ["Quem Somos", "https://institucional.ig.com.br/2021-07-13/quem-somos--visao--missao-e-valores.html"],
  ["Fale Conosco", "https://igcorp.octadesk.com/kb/"],
  ["E-mail iG", "https://vendas-mail.ig.com.br/"],
  ["Suporte e-mail", "https://igcorp.octadesk.com/helpcenter/new-ticket/"],
];

const igSocials = [
  ["Facebook", "https://www.facebook.com/ig", "0 0 9 16", "M6.808 2.656h1.504V.112A21.2 21.2 0 0 0 6.12 0C3.944 0 2.456 1.328 2.456 3.76v2.096H0v2.848h2.456V16H5.4V8.704h2.448l.368-2.848H5.4V4.04c0-.84.224-1.384 1.408-1.384Z"],
  ["X", "https://x.com/iG", "0 0 14 14", "M8.332 5.928 13.544 0h-1.235L7.783 5.147 4.169 0H0l5.466 7.784L0 14h1.235l4.779-5.436L9.831 14H14L8.332 5.928ZM6.64 7.852.086 7.077 1.68.91h1.897l3.556 4.977.554.775 4.622 6.47h-1.897L6.64 7.852Z"],
  ["Instagram", "https://www.instagram.com/portal_ig/", "0 0 18 17", "M12.723.19H5.287a4.34 4.34 0 0 0-4.337 4.337v7.435a4.34 4.34 0 0 0 4.337 4.338h7.436a4.34 4.34 0 0 0 4.337-4.338V4.527A4.34 4.34 0 0 0 12.723.19ZM9.005 11.962a3.718 3.718 0 1 1 0-7.435 3.718 3.718 0 0 1 0 7.435Zm4.647-7.435a.929.929 0 1 1 0-1.858.929.929 0 0 1 0 1.858Zm-2.169 3.718a2.478 2.478 0 1 1-4.956 0 2.478 2.478 0 0 1 4.956 0Z"],
  ["LinkedIn", "https://www.linkedin.com/company/portalig/", "0 0 15 15", "M3.148 1.575a1.574 1.574 0 1 1-3.148 0 1.574 1.574 0 0 1 3.148 0Zm.047 2.738H.047v9.854h3.148V4.313Zm4.974 0H5.037v9.854h3.1V8.996c0-2.88 3.754-3.148 3.754 0v5.171H15V7.926c0-4.856-5.556-4.675-6.863-2.29l.032-1.323Z"],
  ["TikTok", "https://www.tiktok.com/@portal_ig?lang=pt-BR", "0 0 16 19", "M12.699 2.929A4.42 4.42 0 0 1 11.617.05H8.463v12.659a2.645 2.645 0 0 1-2.644 2.552 2.66 2.66 0 0 1-2.654-2.654c0-1.756 1.694-3.073 3.44-2.532V6.849C3.083 6.38 0 9.116 0 12.607c0 3.399 2.818 5.819 5.809 5.819a5.81 5.81 0 0 0 5.808-5.819V6.186a7.594 7.594 0 0 0 4.39 1.409V4.44s-1.92.092-3.308-1.511Z"],
  ["Spotify", "https://open.spotify.com/show/3c9woJ6Tzx3JiRFoUp8Mrl", "0 0 24 24", "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm5.78 17.602a.75.75 0 0 1-1.06.218c-2.43-1.488-5.48-1.83-9.088-1.012a.75.75 0 0 1-.362-1.452c3.938-.89 7.356-.473 10.125 1.236a.75.75 0 0 1-.615 1.01Zm.99-2.584a.938.938 0 0 1-1.325.271c-2.7-1.656-6.8-2.136-10.05-.95a.938.938 0 0 1-.453-1.808c3.738-1.332 8.356-.78 11.45 1.15a.938.938 0 0 1-.622 1.337Zm.108-2.823c-3.228-1.889-8.52-2.12-11.756-1.176a1.124 1.124 0 1 1-.54-2.164c3.7-1.08 9.55-.805 13.35 1.43a1.125 1.125 0 0 1-.72 2.056l-.334-.14Z"],
  ["YouTube", "https://www.youtube.com/ig", "0 0 19 15", "M9.487.291c.494.003 1.732.014 3.047.064l.466.019c1.324.058 2.646.159 3.303.33.875.23 1.562.903 1.795 1.755.37 1.354.416 3.995.422 4.635v.283c-.006.64-.052 3.282-.422 4.636-.236.855-.924 1.528-1.795 1.756-.657.17-1.98.271-3.303.33l-.466.019c-1.315.049-2.553.061-3.047.063h-.454c-1.046-.005-5.423-.05-6.816-.412-.874-.231-1.562-.903-1.795-1.756C.052 10.66.006 8.017 0 7.377v-.283c.006-.64.052-3.281.422-4.635C.658 1.604 1.346.931 2.218.705 3.61.341 7.988.297 9.034.291h.453ZM7.408 4.198v6.078l5.556-3.039-5.556-3.039Z"],
  ["Telegram", "https://t.me/portalig", "0 0 24 24", "M22 2 11 13h11V2ZM2 10.5 22 2l-8.5 20-3.5-8L2 10.5Z"],
];

function Team({ code, name }: { code: string; name: string }) {
  return <div className="team"><span>{code}</span><strong>{name}</strong></div>;
}

function OperatorLogo({ operator }: { operator: Operator }) {
  return (
    <span className={`operator-logo ${operator.key}`} style={{ "--surface": operator.surface } as React.CSSProperties}>
      <img src={`operators/${operator.logo}`} alt={operator.name} />
    </span>
  );
}

function CmsTag({ children }: { children: React.ReactNode }) {
  return <span className="cms-tag">{children}</span>;
}

export default function Home() {
  const [market, setMarket] = useState(0);
  const [stake, setStake] = useState(50);
  const [cmsMode, setCmsMode] = useState(false);
  const [toast, setToast] = useState("");
  const [championshipIndex, setChampionshipIndex] = useState(0);
  const [fixtureIndex, setFixtureIndex] = useState(0);

  const rankedOperators = useMemo(
    () => [...operators].sort((a, b) => b.odds[market] - a.odds[market]),
    [market],
  );
  const bestOdd = rankedOperators[0].odds[market];
  const possibleReturn = (stake * bestOdd).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const selectedChampionship = championships[championshipIndex];
  const selectedFixture = selectedChampionship.games[fixtureIndex];
  const bestFixtureOdds = [0, 1, 2].map((column) => Math.max(...selectedFixture.odds.map((row) => row[column])));

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

      <IgHeader onCmsToggle={() => setCmsMode(!cmsMode)} cmsMode={cmsMode} />

      <div className="ad-space"><span>PUBLICIDADE</span><div>970 × 90</div></div>

      <section className="agenda-module">
        <div className="agenda-inner">
          <div className="agenda-sidebar">
            <h2>Agenda</h2>
            <select aria-label="Período dos jogos"><option>Próximos jogos</option><option>Ao vivo</option><option>Encerrados</option></select>
            <button>Todos os jogos</button>
          </div>
          <div className="agenda-content">
            <div className="agenda-track">
              {agendaFixtures.map((fixture) => (
                <a className="agenda-card" href={fixture.href || "#comparador"} key={`${fixture.home}-${fixture.away}`}>
                  <div><strong>{fixture.league}</strong><span>{fixture.time}</span></div>
                  <div className="agenda-teams"><b>{fixture.home}</b><span>×</span><b>{fixture.away}</b></div>
                  <div className="agenda-odds">
                    {fixture.odds.map((odd, index) => <span key={odd}><small>{["1", "X", "2"][index]}</small><b>{odd}</b></span>)}
                  </div>
                  <em>{fixture.status}</em>
                </a>
              ))}
            </div>
            <p className="agenda-legal"><b>18+</b> Ministério da Fazenda adverte: Aposta não é investimento.</p>
          </div>
        </div>
      </section>

      <section className="page-shell intro" id="inicio">
        <CmsTag>faixaLimpa · 12 colunas</CmsTag>
        <p className="breadcrumb">iG › Esporte › Jogo a Jogo</p>
        <h1>Dicas de apostas e melhores odds</h1>
        <p className="intro-copy">Compare as casas parceiras do Jogo a Jogo, veja os palpites do dia e encontre oportunidades em operadores autorizados.</p>
        <div className="partner-strip">
          {operators.map((operator) => <button key={operator.name} onClick={() => document.querySelector("#operadores")?.scrollIntoView({ behavior: "smooth" })}><OperatorLogo operator={operator} /></button>)}
        </div>
      </section>

      <section className="page-shell boost-section">
        <CmsTag>compHtml-multi-canais · 12 colunas</CmsTag>
        <div className="section-title">
          <div><span className="kicker">DUAS ESCOLHAS DIÁRIAS</span><h2>Bilhetes do dia</h2></div>
          <small>Atualizado há 2 min</small>
        </div>
        <div className="tickets-grid">
          {dailyTickets.map((ticket) => (
            <article className="ticket-card" key={ticket.odd}>
              <div className="ticket-head">
                <OperatorLogo operator={operators[1]} />
                <span>{ticket.badge}</span>
              </div>
              <div className="ticket-match">
                <small>{ticket.league}</small>
                <strong>{ticket.match}</strong>
                <p>{ticket.selection}</p>
              </div>
              <div className="ticket-price">
                <span>{ticket.profile}</span>
                <button onClick={() => demonstrate("Bilhete demonstrativo da bet365")}>VER BILHETE <b>{ticket.odd}</b></button>
              </div>
              <div className="ad-warning">
                <b>18+</b><span>Ministério da Fazenda adverte: Aposta não é investimento.</span>
              </div>
              <p className="operator-disclosure">HS do Brasil Ltda. · CNPJ 47.123.407/0001-70 · Portaria SPA/MF nº 250, de 07/02/2025.</p>
            </article>
          ))}
        </div>
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
              <div><OperatorLogo operator={operator} /><small>{index === 0 ? "Melhor odd" : "Operador autorizado"}</small></div>
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
        <article className="game-compare-widget">
          <span className="kicker">ESCOLHA O CAMPEONATO</span><h2>Compare por jogo</h2>
          <div className="compare-selects">
            <label>Campeonato
              <select value={championshipIndex} onChange={(event) => { setChampionshipIndex(Number(event.target.value)); setFixtureIndex(0); }}>
                {championships.map((championship, index) => <option value={index} key={championship.name}>{championship.name}</option>)}
              </select>
            </label>
            <label>Jogo
              <select value={fixtureIndex} onChange={(event) => setFixtureIndex(Number(event.target.value))}>
                {selectedChampionship.games.map((game, index) => <option value={index} key={game.name}>{game.name}</option>)}
              </select>
            </label>
          </div>
          <div className="mini-odds-head"><span>Casa</span><b>1</b><b>X</b><b>2</b></div>
          <div className="mini-odds-list">
            {operators.map((operator, operatorIndex) => (
              <div className="mini-odds-row" key={operator.name}>
                <OperatorLogo operator={operator} />
                {selectedFixture.odds[operatorIndex].map((odd, column) => (
                  <b className={odd === bestFixtureOdds[column] ? "best" : ""} key={column}>{odd.toFixed(2)}</b>
                ))}
              </div>
            ))}
          </div>
          <p>Melhores odds destacadas em verde. Dados ilustrativos com atualização via componenteAjax.</p>
        </article>
      </section>

      <section className="guides-band" id="guias">
        <div className="page-shell">
          <CmsTag>listaNoticias · 4 cards</CmsTag>
          <div className="section-title"><div><h2>Guia para apostas</h2></div></div>
          <div className="guide-grid">
            {bettingGuides.map((guide) => (
              <article key={guide.title}>
                <a href={guide.href} target="_blank" rel="noreferrer">
                  <img loading="lazy" src={guide.image} alt="" />
                  <span>{guide.category}</span>
                  <h3>{guide.title}</h3>
                </a>
              </article>
            ))}
          </div>
          <a className="guides-all" href="https://esporte.ig.com.br/jogoajogo/noticias/guia-para-apostas" target="_blank" rel="noreferrer">Ver todas</a>
        </div>
      </section>

      <section className="page-shell operators" id="operadores">
        <CmsTag>componenteAjax-cupom · 5 cards</CmsTag>
        <div className="section-title"><div><span className="kicker">PARCEIROS CONTRATADOS</span><h2>Casas de apostas</h2></div></div>
        <div className="operator-grid">
          {operators.map((operator) => (
            <article key={operator.name}>
              <OperatorLogo operator={operator} />
              <span className="authorized">✓ Autorizada</span>
              <p><strong>CNPJ</strong>{operator.cnpj}</p>
              <p><strong>Autorização</strong>{operator.portaria}</p>
              <button onClick={() => demonstrate(`Review de ${operator.name}`)}>Ver análise</button>
              <small>18+ • Apostar pode causar dependência.</small>
            </article>
          ))}
        </div>
      </section>

      <section className="latest-news" id="fique-por-dentro">
        <div className="editorial-shell">
          <CmsTag>componenteAjax · empilhamento editorial</CmsTag>
          <div className="section-title">
            <div><h2>Fique por dentro</h2></div>
            <a href="https://esporte.ig.com.br/jogoajogo/">Ver todas</a>
          </div>
          <div className="editorial-layout">
            <div className="news-list">
              {latestNews.map((article) => (
                <article key={article.title}>
                  <a href={article.href} target="_blank" rel="noreferrer">
                    <img loading="lazy" src={article.image} alt="" />
                    <div>
                      <span>{article.category}</span>
                      <h3>{article.title}</h3>
                      <p>{article.description}</p>
                      <small>{article.time}</small>
                    </div>
                  </a>
                </article>
              ))}
            </div>
            <aside className="home-sidebar" aria-label="Conteúdo complementar">
              <div className="sidebar-ad"><span>PUBLICIDADE</span><div>300 × 250</div></div>
              <section className="newsletter-card">
                <span>NEWSLETTER JOGO A JOGO</span>
                <h3>Odds, jogos e dados no seu e-mail</h3>
                <p>Receba a agenda do dia e os destaques do futebol.</p>
                <label><span>Seu e-mail</span><input type="email" placeholder="nome@email.com" /></label>
                <button onClick={() => demonstrate("Cadastro demonstrativo da newsletter")}>QUERO RECEBER</button>
                <small>Ao cadastrar, você aceita a Política de Privacidade do iG.</small>
              </section>
              <section className="most-read">
                <h3>Mais Lidas</h3>
                <ol>
                  {mostRead.map((title, index) => <li key={title}><b>{String(index + 1).padStart(2, "0")}</b><a href="#fique-por-dentro">{title}</a></li>)}
                </ol>
              </section>
              <div className="sidebar-ad"><span>PUBLICIDADE</span><div>300 × 250</div></div>
            </aside>
          </div>
        </div>
      </section>

      <section className="responsible" id="responsavel">
        <div className="page-shell responsible-inner">
          <b>18+</b>
          <div><span className="kicker">JOGO RESPONSÁVEL</span><h2>Aposta é entretenimento, não investimento.</h2><p>Não use dinheiro de gastos essenciais e nunca tente recuperar perdas. Se precisar, utilize a plataforma centralizada de autoexclusão.</p></div>
          <a href="https://www.gov.br/autoexclusaoapostas" target="_blank" rel="noreferrer">Acessar autoexclusão ↗</a>
        </div>
      </section>

      <section className="betting-footer" aria-label="Informações legais e jogo responsável">
        <div className="betting-footer-inner">
          <div className="betting-footer-intro">
            <span className="kicker">TRANSPARÊNCIA E JOGO RESPONSÁVEL</span>
            <h2>Jogue com responsabilidade</h2>
            <p>Conteúdo publicitário identificado. Odds podem mudar. Consulte sempre os termos do operador e não utilize dinheiro destinado a despesas essenciais.</p>
            <nav aria-label="Links de proteção ao apostador">
              <a href="https://www.gov.br/autoexclusaoapostas" target="_blank" rel="noreferrer"><b>18+</b> Autoexclusão</a>
              <a href="https://www.gov.br/fazenda/pt-br/composicao/orgaos/secretaria-de-premios-e-apostas" target="_blank" rel="noreferrer">Ministério da Fazenda</a>
              <a href="https://www.jogadoresanonimos.com.br/" target="_blank" rel="noreferrer">Jogadores Anônimos</a>
            </nav>
          </div>
          <div className="legal-operators">
            <h3>Operadores parceiros autorizados</h3>
            {operators.map((operator) => (
              <div key={operator.name}>
                <OperatorLogo operator={operator} />
                <p><strong>{operator.legalName}</strong><span>CNPJ {operator.cnpj}</span><span>Portaria {operator.portaria}</span></p>
              </div>
            ))}
            <small>Autorizações consultadas na relação oficial da Secretaria de Prêmios e Apostas. Validação jurídica necessária antes da publicação.</small>
          </div>
        </div>
      </section>

      <footer className="iGfooter">
        <div className="iGfooter_container">
          <img
            loading="lazy"
            className="iGfooter_logo"
            src="https://i0.statig.com.br/imgs/IG_Logo_PB.png"
            alt="iG logo footer"
            title="iG logo footer"
          />
          <div className="iGfooter_sobre">
            <nav className="iGfooter_sites" aria-label="Canais do iG">
              <ul>
                {igChannels.map(([label, href]) => (
                  <li key={label}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </nav>
            <div className="iGfooter_social">
              <h3>Siga o iG nas redes sociais:</h3>
              {igSocials.map(([label, href, viewBox, path]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <svg viewBox={viewBox} aria-hidden="true"><path d={path} /></svg>
                </a>
              ))}
            </div>
            <nav className="iGfooter_corporate" aria-label="Links institucionais do iG">
              <ul>
                {igCorporateLinks.map(([label, href]) => (
                  <li key={label}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </nav>
            <div className="iGfooter_rodape">
              <p>© Copyright 2000-2026, iG Publicidade e Conteúdo</p>
            </div>
          </div>
        </div>
      </footer>

      <div className="regulatory-dock">
        <strong>18+ • OPERADORES EXIBIDOS</strong>
        {operators.map((operator) => <span key={operator.name}>{operator.name}: {operator.legalName} · CNPJ {operator.cnpj} · {operator.portaria}</span>)}
      </div>

      <OddsAssistant />
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
