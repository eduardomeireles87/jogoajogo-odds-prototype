"use client";

import { useState } from "react";
import IgFooter from "../../components/IgFooter";
import IgHeader from "../../components/IgHeader";
import OddsAssistant from "../../components/OddsAssistant";

const matchOdds = [
  { label: "Casa · 1", value: "1.58" },
  { label: "Empate · X", value: "4.10" },
  { label: "Fora · 2", value: "6.90" },
];

const liveStats = [
  ["Posse de bola", 56, 44, "%"],
  ["Finalizações", 12, 8, ""],
  ["Chutes no gol", 5, 3, ""],
  ["Escanteios", 6, 3, ""],
  ["Faltas", 10, 13, ""],
  ["Cartões amarelos", 2, 3, ""],
] as const;

const timeline = [
  { minute: "67’", type: "attack", text: "Corinthians pressiona pela direita; cruzamento cortado pela defesa do Remo." },
  { minute: "61’", type: "card", text: "Cartão amarelo para o Remo após falta no meio-campo." },
  { minute: "52’", type: "goal", text: "GOL DO REMO. Finalização cruzada após recuperação de bola." },
  { minute: "45’", type: "half", text: "Começa o segundo tempo na Neo Química Arena." },
  { minute: "34’", type: "goal", text: "GOL DO CORINTHIANS. Cabeceio após cobrança de escanteio." },
];

function TeamBadge({ code, name, side }: { code: string; name: string; side: "home" | "away" }) {
  return <div className="match-team"><span className={side}>{code}</span><strong>{name}</strong><small>{side === "home" ? "Mandante" : "Visitante"}</small></div>;
}

export default function MatchPage() {
  const [tab, setTab] = useState("overview");

  return (
    <main className="match-page">
      <div className="legal-top"><b>18+</b><span>MINISTÉRIO DA FAZENDA ADVERTE: APOSTA NÃO É INVESTIMENTO</span><span className="desktop-legal">• Jogue com responsabilidade</span></div>
      <IgHeader assetPrefix="../../" />

      <div className="match-api-bar">
        <div><i /> DADOS CONECTADOS</div>
        <span><b>PRÉ-JOGO</b> StatScore API</span>
        <span><b>AO VIVO</b> Sports API</span>
        <span><b>NARRAÇÃO</b> Live Commentary API</span>
      </div>

      <div className="match-layout page-shell" id="dados">
        <section className="match-main">
          <p className="breadcrumb">iG › Esporte › Jogo a Jogo › Brasileirão Série A › Corinthians x Remo</p>
          <div className="match-kicker"><span>BRASILEIRÃO SÉRIE A 2026</span><b>AO VIVO · 67’</b></div>
          <article className="match-score-card">
            <div className="match-meta">23/07 · 23:30 · Neo Química Arena, São Paulo</div>
            <div className="match-score">
              <TeamBadge code="COR" name="Corinthians" side="home" />
              <div><span>SEGUNDO TEMPO</span><strong>1 <small>×</small> 1</strong><em>67:18</em></div>
              <TeamBadge code="REM" name="Remo" side="away" />
            </div>
            <div className="match-scorers"><span>34’ Yuri Alberto</span><span>Régis 52’</span></div>
          </article>

          <section className="pregame-panel">
            <div className="widget-heading"><span>DADOS PRÉ-JOGO</span><small>STATScore API</small></div>
            <div className="pregame-grid">
              <article><span>POSIÇÃO</span><strong>6º</strong><small>Corinthians</small><b>14º</b><small>Remo</small></article>
              <article><span>ÚLTIMOS 5 JOGOS</span><div className="form-dots"><i>V</i><i>E</i><i>V</i><i className="loss">D</i><i>V</i></div><small>Mandante</small></article>
              <article><span>MÉDIA DE GOLS</span><strong>1,54</strong><small>Corinthians</small><b>1,08</b><small>Remo</small></article>
              <article><span>CONFRONTOS DIRETOS</span><strong>3</strong><small>Vitórias COR</small><b>1</b><small>Vitória REM</small></article>
            </div>
          </section>

          <section className="match-odds" id="odds">
            <div className="widget-heading"><span>ODDS DO JOGO</span><small>Oferecimento <img src="../../operators/bet365.webp" alt="bet365" /></small></div>
            <div className="match-odds-grid">
              {matchOdds.map((odd) => <button key={odd.label}><span>{odd.label}</span><b>{odd.value}</b></button>)}
            </div>
            <div className="match-ad-warning"><b>18+</b> Ministério da Fazenda adverte: Aposta não é investimento.</div>
            <p>Hillside (Brazil) Ltda. · CNPJ 47.123.407/0001-70 · Portaria SPA/MF nº 250/2025.</p>
          </section>

          <nav className="match-tabs" aria-label="Dados da partida">
            {[
              ["overview", "Visão geral"],
              ["stats", "Estatísticas"],
              ["lineups", "Escalações"],
              ["timeline", "Lance a lance"],
            ].map(([key, label]) => <button className={tab === key ? "active" : ""} onClick={() => setTab(key)} key={key}>{label}</button>)}
          </nav>

          <div className="match-tab-content">
            {tab === "overview" && (
              <>
                <section className="match-card">
                  <div className="widget-heading"><span>RESUMO AO VIVO</span><small>SPORTS API</small></div>
                  <div className="momentum">
                    <div className="momentum-head"><b>Pressão ofensiva</b><span>últimos 10 minutos</span></div>
                    <div className="momentum-chart" aria-label="Gráfico ilustrativo de pressão ofensiva">
                      {[38, 54, 68, 45, 78, 88, 58, 41, 63, 82, 47, 35, 52, 29, 43, 56, 31, 47].map((height, index) => <i className={index > 10 ? "away" : ""} style={{ height: `${height}%` }} key={index} />)}
                    </div>
                    <div className="momentum-legend"><span><i /> Corinthians</span><span><i /> Remo</span></div>
                  </div>
                </section>
                <section className="match-card live-summary">
                  <div className="widget-heading"><span>ESTATÍSTICAS RESUMIDAS</span><small>ATUALIZADO AGORA</small></div>
                  {liveStats.slice(0, 4).map(([label, home, away, unit]) => (
                    <div className="stat-row" key={label}>
                      <div><b>{home}{unit}</b><span>{label}</span><b>{away}{unit}</b></div>
                      <div><i style={{ width: `${home / (home + away) * 100}%` }} /><em style={{ width: `${away / (home + away) * 100}%` }} /></div>
                    </div>
                  ))}
                </section>
              </>
            )}

            {tab === "stats" && (
              <section className="match-card live-summary">
                <div className="widget-heading"><span>ESTATÍSTICAS EM TEMPO REAL</span><small>SPORTS API · 67:18</small></div>
                {liveStats.map(([label, home, away, unit]) => (
                  <div className="stat-row" key={label}>
                    <div><b>{home}{unit}</b><span>{label}</span><b>{away}{unit}</b></div>
                    <div><i style={{ width: `${home / (home + away) * 100}%` }} /><em style={{ width: `${away / (home + away) * 100}%` }} /></div>
                  </div>
                ))}
              </section>
            )}

            {tab === "lineups" && (
              <section className="match-card">
                <div className="widget-heading"><span>ESCALAÇÕES</span><small>CONFIRMADAS · STATScore API</small></div>
                <div className="lineups-grid">
                  <div><h3>Corinthians <small>4-3-3</small></h3><p>Hugo Souza</p><p>Matheuzinho · Félix Torres · Cacá · Hugo</p><p>Raniele · Garro · Bidon</p><p>Wesley · Yuri Alberto · Romero</p></div>
                  <div><h3>Remo <small>4-2-3-1</small></h3><p>Marcelo Rangel</p><p>Vidal · Ligger · Ícaro · Sávio</p><p>Pavani · Jaderson</p><p>Régis · Pedro Rocha · Kelvin · Ytalo</p></div>
                </div>
              </section>
            )}

            {tab === "timeline" && (
              <section className="match-card">
                <div className="widget-heading"><span>LANCE A LANCE</span><small>LIVE COMMENTARY API</small></div>
                <div className="timeline-list">
                  {timeline.map((event) => <article className={event.type} key={`${event.minute}-${event.text}`}><b>{event.minute}</b><i /><p>{event.text}</p></article>)}
                </div>
              </section>
            )}
          </div>
          <p className="prototype-note">Protótipo navegável: placar, eventos e estatísticas são ilustrativos. Em produção, os estados pré-jogo, ao vivo e encerrado são atualizados pelas APIs indicadas.</p>
        </section>

        <aside className="match-side">
          <div className="ad-space compact"><span>PUBLICIDADE</span><div>300 × 250</div></div>
          <section className="match-card">
            <div className="widget-heading"><span>OUTROS JOGOS</span><small>HOJE</small></div>
            <a href="#"><b>23:00</b><span>Bolívar × Grêmio</span><em>Pré-jogo</em></a>
            <a href="#"><b>23:30</b><span>Botafogo × Vitória</span><em>Pré-jogo</em></a>
            <a href="#"><b>01:30</b><span>Boca × O&apos;Higgins</span><em>Em breve</em></a>
          </section>
        </aside>
      </div>

      <section className="responsible" id="responsavel">
        <div className="page-shell responsible-inner"><b>18+</b><div><span className="kicker">JOGO RESPONSÁVEL</span><h2>Aposta é entretenimento, não investimento.</h2><p>Compare informações com responsabilidade e defina limites antes de apostar.</p></div><a href="https://www.gov.br/autoexclusaoapostas">Acessar autoexclusão ↗</a></div>
      </section>
      <IgFooter />
      <div className="regulatory-dock"><strong>18+ • OPERADOR EXIBIDO</strong><span>bet365: CNPJ 47.123.407/0001-70 · Portaria SPA/MF nº 250/2025</span></div>
      <OddsAssistant assetPrefix="../../" />
    </main>
  );
}
