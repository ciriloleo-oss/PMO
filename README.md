# Reserva da Serra - Starter Next.js + Supabase

Base inicial para começar o sistema real de gestão de projetos do Reserva da Serra.

## O que já vem pronto
- Next.js 14 com App Router
- Tailwind CSS
- conexão com Supabase
- dashboard real lendo dados da tabela `projects`
- lista de projetos real
- tipos básicos
- estrutura organizada para evoluir o sistema

## Pré-requisitos
- Node.js 20+
- projeto no Supabase
- tabelas já criadas no banco
- massa inicial já carregada

## Instalação
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variáveis de ambiente
Preencha no `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Rotas iniciais
- `/` -> página inicial
- `/dashboard` -> dashboard executivo
- `/projects` -> lista de projetos
- `/projects/[code]` -> detalhe simples por código

## Próximos passos sugeridos
1. ativar autenticação
2. criar CRUD real de projetos
3. adicionar upload de documentos
4. criar detalhe completo do projeto
5. aplicar RLS por perfil

## Evolução incluída nesta versão
- CRUD básico de projetos
- /projects/new para criar projeto
- /projects/[code]/edit para editar projeto
- filtros de busca, status e visibilidade na lista

## Ajustes desta versão
- ordenação da lista por `created_at desc`
- insert/update com `.select()` para retorno confirmado
- refresh mais confiável após salvar


## Módulo incluído nesta versão
- nova rota `/projects/[code]/updates/new`
- formulário para criar atualização
- timeline real no detalhe do projeto
- separação entre update público e interno

## SQL recomendado para project_updates
Se o insert em `project_updates` não funcionar, rode no Supabase:

```sql
alter table project_updates enable row level security;

create policy "project_updates_select_test"
on project_updates
for select
to anon, authenticated
using (true);

create policy "project_updates_insert_test"
on project_updates
for insert
to anon, authenticated
with check (true);
```


## Módulo incluído nesta versão
- portal do morador em `/resident-portal`
- detalhe público em `/resident-portal/[code]`
- listagem apenas de projetos com `visibility = 'public'`
- timeline apenas de updates com `published_to_residents = true`


## Módulo incluído nesta versão
- repositório central em `/documents`
- documentos por projeto em `/projects/[code]/documents`
- cadastro de documento em `/projects/[code]/documents/new`
- documentos públicos exibidos no portal do morador

## SQL recomendado para documents
Se o insert em `documents` não funcionar, rode no Supabase:

```sql
alter table documents enable row level security;

create policy "documents_select_test"
on documents
for select
to anon, authenticated
using (true);

create policy "documents_insert_test"
on documents
for insert
to anon, authenticated
with check (true);
```


## Pacote combinado incluído nesta versão
- RFQ por projeto em `/projects/[code]/rfq`
- nova RFQ em `/projects/[code]/rfq/new`
- governança por projeto em `/projects/[code]/approvals`
- nova aprovação em `/projects/[code]/approvals/new`
- visões consolidadas em `/rfq` e `/governance`
- atalhos na tela de detalhe do projeto

## SQL recomendado
Se `rfqs`, `assemblies`, `approvals` ou `quotes` não permitirem gravação/leitura, rode no Supabase:

```sql
alter table rfqs enable row level security;
alter table assemblies enable row level security;
alter table approvals enable row level security;
alter table quotes enable row level security;
alter table vendors enable row level security;

create policy "rfqs_select_test" on rfqs for select to anon, authenticated using (true);
create policy "rfqs_insert_test" on rfqs for insert to anon, authenticated with check (true);

create policy "assemblies_select_test" on assemblies for select to anon, authenticated using (true);
create policy "assemblies_insert_test" on assemblies for insert to anon, authenticated with check (true);

create policy "approvals_select_test" on approvals for select to anon, authenticated using (true);
create policy "approvals_insert_test" on approvals for insert to anon, authenticated with check (true);

create policy "quotes_select_test" on quotes for select to anon, authenticated using (true);
create policy "vendors_select_test" on vendors for select to anon, authenticated using (true);
```


## Dashboard executivo incluído nesta versão
- logos do Reserva da Serra e F&F aplicados no layout
- logo Reserva no menu esquerdo
- logo F&F no cabeçalho direito
- dashboard executivo com:
  - indicadores da carteira
  - gráfico por status
  - exposição pública x interna
  - Gantt executivo resumido
  - bloco simplificado PERT/CPM
  - ranking de projetos com maior atenção
