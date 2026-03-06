# Gumroad CLI & SDK

A production-ready **pnpm monorepo** containing a typed SDK client for the Gumroad API and a companion CLI tool.

## Packages

| Package | Description |
|---------|-------------|
| [`@gumroad/sdk`](./packages/sdk) | Zero-dependency typed HTTP client for the Gumroad API v2 |
| [`gumroad-cli`](./packages/cli) | CLI tool (`gr`) built on top of the SDK |

## Installation

### CLI (global)

```bash
npm install -g gumroad-cli
```

### SDK (as a library)

```bash
npm install @gumroad/sdk
```

## Authentication

```bash
# Interactive
gr auth login

# Non-interactive (AI-friendly)
gr auth login --with-token YOUR_ACCESS_TOKEN

# Check status
gr auth status
```

## Common CLI Commands

### Products

```bash
# List all products
gr products list

# Get a specific product
gr products get <product-id>

# Create a product
gr products create --name "My Product" --price 500

# Update a product
gr products update <product-id> --name "New Name" --price 1000

# Delete a product
gr products delete <product-id> --confirm
```

### Sales

```bash
# List sales
gr sales list
gr sales list --product-id <id> --after 2024-01-01

# Get a single sale
gr sales get <sale-id>
```

### Subscribers

```bash
gr subscribers list --product-id <id>
```

### Licenses

```bash
# Verify a license key
gr licenses verify --product-permalink my-product --license-key ABCD-1234

# Enable a license
gr licenses enable <license-id>
```

### Offers

```bash
# List offers
gr offers list --product-id <id>

# Create an offer
gr offers create --product-id <id> --name "SUMMER50" --amount-off 500

# Delete an offer
gr offers delete <offer-id> --product-id <id>
```

## JSON Output

Every command supports `--json` for machine-readable output:

```bash
gr products list --json | jq '.[0].name'
gr sales list --json | jq '.[] | {id, email, price}'
```

Status/info messages go to `stderr`, data goes to `stdout` — so piping to `jq` works cleanly.

## SDK Usage

```typescript
import { GumroadClient } from "@gumroad/sdk";

const client = new GumroadClient({
  accessToken: "YOUR_ACCESS_TOKEN",
});

// List products
const products = await client.products.list();
console.log(products);

// Get a sale
const sale = await client.sales.get("sale-id");
console.log(sale);

// Verify a license
const result = await client.licenses.verify({
  product_permalink: "my-product",
  license_key: "ABCD-1234",
});
console.log(result);
```

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | General / API error |
| `2` | Auth error (no token / 401) |
| `3` | Not found (404) |
| `4` | Validation error (bad CLI args) |

## Contributing

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run all tests
pnpm test

# Type check
pnpm typecheck
```

### Project Structure

```
gumroad/
├── packages/
│   ├── sdk/          # @gumroad/sdk
│   └── cli/          # gumroad-cli
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.base.json
├── .eslintrc.base.js
└── .prettierrc
```

## License

MIT
