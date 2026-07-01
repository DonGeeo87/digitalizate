const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const DIR = 'E:\\Projects\\Coding\\digitalizate'
process.chdir(DIR)

// 1. Clean
try { fs.rmSync('node_modules', { recursive: true, force: true }) } catch {}
try { fs.unlinkSync('package-lock.json') } catch {}

// 2. Update package.json for Tailwind v3
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
pkg.dependencies = {
  "next": "16.2.9",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "lucide-react": "^1.23.0",
  "sonner": "^2.0.7",
  "tailwind-merge": "^3.6.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "next-themes": "^0.4.6",
}
pkg.devDependencies = {
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "typescript": "^5",
  "eslint": "^9",
  "eslint-config-next": "16.2.9",
  "tailwindcss": "^3.4.0",
  "postcss": "^8",
  "autoprefixer": "^10",
}
delete pkg.dependencies['@base-ui/react']
delete pkg.dependencies['@tailwindcss/postcss']
delete pkg.dependencies['@tailwindcss/node']
delete pkg.dependencies['@tailwindcss/oxide']
delete pkg.dependencies['tw-animate-css']
delete pkg.devDependencies['postcss']
delete pkg.devDependencies['tailwindcss']

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2))

// 3. Install
console.log('Installing Tailwind v3...')
execSync('npm install --ignore-scripts', { stdio: 'inherit', shell: 'cmd.exe', cwd: DIR })
execSync('npm install --save-dev tailwindcss@3 postcss autoprefixer --ignore-scripts', { stdio: 'inherit', shell: 'cmd.exe', cwd: DIR })
execSync('npm install next react react-dom', { stdio: 'inherit', shell: 'cmd.exe', cwd: DIR })

// 4. Update next dep
execSync('npm install next@16.2.9', { stdio: 'inherit', shell: 'cmd.exe', cwd: DIR })

// 5. Create tailwind.config.js
fs.writeFileSync('tailwind.config.js', `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './src/**/*.css'],
  theme: {
    extend: {
      colors: {
        brand: '#10b981',
        'brand-dark': '#059669',
        'brand-light': '#34d399',
        'brand-bg': '#ecfdf5',
      },
    },
  },
  plugins: [],
}
`)

// 6. Create postcss.config.js
fs.writeFileSync('postcss.config.js', `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`)

// 7. Update globals.css for TW3
fs.writeFileSync('src/app/globals.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --card: #ffffff;
  --card-foreground: #0f172a;
  --primary: #10b981;
  --primary-foreground: #ffffff;
  --border: #e2e8f0;
  --ring: #10b981;
  --radius: 0.75rem;
}

@layer base {
  * { @apply border-border; }
  body { @apply text-foreground min-h-screen antialiased bg-gradient-to-br from-slate-50 via-white to-emerald-50; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.15); }
  50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.3); }
}
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
.text-balance { text-wrap: balance; }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
`)

// 8. Install base-ui for shadcn components
execSync('npm install @base-ui/react@1.6.0', { stdio: 'inherit', shell: 'cmd.exe', cwd: DIR })

// 9. Build
console.log('\n=== BUILD ===')
execSync('npm run build', { stdio: 'inherit', shell: 'cmd.exe', cwd: DIR })

console.log('\n✅ BUILD EXITOSO!')