const channels = [
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

const corporate = [
  ["Anuncie", "https://centraldoanunciante.ig.com.br/"],
  ["Política de privacidade", "https://institucional.ig.com.br/2020-11-05/politica-de-privacidade-ig.html"],
  ["Termos de Uso", "https://institucional.ig.com.br/2020-11-05/termos-de-uso.html"],
  ["Institucional", "https://institucional.ig.com.br/"],
  ["Quem Somos", "https://institucional.ig.com.br/2021-07-13/quem-somos--visao--missao-e-valores.html"],
  ["Fale Conosco", "https://igcorp.octadesk.com/kb/"],
  ["E-mail iG", "https://vendas-mail.ig.com.br/"],
  ["Suporte e-mail", "https://igcorp.octadesk.com/helpcenter/new-ticket/"],
];

export default function IgFooter() {
  return (
    <footer className="iGfooter">
      <div className="iGfooter_container">
        <img loading="lazy" className="iGfooter_logo" src="https://i0.statig.com.br/imgs/IG_Logo_PB.png" alt="iG logo footer" />
        <div className="iGfooter_sobre">
          <nav className="iGfooter_sites" aria-label="Canais do iG"><ul>{channels.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul></nav>
          <div className="iGfooter_social iGfooter_social-text">
            <h3>Siga o iG nas redes sociais:</h3>
            <a href="https://www.facebook.com/ig">f</a><a href="https://x.com/iG">𝕏</a><a href="https://www.instagram.com/portal_ig/">◎</a>
            <a href="https://www.linkedin.com/company/portalig/">in</a><a href="https://www.youtube.com/ig">▶</a>
          </div>
          <nav className="iGfooter_corporate" aria-label="Links institucionais do iG"><ul>{corporate.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul></nav>
          <div className="iGfooter_rodape"><p>© Copyright 2000-2026, iG Publicidade e Conteúdo</p></div>
        </div>
      </div>
    </footer>
  );
}
