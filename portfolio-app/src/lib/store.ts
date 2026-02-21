import fs from 'fs/promises';
import path from 'path';
import { Portfolio } from './types';

const dataPath = path.resolve(process.cwd(), 'src', 'data', 'portfolios.json');

async function readStore(): Promise<Portfolio[]> {
  try {
    const raw = await fs.readFile(dataPath, 'utf-8');
    const parsed = JSON.parse(raw) as Portfolio[];
    return parsed.map((p) => ({ ...p, createdAt: new Date(p.createdAt), updatedAt: new Date(p.updatedAt) }));
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && err.code === 'ENOENT')
      return [];
    throw err;
  }
}

async function writeStore(items: Portfolio[]) {
  const payload = JSON.stringify(items, null, 2);
  await fs.writeFile(dataPath, payload, 'utf-8');
}

export async function getPortfolios(): Promise<Portfolio[]> {
  return readStore();
}

export async function getPortfolioById(id: string): Promise<Portfolio | null> {
  const items = await readStore();
  return items.find((p) => p.id === id) ?? null;
}

export async function createPortfolio(data: Partial<Portfolio>): Promise<Portfolio> {
  const items = await readStore();
  const now = new Date();
  const newItem: Portfolio = {
    id: (data.id as string) ?? `p-${Math.random().toString(36).slice(2, 9)}`,
    userId: (data.userId as string) ?? 'unknown',
    domainId: (data.domainId as string) ?? 'engineer',
    slug: (data.slug as string) ?? 'untitled',
    title: (data.title as string) ?? 'Untitled',
    overview: (data.overview as string) ?? '',
    sections: (data.sections as Portfolio['sections']) ?? [],
    theme: (data.theme as 'light' | 'dark') ?? 'light',
    createdAt: now,
    updatedAt: now,
    isPublished: (data.isPublished as boolean) ?? false,
  };
  items.push(newItem);
  await writeStore(items);
  return newItem;
}

export async function updatePortfolio(id: string, patch: Partial<Portfolio>): Promise<Portfolio | null> {
  const items = await readStore();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated = { ...items[idx], ...patch, updatedAt: new Date() } as Portfolio;
  items[idx] = updated;
  await writeStore(items);
  return updated;
}

export async function deletePortfolio(id: string): Promise<boolean> {
  const items = await readStore();
  const filtered = items.filter((p) => p.id !== id);
  if (filtered.length === items.length) return false;
  await writeStore(filtered);
  return true;
}