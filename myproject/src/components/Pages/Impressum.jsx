import React from 'react';

const Impressum = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className='text-[var(--main-color)] text-2xl font-bold my-4'>Impressum</h1>

      <p><strong>Angaben gemäß § 5 TMG</strong></p>

      <p>
        Betreiber:<br />
       Mohammad Almohammad<br />
        Meller Str . 38<br />
        Enger 32130<br />
        Deutschland
      </p>

      <p>
        <strong>Kontakt</strong><br />
        E-Mail: <a href="mailto:mooramadan93@gmail.com">mooramadan93@gmail.com</a><br />
        Telefon: +49 17620316007
      </p>

      <p>
        <strong>Redaktionell verantwortlich gemäß § 55 Abs. 2 RStV</strong><br />
        Mohammad Almohammad<br />
        Adresse wie oben
      </p>

      <p>
        <strong>Hinweis auf EU-Streitschlichtung</strong><br />
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br />
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr
        </a>
        <br /><br />
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </div>
  );
};

export default Impressum;
