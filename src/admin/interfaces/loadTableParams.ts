export interface LoadTableParams {
  start?: number;
  length?: number;
  search?: string;
  order?: Record<string, 'ASC' | 'DESC'>;
}
