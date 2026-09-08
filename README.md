# Filmes Caiote

Aplicacao web para descobrir filmes, series e animes populares (ou buscar por titulo), em portugues do Brasil. Filmes e series usam a [API do TMDB](https://developer.themoviedb.org/reference/discover-movie); animes usam a [API do Jikan](https://docs.api.jikan.moe/) (dados nao oficiais do MyAnimeList). O projeto apresenta posters, titulos, sinopses, avaliacoes em estrelas e um modal com detalhes completos de cada titulo.

#Referência
Utilizei o vídeo abaixo como referência de estudo
https://www.youtube.com/watch?v=ZxZy4LhXlE0&list=PLvBZEbHj4kDs5pOLmxj3ofKV7NTHA3DgM&index=41&t=3s

## Preview

![Tela principal do Filmes Caiote](public/preview.png)

## Funcionalidades

- Abas para alternar entre Filmes, Series e Animes.

- Busca por titulo, com resultados especificos da aba ativa.

- Listagem paginada, com filmes/series descobertos pela API do TMDB e animes em alta pela API do Jikan.

- Modal de detalhes ao clicar em "Ver mais": sinopse completa, generos, duracao/episodios, status e tagline (quando disponivel). Para filmes e series esses dados extras sao buscados sob demanda ao abrir o modal; para animes ja vem junto da listagem.

- Fundo em "vidro fosco": usa o poster em destaque da listagem atual, desfocado e levemente ampliado, como plano de fundo da tela.

- Conteudo localizado em portugues do Brasil (`pt-BR`).

- Estado de carregamento enquanto os dados sao buscados, e estado de erro com opcao de tentar novamente (listagem de animes).

- Cards responsivos organizados em grid, com interacao de hover para revelar informacoes adicionais.

## Tecnologias

- [Next.js 16](https://nextjs.org/) com App Router

- [React 19](https://react.dev/)

- [TypeScript](https://www.typescriptlang.org/)

- [Axios](https://axios-http.com/) para requisicoes HTTP

- [Sass](https://sass-lang.com/) para estilos dos componentes

- [Tailwind CSS 4](https://tailwindcss.com/) via PostCSS

- [React Icons](https://react-icons.github.io/react-icons/) para as estrelas

- [Poppins](https://fontsource.org/fonts/poppins) via `@fontsource/poppins`

## Pre-requisitos

- Node.js 20.9 ou superior

- npm

- Uma chave de API do [TMDB](https://www.themoviedb.org/settings/api) (necessaria para filmes e series)

- A [API do Jikan](https://docs.api.jikan.moe/) usada para animes e publica e nao exige chave

## Como executar

1. Clone o repositorio e entre na pasta do projeto:

	```bash

	git clone <url-do-repositorio>

	cd movies-app

	```

2. Instale as dependencias:

	```bash

	npm install

	```

3. Crie uma conta no [TMDB](https://www.themoviedb.org/) e gere sua propria chave de API em [Settings > API](https://www.themoviedb.org/settings/api).

4. Informe sua chave no parametro `API_KEY` dos arquivos `app/service/tmdb/movies.ts` e `app/service/tmdb/tv.ts`:

	```ts

	const API_KEY = 'sua_chave_do_tmdb';

	```

	Use somente sua chave localmente, nao compartilhe esse valor e nao o publique no GitHub. Cada pessoa que executar o projeto deve gerar e usar sua propria chave.

5. Inicie o servidor de desenvolvimento:

	```bash

	npm run dev

	```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts disponiveis

| Comando | Descricao |

| --- | --- |

| `npm run dev` | Inicia o servidor de desenvolvimento |

| `npm run build` | Gera a build de producao |

| `npm start` | Executa a aplicacao em modo de producao |

| `npm run lint` | Verifica problemas de lint |

## Estrutura do projeto

```text

app/

├── components/

│   ├── AnimeList/       # Busca, paginacao e estado de erro da listagem de animes

│   ├── MediaCard/        # Card individual (filme, serie ou anime)

│   ├── MediaModal/        # Modal de detalhes aberto pelo botao "Ver mais"

│   ├── MovieList/        # Busca e paginacao da listagem de filmes

│   ├── NavBar/            # Abas, titulo e busca

│   ├── PaginationList/   # Controles de paginacao reutilizados pelas listagens

│   ├── SearchBar/         # Campo de busca usado na NavBar

│   ├── StarRating/        # Conversao da nota em estrelas

│   └── TvList/            # Busca e paginacao da listagem de series

├── service/

│   ├── jikan/anime.ts    # Chamadas a API do Jikan e normalizacao dos animes

│   └── tmdb/

│       ├── movies.ts     # Chamadas a API do TMDB e normalizacao dos filmes

│       └── tv.ts          # Chamadas a API do TMDB e normalizacao das series

├── types/media.ts        # Tipagem padronizada usada por filmes, series e animes

├── globals.scss           # Estilos globais e fundo em vidro fosco

├── layout.tsx              # Layout raiz e metadata

└── page.tsx                 # Pagina inicial e controle das abas

public/                  # Arquivos estaticos

```

## TMDB

Este produto usa a API do TMDB, mas nao e endossado nem certificado pelo TMDB. Os dados e imagens de filmes e series sao fornecidos pelo [The Movie Database](https://www.themoviedb.org/).

Para utilizar deve-se criar uma conta no site deles e gerar sua própria chave da API.

> **Importante:** no codigo atual, a requisicao ao TMDB e feita diretamente pelo navegador. Portanto, a chave pode ficar visivel nas requisicoes do cliente mesmo que nao seja commitada no repositorio. Para manter a chave realmente privada, sera necessario mover essa requisicao para uma rota de API no servidor.

## Jikan / MyAnimeList

Os dados de animes sao fornecidos pela [API do Jikan](https://jikan.moe/), uma API nao oficial que espelha dados do [MyAnimeList](https://myanimelist.net/). Ela e publica e nao exige chave de API, mas tem limite de requisicoes por minuto/segundo — em caso de instabilidade, a propria API pode retornar erro (tratado na tela com uma opcao de tentar novamente).

## Deploy

O projeto pode ser publicado na [Vercel](https://vercel.com/) ou em qualquer ambiente compativel com Next.js. Antes do deploy, configure sua propria chave conforme as regras de seguranca do ambiente escolhido e nunca a inclua no repositorio.
