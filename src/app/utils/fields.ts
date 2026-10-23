/**
 * Convierte cualquier entidad de la API en "campos" listos para pintar,
 * así el detalle muestra TODOS los datos aunque cada categoría tenga un esquema distinto.
 */
export interface Row { name: string; value: string; }
export interface Field {
  label: string;
  kind: 'text' | 'tags' | 'stats';
  text?: string;
  tags?: string[];
  rows?: Row[];
}

const HIDDEN = new Set(['id', 'name', 'image', 'description']);

const LABELS: Record<string, string> = {
  category: 'Categoría', weight: 'Peso', attack: 'Ataque', defence: 'Defensa',
  requiredAttributes: 'Atributos requeridos', scalesWith: 'Escalado', location: 'Localización',
  region: 'Región', drops: 'Botín', healthPoints: 'Puntos de vida', effect: 'Efecto',
  effects: 'Efectos', cost: 'Coste', slots: 'Ranuras', requires: 'Requisitos',
  fpCost: 'Coste de FP', hpCost: 'Coste de PV', role: 'Rol', quote: 'Cita',
  stats: 'Estadísticas', dmgNegation: 'Absorción de daño', resistance: 'Resistencias',
  type: 'Tipo', affinity: 'Afinidad', skill: 'Habilidad', scaling: 'Escalado',
  weakness: 'Debilidades', found: 'Encontrado en', level: 'Nivel', vigor: 'Vigor',
  mind: 'Mente', endurance: 'Aguante', strength: 'Fuerza', dexterity: 'Destreza',
  intelligence: 'Inteligencia', faith: 'Fe', arcane: 'Arcano',
};

export function humanize(key: string): string {
  if (LABELS[key]) return LABELS[key];
  const spaced = key.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

function str(v: unknown): string {
  if (v === null || v === undefined) return '';
  return typeof v === 'object' ? JSON.stringify(v) : String(v);
}

function rowFrom(o: Record<string, unknown>): Row {
  const entries = Object.entries(o).filter(([, v]) => v !== null && v !== undefined && v !== '');
  if ('name' in o) {
    return {
      name: str(o['name']),
      value: entries.filter(([k]) => k !== 'name').map(([, v]) => str(v)).join(' · '),
    };
  }
  return { name: entries.map(([k, v]) => `${humanize(k)}: ${str(v)}`).join(' · '), value: '' };
}

export function buildFields(entity: Record<string, unknown>): Field[] {
  const out: Field[] = [];
  for (const [key, value] of Object.entries(entity)) {
    if (HIDDEN.has(key) || value === null || value === undefined || value === '') continue;
    const label = humanize(key);

    if (Array.isArray(value)) {
      if (!value.length) continue;
      if (value.every((v) => typeof v !== 'object' || v === null)) {
        out.push({ label, kind: 'tags', tags: value.map(str) });
      } else {
        const rows = value.filter(isObj).map(rowFrom);
        if (rows.every((r) => r.value === '')) {
          out.push({ label, kind: 'tags', tags: rows.map((r) => r.name) });
        } else {
          out.push({ label, kind: 'stats', rows });
        }
      }
    } else if (isObj(value)) {
      const rows = Object.entries(value)
        .filter(([, v]) => v !== null && v !== undefined && v !== '')
        .map(([k, v]) => ({ name: humanize(k), value: str(v) }));
      if (rows.length) out.push({ label, kind: 'stats', rows });
    } else {
      out.push({ label, kind: 'text', text: str(value) });
    }
  }
  return out;
}
