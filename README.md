# Estação Marii

Catálogo digital da **Estação Marii** — embalagens, presentes e decorações — com
modos de compra **varejo** e **atacado**, carrinho e painel administrativo.
Interface mobile-first, pensada como referência de arquitetura de e-commerce.

> O checkout é **simulado** (demonstração). Cobrança real (Pix/cartão/boleto) exigiria
> um gateway de pagamento no CNPJ da loja.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4** com design tokens da marca
- **shadcn/ui** + **lucide-react**
- **Zustand** (estado) com persistência em `localStorage`

## Funcionalidades

- **Catálogo** com modo varejo/atacado, filtro por categoria e cards interativos
- **Carrinho** com cálculo de subtotal, economia no atacado e checkout simulado
- **Painel Admin** para criar, editar e excluir produtos (persiste no navegador)
- Navegação inferior estilo app no mobile, badge de carrinho e barra flutuante de pedido

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm start        # serve o build
```

## Estrutura

```
src/
  app/            # rotas: / (catálogo), /cart, /admin
  components/     # layout, catalog, cart, admin + ui (shadcn)
  store/          # Zustand: carrinho, catálogo, modo de compra
  lib/            # tipos, dados, regra de preço, formatação
```

## Deploy

Hospedado na **Vercel** (detecção automática do Next.js, sem configuração de build).
Cada `git push` na branch principal dispara um novo deploy.

## Evolução futura (referência)

A separação `store/` · `components/` · `lib/` foi pensada para plugar, sem refatorar a base:
persistência real (Supabase), pagamento (Stripe/Mercado Pago), autenticação do admin,
frete e controle de estoque.
