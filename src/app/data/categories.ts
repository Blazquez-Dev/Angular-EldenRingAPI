export interface Category {
  key: string;      // segmento de la API: /api/{key}
  label: string;    // nombre en plural (menú)
  singular: string; // nombre en singular (detalle)
  icon: string;
  blurb: string;
}

export const CATEGORIES: Category[] = [
  { key: 'weapons',     label: 'Armas',          singular: 'Arma',            icon: '🗡️', blurb: 'Espadas, hachas, lanzas y más' },
  { key: 'armors',      label: 'Armaduras',      singular: 'Armadura',        icon: '🪖', blurb: 'Protección para los Sinluz' },
  { key: 'shields',     label: 'Escudos',        singular: 'Escudo',          icon: '🛡️', blurb: 'Defiéndete de cualquier golpe' },
  { key: 'bosses',      label: 'Jefes',          singular: 'Jefe',            icon: '👹', blurb: 'Los guardianes de las Tierras Intermedias' },
  { key: 'creatures',   label: 'Criaturas',      singular: 'Criatura',        icon: '🐺', blurb: 'Bestias que acechan en la oscuridad' },
  { key: 'npcs',        label: 'NPCs',           singular: 'Personaje',       icon: '🧙', blurb: 'Aliados, mercaderes y traidores' },
  { key: 'locations',   label: 'Localizaciones', singular: 'Localización',    icon: '🗺️', blurb: 'Mazmorras, regiones y castillos' },
  { key: 'classes',     label: 'Clases',         singular: 'Clase',           icon: '⚔️', blurb: 'El origen de tu viaje' },
  { key: 'sorceries',   label: 'Hechicerías',    singular: 'Hechicería',      icon: '🔮', blurb: 'Magia de la Academia' },
  { key: 'incantations',label: 'Conjuros',       singular: 'Conjuro',         icon: '✨', blurb: 'Fe, oraciones y milagros' },
  { key: 'spirits',     label: 'Espíritus',      singular: 'Espíritu',        icon: '👻', blurb: 'Cenizas que combaten a tu lado' },
  { key: 'ashes',       label: 'Cenizas de guerra', singular: 'Ceniza de guerra', icon: '🔥', blurb: 'Habilidades para tus armas' },
  { key: 'talismans',   label: 'Talismanes',     singular: 'Talismán',        icon: '💍', blurb: 'Amuletos de gran poder' },
  { key: 'ammos',       label: 'Munición',       singular: 'Munición',        icon: '🏹', blurb: 'Flechas y virotes' },
  { key: 'items',       label: 'Objetos',        singular: 'Objeto',          icon: '🎒', blurb: 'Consumibles, llaves y tesoros' },
];

export const CATEGORY_MAP: Record<string, Category | undefined> = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c])
);
