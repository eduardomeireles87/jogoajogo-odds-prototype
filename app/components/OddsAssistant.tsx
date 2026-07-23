"use client";

import { FormEvent, useState } from "react";

type LeagueKey = "serie-a" | "serie-b" | "sul-americana";

const leagueMatches: Record<LeagueKey, string[]> = {
  "serie-a": ["Corinthians x Remo", "Botafogo x Vitória"],
  "serie-b": ["Athletic x São Bernardo", "Cuiabá x Atlético-GO"],
  "sul-americana": ["Bolívar x Grêmio", "Boca Juniors x O'Higgins"],
};

const leagueNames: Record<LeagueKey, string> = {
  "serie-a": "Brasileirão Série A",
  "serie-b": "Brasileirão Série B",
  "sul-americana": "Copa Sul-Americana",
};

const resultOdds = [
  { name: "7K", logo: "7kbet.svg", key: "seven", odds: ["1.57", "4.15", "6.75"] },
  { name: "bet365", logo: "bet365.webp", key: "bet365", odds: ["1.58", "4.10", "6.90"] },
  { name: "Superbet", logo: "superbet.webp", key: "superbet", odds: ["1.59", "4.05", "6.80"] },
  { name: "Betnacional", logo: "betnacional.webp", key: "betnacional", odds: ["1.60", "4.20", "6.70"] },
  { name: "Novibet", logo: "novibet.webp", key: "novibet", odds: ["1.62", "4.00", "6.65"] },
];

export default function OddsAssistant({ assetPrefix = "" }: { assetPrefix?: string }) {
  const [open, setOpen] = useState(false);
  const [league, setLeague] = useState<LeagueKey | null>(null);
  const [match, setMatch] = useState("");
  const [query, setQuery] = useState("");

  const selectLeague = (key: LeagueKey) => {
    setLeague(key);
    setMatch("");
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const normalized = query.toLowerCase();
    const selected: LeagueKey = normalized.includes("série b") || normalized.includes("serie b")
      ? "serie-b"
      : normalized.includes("sul") || normalized.includes("grêmio") || normalized.includes("gremio")
        ? "sul-americana"
        : "serie-a";
    selectLeague(selected);
    setQuery("");
  };

  return (
    <>
      <button className="odds-assistant-launcher" onClick={() => setOpen(true)} aria-label="Abrir buscador de odds">
        <span className="assistant-sparkles" aria-hidden="true">✦</span>
        <span><b>BUSCADOR DE ODDS</b><small>Consulte jogos e campeonatos</small></span>
        <span className="assistant-offer"><small>OFERECIMENTO</small><span className="assistant-bet365"><img src={`${assetPrefix}operators/bet365.webp`} alt="bet365" /></span></span>
        <em><b>18+</b> Ministério da Fazenda adverte: Aposta não é investimento.</em>
      </button>

      {open && (
        <div className="odds-assistant-backdrop" onClick={() => setOpen(false)}>
          <aside className="odds-assistant-panel" onClick={(event) => event.stopPropagation()} aria-label="Buscador conversacional de odds">
            <header>
              <div><span>✦</span><div><b>BUSCADOR DE ODDS</b><small>JOGO A JOGO + TIPSTER API</small></div></div>
              <button onClick={() => setOpen(false)} aria-label="Fechar">×</button>
            </header>

            <div className="assistant-conversation">
              <p className="assistant-system">Olá! Eu encontro odds disponíveis por campeonato, jogo ou mercado. Não faço recomendações de aposta.</p>
              <div className="assistant-status"><i /> TIPSTER API CONECTADA · ATUALIZAÇÃO EM TEMPO REAL</div>

              <strong className="assistant-question">Qual campeonato você quer consultar?</strong>
              <div className="assistant-chips">
                <button onClick={() => selectLeague("serie-a")}>Brasileirão Série A</button>
                <button onClick={() => selectLeague("serie-b")}>Brasileirão Série B</button>
                <button onClick={() => selectLeague("sul-americana")}>Sul-Americana</button>
              </div>

              {league && (
                <div className="assistant-answer">
                  <small>{leagueNames[league]}</small>
                  <strong>Escolha um jogo</strong>
                  {leagueMatches[league].map((item) => (
                    <button className={match === item ? "active" : ""} onClick={() => setMatch(item)} key={item}>
                      <span>{item}</span><b>Ver odds →</b>
                    </button>
                  ))}
                </div>
              )}

              {match && (
                <div className="assistant-result">
                  <div><small>COMPARAÇÃO · MERCADO 1X2</small><strong>{match}</strong></div>
                  <div className="assistant-result-head"><span>Casa</span><b>1</b><b>X</b><b>2</b></div>
                  {resultOdds.map((operator) => (
                    <div className="assistant-result-row" key={operator.name}>
                      <span className={`assistant-logo ${operator.key}`}><img src={`${assetPrefix}operators/${operator.logo}`} alt={operator.name} /></span>
                      {operator.odds.map((odd) => <b key={odd}>{odd}</b>)}
                    </div>
                  ))}
                  <p>Valores ilustrativos. Destaques servem apenas à comparação e não representam recomendação.</p>
                </div>
              )}
            </div>

            <form onSubmit={submit}>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: odds Corinthians x Remo" aria-label="Buscar odds" />
              <button type="submit">BUSCAR</button>
            </form>
            <div className="assistant-legal"><b>18+</b><span>MINISTÉRIO DA FAZENDA ADVERTE: APOSTA NÃO É INVESTIMENTO.</span></div>
            <p className="assistant-disclosure">Oferecimento bet365 · Hillside (Brazil) Ltda. · CNPJ 47.123.407/0001-70 · Portaria SPA/MF nº 250/2025.</p>
          </aside>
        </div>
      )}
    </>
  );
}
