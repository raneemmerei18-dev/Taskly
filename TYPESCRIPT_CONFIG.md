# TypeScript Configuration Details

## Backend tsconfig.json

Key settings:

- `target: ES2021` - Use modern JavaScript features
- `module: commonjs` - Node.js compatible modules
- `strict: true` - Strict null/undefined checking
- `esModuleInterop: true` - Compatibility with CommonJS modules
- `declaration: true` - Generate .d.ts files
- `sourceMap: true` - Debug original TypeScript in production

## Frontend tsconfig.json

Key settings:

- `target: ES2020` - Browser-compatible JavaScript
- `module: ESNext` - Modern module syntax
- `lib: [ES2020, DOM, DOM.Iterable]` - Include browser APIs
- `noEmit: true` - Vite handles compilation
- `jsx: preserve` - For Vue templates

## Type Safety

### Backend Example
```typescript
// DTOs enforce types
export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

// Service method is type-safe
async register(dto: RegisterDto) {
  // TypeScript ensures only string properties exist
  const user = await this.create(dto.email, dto.password);
}
```

### Frontend Example
```typescript
// Interfaces define expected API responses
interface Task {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

// Service returns typed data
async getTasks(): Promise<Task[]> {
  // Return type must match Task[]
}
```

## Benefits

- ✅ Catch errors at development time
- ✅ IDE autocompletion
- ✅ Self-documenting code
- ✅ Refactoring with confidence
- ✅ No runtime type errors
