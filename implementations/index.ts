import {readFileSync, readdirSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {
  Implementation,
  type ImplementationConfig,
  type LocalConfig,
  type FilterByTagOptions,
  type FilterResult
} from '../src/lib/types.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

function loadJsonFiles(): ImplementationConfig[] {
  const files = readdirSync(__dirname)
    .filter(f => f.endsWith('.json'));
  return files.map(f => {
    const content = readFileSync(join(__dirname, f), 'utf-8');
    return JSON.parse(content) as ImplementationConfig;
  });
}

function getLocalConfig(): LocalConfig {
  const configPath = join(process.cwd(), 'localConfig.cjs');
  if(!existsSync(configPath)) {
    return {};
  }
  try {
    return require(configPath) as LocalConfig;
  } catch(e: unknown) {
    if((e as NodeJS.ErrnoException)?.code === 'MODULE_NOT_FOUND') {
      return {};
    }
    throw e;
  }
}

const remote = loadJsonFiles();
const localConfig = getLocalConfig();

export const localSettings = (Object.keys(localConfig).length > 0)
  ? {enableInteropTests: false, testAllImplementations: false,
    ...localConfig?.settings}
  : {enableInteropTests: true, testAllImplementations: true};

let local = localConfig?.implementations || [];
if(!Array.isArray(local)) {
  local = [local];
}

const all = remote.concat(local);

export const implementerFiles: ImplementationConfig[] = local.length
  ? (localSettings.testAllImplementations === true ? all : local)
  : all;

const keyValues: [string, Implementation][] = implementerFiles.map(
  config => [config.name, new Implementation(config)]
);

export const implementations = new Map<string, Implementation>(keyValues);
export const allImplementations = implementations;

export function filterImplementations({
  implementations = allImplementations,
  filter
}: {
  implementations?: Map<string, Implementation>;
  filter: (entry: {key: string; value: Implementation}) => boolean;
}): FilterResult {
  const match = new Map<string, Implementation>();
  const nonMatch = new Map<string, Implementation>();
  for(const [key, value] of implementations) {
    if(filter({key, value})) {
      match.set(key, value);
    } else {
      nonMatch.set(key, value);
    }
  }
  return {match, nonMatch};
}

export function filterByTag({
  implementations = allImplementations,
  tags = [],
  property = 'issuers'
}: FilterByTagOptions = {}): FilterResult {
  const filter = ({value}: {key: string; value: Implementation}) => {
    const endpoints = (value[property] as Array<{tags: Set<string>}>) || [];
    return endpoints.some(
      endpoint => tags.some(tag => endpoint.tags.has(tag))
    );
  };
  return filterImplementations({implementations, filter});
}
