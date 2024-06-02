import { MetaData } from "@/types/meta";

export type PaginatedResponse<T> = {
  data: T[];
  meta: MetaData;
};
