import { spawnSync } from 'child_process';

const [, , command, service, ...args] = process.argv;

if (!command || !service) {
  console.error(`
Usage:

npm run migration:generate -- user CreateUsers
npm run migration:run -- user
npm run migration:revert -- user
`);

  process.exit(1);
}

const dataSource = `apps/${service}-service/data-source.ts`;
const migrationsPath = `apps/${service}-service/migrations`;

const commands: Record<string, string[]> = {
  generate: [
    'migration:generate',
    '-d',
    dataSource,
    `${migrationsPath}/${args[0]}`,
  ],

  run: [
    'migration:run',
    '-d',
    dataSource,
  ],

  revert: [
    'migration:revert',
    '-d',
    dataSource,
  ],

  show: [
    'migration:show',
    '-d',
    dataSource,
  ],

  create: [
    'migration:create',
    `${migrationsPath}/${args[0]}`,
  ],
};

if (!commands[command]) {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}

spawnSync(
  'npx',
  ['typeorm-ts-node-commonjs', ...commands[command]],
  {
    stdio: 'inherit',
    shell: true,
  },
);