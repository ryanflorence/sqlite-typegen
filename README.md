# sqlite-typegen

A lightweight utility to automatically generate TypeScript types from SQLite database schemas. Helps maintain type safety between your database and TypeScript code.

## Features

- 🚀 Automatic type generation from SQLite schemas
- 💪 TypeScript support
- 🎯 Handles nullable columns
- 🛠 Both CLI and programmatic API
- 📝 Configurable type namespace

## Installation

```bash
npm install -D @ryanflorence/sqlite-typegen
```

## CLI Usage

The command-line interface provides a simple way to generate types from your SQLite database:

```bash
sqlite-typegen <database-path> [options]
```

### Options

- `-o, --out <path>` - Write output to a file instead of stdout
- `-n, --namespace <name>` - Custom namespace for generated types (default: "DB")
- `-h, --help` - Show help message

### Examples

Generate types and output to console:

```bash
sqlite-typegen ./database.sqlite
```

Generate types and save to file:

```bash
sqlite-typegen ./database.sqlite -o src/types/db.ts
```

Use custom namespace:

```bash
sqlite-typegen ./database.sqlite -n MyDatabase -o types.ts
```

## Programmatic Usage

You can also use the type generator programmatically in your code:

```typescript
import { generate } from "sqlite-typegen";

// Generate types as a string
let types = generate("./database.sqlite", "MyDB");

// Now you can do whatever you want with the generated types
console.log(types);
fs.writeFileSync("types.ts", types);
```

### API

#### `generate(dbPath: string, namespace?: string): string`

Generates TypeScript types from a SQLite database schema.

- `dbPath`: Path to your SQLite database file
- `namespace`: Optional name for the generated type namespace (default: "DB")
- Returns: String containing the generated TypeScript types

## Type Mappings

SQLite types are mapped to TypeScript types as follows:

| SQLite Type | TypeScript Type |
| ----------- | --------------- |
| INTEGER     | number          |
| REAL        | number          |
| TEXT        | string          |
| BLOB        | Buffer          |
| BOOLEAN     | boolean         |
| DATETIME    | Date            |
| NUMERIC     | number          |
| VARCHAR     | string          |
| CHAR        | string          |

## Example Output

For a database with a `users` table, the generated types might look like:

```typescript
export namespace SQLiteSchema {
  export type users = {
    id: number;
    name: string;
    email: string;
    created_at?: Date; // nullable columns become optional
  };
}
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
