# Planejamento Financeiro

Aplicativo pessoal em **Next.js App Router, TypeScript, Tailwind CSS, Recharts e Supabase**. A interface mantém o tema escuro, cards verdes e roxos no desktop e saldo amarelo com navegação flutuante no celular.

## Situação da publicação

- Supabase: projeto `planejamento-financeiro`, região São Paulo (`sa-east-1`), organização CoinReys.
- Banco criado e migrations executadas; RLS por usuário e privilégios mínimos verificados. Nenhuma movimentação pessoal é pública.
- GitHub: código publicado em https://github.com/FernandoReys/planejamento-financeiro.
- Vercel: criação do projeto recusada pela conexão atual (403, sem permissão para criar projetos). Não há deploy Vercel concluído.
- A versão anterior hospedada no Sites é independente deste checkout Next.js.

## Executar no Windows / VS Code

Extraia o ZIP. Abra a pasta que contém `package.json` no VS Code. Node.js 22.13+.

```powershell
npm ci
Copy-Item .env.example .env.local
```

Preencha `.env.local` com a URL, chave **publishable**, e-mail proprietário e URL do site. Nenhuma chave `service_role` é necessária. Então:

```powershell
npm run dev
```

Acesse http://localhost:3000. Para produção local, `npm run build` e `npm start`.

## Supabase

Projeto criado: `iqgjckyjzlrbmotscpod`.

https://supabase.com/dashboard/project/iqgjckyjzlrbmotscpod

As migrations em `supabase/migrations/` já foram aplicadas neste projeto. Não execute novamente as instruções CREATE TABLE no mesmo banco. Elas servem para reproduzir o esquema em um projeto novo.

A tabela `financial_state` guarda um documento JSON por usuário com `user_id`, `revision` e `updated_at`. RLS usa `auth.uid()` para SELECT, INSERT e UPDATE. O papel anon não tem acesso. UPDATE confere a revisão carregada para evitar sobrescrever alterações de outra sessão. Não é ainda o esquema normalizado completo do briefing.

## Login e primeiro acesso

O app exige sessão Supabase confirmada e e-mail igual a `OWNER_EMAIL`. Os dados financeiros iniciais ficam na tabela protegida `financial_bootstrap`, visível apenas ao e-mail proprietário conforme o token assinado pelo Supabase. Nenhum dado financeiro pessoal fica no código-fonte ou nos testes. No primeiro login confirmado, o servidor copia a configuração privada para `financial_state`.

1. Configure a URL de produção em **Authentication → URL Configuration → Site URL**.
2. Autorize `https://SEU-DOMINIO/auth/confirm` e `http://localhost:3000/auth/confirm` nas Redirect URLs.
3. No site, abra **Primeiro acesso: criar minha conta**, usando o e-mail proprietário e uma senha de pelo menos 12 caracteres.
4. Confirme o e-mail. Caso o template padrão não retorne ao app, configure a URL e o template conforme a documentação Supabase antes de repetir.
5. Entre e, após alterações financeiras, clique em **Salvar e sincronizar**. A gravação ainda é manual.

Não registre senhas ou tokens no GitHub. A configuração `OWNER_EMAIL` é apenas server-side. Para recuperação de senha, use inicialmente o painel Supabase; a tela de recuperação ainda não foi implementada.

## GitHub

Crie um repositório chamado `planejamento-financeiro`, sem README automático se for usar Git local. Na raiz deste projeto:

```powershell
git init
git add .
git commit -m "Aplicativo financeiro com Next.js e Supabase"
git branch -M main
git remote add origin https://github.com/FernandoReys/planejamento-financeiro.git
git push -u origin main
```

Use a autenticação normal do GitHub; nunca coloque um token no endereço do remote. O `.gitignore` exclui `.env.local`, dependências e builds.

## Vercel

Importe o repositório pela integração GitHub na equipe `fernando-8621`. Framework: **Next.js**, pasta raiz: a pasta com `package.json`, instalação: `npm ci`, build: `npm run build`. Defina:

| Variável | Conteúdo |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Chave pública publishable |
| `OWNER_EMAIL` | E-mail proprietário |
| `NEXT_PUBLIC_SITE_URL` | URL definitiva da aplicação, sem barra final |

Publicar o frontend não publica os dados financeiros: a página exige login e as políticas do banco isolam cada usuário. O código pode ser público; os dados pessoais iniciais ficam exclusivamente no banco. Os testes utilizam valores sintéticos.

## Recursos implementados

- Dashboard e gráficos a partir dos valores cadastrados.
- Edição de receitas/despesas mensais, antecipação opcional e pagamentos sem duplicar o mesmo mês.
- Saldo em centavos inteiros; previsão diária, cenários e alerta de informações incompletas.
- Feriados nacionais, Sexta-feira Santa e feriados locais manuais.
- Obrigações separadas do veículo; contagem das parcelas explicitamente pendente.
- Simulações de poupança, pagamento ao irmão e compra.
- Reserva, CSV, impressão/PDF e backup JSON.
- Login Supabase com cookies, renovação de sessão e persistência manual com controle de versão.
- Manifesto PWA e cache de recursos estáticos. Não há fila offline de lançamentos.
- Assistente determinístico local, sem modelo de IA externo.

## Limitações conhecidas

O app ainda não implementa o conjunto completo do briefing: INSS/IRRF e médias do 13º, notificações push, uploads de comprovantes, Excel nativo, parcelamento genérico, gráficos anuais completos e IA externa. A base provisória do 13º não entra no caixa. Despesas sem data não entram no calendário diário. A contagem das parcelas precisa ser confirmada antes de fechar o cronograma do veículo. Alterações de valores não reescrevem um histórico contábil. Metas são informativas e não fazem transferências automáticas.

A data e o mês de referência da interface inicial continuam novembro/2026. A previsão do financiamento precisa ser delimitada após a confirmação da contagem. O acordo particular segue as datas cadastradas; simulações não alteram esse cronograma. Não utilizar como único registro financeiro antes de validar o fluxo real de login, gravação, recarga e recuperação em outro dispositivo.

## Validação

```powershell
npm test
npm run typecheck
npm run build
```

Nove verificações financeiras, TypeScript e build Next.js passaram. Banco: existência da tabela, RLS, políticas de propriedade, privilégios e advisors de segurança verificados. O teste end-to-end de login/gravação continua pendente da conta proprietária e publicação.
