export interface Query {
  [key: string]: string | string[] | number | boolean | undefined;
}

export type TSearchParams = Promise<{
  [key: string]: string | string[] | number | boolean | undefined;
}>;

export type ChangeInput =
  | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  | { name: string; value: string };

export type TPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
