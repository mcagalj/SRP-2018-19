# SRP - Lab 4: Securing REST API services <!-- omit in toc -->

<!-- markdownlint-disable MD007 -->

- [Instalacija i pokretanje REST servera](#instalacija-i-pokretanje-rest-servera)
- [Instalacija REST klijenta](#instalacija-rest-klijenta)

<!-- markdownlint-disable MD07 -->

U okviru vježbe student će se upoznati s osnovnim aspektima zaštite REST API servisa s naglaskom na sigurnu pohranu zaproki, autentikacijske tokene (_e.g., JWT_) i kontrolu pristupa zasnovanu na _ulogama_ (_Role-Based Access Control_).

Za provedbu vježbi, koristit ćemo JavaScript jezik odnosno [Node.js](https://nodejs.org/en/) i [Express.js](https://expressjs.com/) serverske tehnologije, te REST client [Insomnia](https://insomnia.rest/).

## Instalacija i pokretanje REST servera

1. Klonirajte ovaj repozitorij korištenjem Git klijenta kako je prikazano u nastavku. Ovo napravite iz svog osobnog direktorija.

   > Na laboratorijskim računalima instaliran je odgovarajući [Git klijent](https://git-scm.com/).

   U terminalu, unutar osobnog direktorija, izvršite sljedeću naredbu:

   ```console
   > git clone https://github.com/mcagalj/SRP-2018-19
   ```

2. Instaliratje potrebne module/biblioteke. Pozicionirajte se u direktorij `SRP-2018-19/rest-api-server` i u terminalu izvršite sljedeću naredbu:

   ```console
   > npm install
   ```

3. Pokrenite server (u `development` modu) kako slijedi:

   ```console
   > npm start
   ```

## Instalacija REST klijenta

Za potrebe vježbi koristit ćemo REST klijent [Insomnia](https://insomnia.rest/). REST klijent se koristi za testiranje REST servisa. Instalirajte navedeni klijent prema uputama na web stranicama klijenta.

> Alternativno možete koristiti popularni REST klijent [Postman](https://www.getpostman.com/). Za ljubitelje terminala i komandne linije još jedna alternativa je iznimno popularni [curl](https://curl.haxx.se/).
