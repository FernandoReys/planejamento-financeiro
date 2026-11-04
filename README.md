# Minhas dívidas

Aplicativo pessoal simples para guardar dívidas e calcular valores. Next.js, TypeScript e Supabase.

## Uso

- **Dívidas:** cadastre nome, total, quantidade de parcelas e primeiro vencimento opcional. Registre pagamentos parciais ou integrais e acompanhe o saldo restante. Dívidas quitadas ficam na aba Pagas.
- **Calculadora:** operações básicas, porcentagens e divisão exata em parcelas, com opção de transformar o resultado em dívida.
- Cada cadastro, edição e pagamento é salvo automaticamente ao confirmar. Falhas são informadas e não aparecem como gravações concluídas. É necessário estar conectado para salvar.
- Conta permite baixar backup JSON, desfazer pagamentos nos detalhes e sair.
- O login mantém o botão de mostrar senha e a opção de manter a sessão.

Os valores usam centavos inteiros. Parcelas recebem o ajuste de centavos nas primeiras posições para fechar o total. Pagamentos são alocados da primeira parcela em aberto em diante. As datas mensais respeitam o dia original, limitando ao último dia de meses curtos. Não há juros ou multas automáticos.

O documento financeiro anterior permanece no banco e no backup; a interface agora mostra somente as dívidas cadastradas neste formato. Nenhuma limpeza de dados acompanha esta atualização.

## Executar

Node.js 22.13+:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Configure no arquivo local e na Vercel:

| Variável | Valor |
| --- | --- |
| NEXT_PUBLIC_SUPABASE_URL | URL do projeto Supabase |
| NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY | Chave pública publishable |
| OWNER_EMAIL | E-mail proprietário autorizado |
| NEXT_PUBLIC_SITE_URL | URL de produção |

Não use service_role no frontend. O código não contém senhas ou dados financeiros pessoais.

## Banco e publicação

A tabela financial_state guarda um documento JSON por usuário. RLS limita leitura e escrita ao proprietário autenticado. O campo revision evita sobrescrever alterações de outra aba. As migrations em supabase/migrations documentam o esquema já aplicado; esta versão não exige nova migration.

Supabase Authentication deve usar o domínio publicado em Site URL e permitir /auth/confirm nas Redirect URLs. O primeiro acesso exige confirmação do e-mail. A rota principal exige sessão válida e o e-mail proprietário.

GitHub: https://github.com/FernandoReys/planejamento-financeiro

Produção: https://planejamento-financeiro-eight-olive.vercel.app

A Vercel publica a branch main automaticamente.

## Validação

```sh
npm test
npm run typecheck
npm run build
```

Testes cobrem cálculos em centavos, parcelas, pagamentos parciais, quitação, vencimentos mensais, pagamento duplicado, divisão por zero e expressões inválidas. A calculadora não executa código digitado. Os testes antigos do domínio financeiro são mantidos para compatibilidade dos dados anteriores.
