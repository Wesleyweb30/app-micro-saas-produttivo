import { httpProduttivo } from "../../http";
import { buildQuery } from "./utils/build-query";

export interface FormFillFilters {
  accountId?: number;
  formIds?: number[];
  userIds?: number[];
  workId?: number;
  rangeTime?: string; // "01/06/2025 - 31/12/2025"
  orderType?: 'asc' | 'desc';
}


export async function listFormFillsByWork(
  workId: number
): Promise<any[]> {
  const res = await httpProduttivo(
    `/form_fills?work_id=${workId}&order_type=desc`
  );

  return res!.results;
}

export async function listFormFills(
  filters: FormFillFilters = {}
): Promise<any[] | any> {

  const query = buildQuery({
    account_id: filters.accountId,
    work_id: filters.workId,
    'form_fill[form_ids][]': filters.formIds,
    'form_fill[user_ids][]': filters.userIds,
    range_time: filters.rangeTime,
    order_type: filters.orderType ?? 'desc',
  });

  const res = await httpProduttivo(
    `/form_fills?${query}`
  );

  return res;
}

// export async function listFormFillsTeste() {
//   const res = await httpProduttivo(`form_fills?account_id=166569&form_fill[form_ids][]=356263&form_fill[user_ids][]=319201&form_fill[user_ids][]=310344&range_time=01/06/2025 - 31/12/2025&order_type=desc`);
//   return res?.results || [];
// }

export async function getFormFillById(id: number): Promise<any> {
  const res = await httpProduttivo(`form_fills/${id}`);
  return res;
}