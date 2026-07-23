"use client";

import { useState } from "react";

const networkLinks = [
  ["Último Segundo", "https://ultimosegundo.ig.com.br", "ultimo-segundo"],
  ["Economia", "https://economia.ig.com.br", "economia"],
  ["Gente", "https://gente.ig.com.br", "gente"],
  ["Esporte", "https://esporte.ig.com.br", "esporte"],
  ["Carros", "https://carros.ig.com.br", "carros"],
  ["Pets", "https://canaldopet.ig.com.br", "pets"],
  ["Receitas", "https://receitas.ig.com.br", "receitas"],
  ["Tec", "https://tecnologia.ig.com.br", "tecnologia"],
  ["Turismo", "https://turismo.ig.com.br", "turismo"],
  ["iG Play", "https://play.ig.com.br", "igplay"],
  ["iG Mais", "https://igmais.ig.com.br", "igmais"],
  ["Parceiros", "https://www.ig.com.br/parceiros/", "parceiros"],
];

const channelLinks = [
  ["Home", "https://esporte.ig.com.br/jogoajogo/"],
  ["Casas de apostas", "https://esporte.ig.com.br/jogoajogo/noticias/casas-de-apostas"],
  ["Cupons e códigos", "https://esporte.ig.com.br/apostas/2025-08-21/cupom-codigo-apostas-esportivas-brasil-2025.html"],
  ["Guia para apostas", "https://esporte.ig.com.br/jogoajogo/noticias/guia-para-apostas"],
  ["Prognósticos", "https://esporte.ig.com.br/jogoajogo/noticias/prognosticos"],
  ["Copa 2026", "https://esporte.ig.com.br/jogoajogo/copa-do-mundo/"],
  ["Brasileirão 2026", "https://esporte.ig.com.br/jogoajogo/brasileirao-serie-a-2026/"],
];

export default function IgHeader({
  assetPrefix = "",
  onCmsToggle,
  cmsMode = false,
}: {
  assetPrefix?: string;
  onCmsToggle?: () => void;
  cmsMode?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="ig-main-header">
        <div className="ig-channel-network">
          <nav aria-label="Canais do iG">
            {networkLinks.map(([label, href, colorClass]) => (
              <a className={colorClass} href={href} key={label}>{label}</a>
            ))}
          </nav>
        </div>

        <div className="ig-minimal-header">
          <div className="ig-minimal-content">
            <button className="ig-mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir menu do Jogo a Jogo">
              <i /><i /><i />
            </button>

            <a className="ig-color-logo" href="https://www.ig.com.br" title="iG">
              <img src={`${assetPrefix}ig-logo-colorido.png`} alt="iG" />
            </a>

            <a className="ig-channel-logo" href="https://esporte.ig.com.br/jogoajogo/" title="Jogo a Jogo">
              <img src={`${assetPrefix}jogoajogo-logo-official.png`} alt="Jogo a Jogo" />
            </a>

            <div className="ig-header-actions">
              <a className="ig-mail-link" href="https://vendas-mail.ig.com.br/?utm_source=header&utm_medium=home" target="_blank" rel="noopener sponsored">
                iG Mail <img src={`${assetPrefix}ig-mail.svg`} alt="" />
              </a>
              <form action="https://busca.ig.com.br/buscar" method="get" role="search">
                <label htmlFor="ig-header-search">Buscar no iG</label>
                <input id="ig-header-search" name="q" type="search" placeholder="Buscar no iG" />
                <img src={`${assetPrefix}ig-search.svg`} alt="" />
              </form>
            </div>
          </div>

          <nav className={`ig-channel-menu ${menuOpen ? "open" : ""}`} aria-label="Jogo a Jogo">
            <strong>APOSTAS</strong>
            {channelLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
          </nav>
        </div>
      </header>

      {onCmsToggle && (
        <div className="prototype-toolbar">
          <span>PROTÓTIPO JOGO A JOGO</span>
          <button onClick={onCmsToggle}>{cmsMode ? "Ocultar estrutura CMS" : "Ver estrutura CMS"}</button>
        </div>
      )}
    </>
  );
}
