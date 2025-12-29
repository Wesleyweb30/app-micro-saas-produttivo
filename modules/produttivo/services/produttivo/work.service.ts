import { httpProduttivo } from "../../http";

// export interface Work {
//   id: number
//   title: string
//   status: string
//   created_at: string
// }

// function buildQuery(filters: WorksFilter) {
//   const params = new URLSearchParams();

//   params.set('include_team_works', 'true');

//   if (filters.q) params.set('q', filters.q);
//   if (filters.page) params.set('page', String(filters.page));
//   if (filters.formId) params.set('form_id', String(filters.formId));
//   if (filters.startedRange)
//     params.set('started_range_time', filters.startedRange);

//   filters.statuses?.forEach(s =>
//     params.append('statuses[]', s)
//   );

//   return params.toString();
// }

export async function listWorks(): Promise<any[]> {
  const res = await httpProduttivo("works");
  return res!.results;
  
}

export async function getWorkById(id: number): Promise<any> {
  const res = await httpProduttivo(`works/${id}`);
  return res;
}