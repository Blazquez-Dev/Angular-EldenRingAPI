/** Entidad genérica: cada categoría añade campos distintos, por eso hay índice abierto. */
export interface EldenEntity {
  id: string;
  name: string;
  image?: string | null;
  description?: string | null;
  [key: string]: unknown;
}

export interface EldenListResponse {
  success: boolean;
  count: number;
  total?: number;
  data: EldenEntity[];
}

export interface EldenDetailResponse {
  success: boolean;
  data: EldenEntity | EldenEntity[];
}
