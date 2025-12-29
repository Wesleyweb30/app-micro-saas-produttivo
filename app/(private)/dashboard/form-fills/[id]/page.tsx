import { getFormFillById, listFormFillsByWork} from "@/modules/produttivo/services/produttivo/form_fills.service";
import { getWorkById } from "@/modules/produttivo/services/produttivo/work.service";

interface FormFillProps {
  params: {
    id: string;
  };
}

export default async function FormFillPage(props: FormFillProps): Promise<any> {
  const params = await props.params;
  const formFillData = await getFormFillById(parseInt(params.id));
  // console.log("formFillData", formFillData);
  const dataWork = await getWorkById(formFillData.work_id);
  console.log("Work", dataWork);
  
  const dataFormWork = await listFormFillsByWork(dataWork.id);
  console.log("dataFormWork", dataFormWork);

  
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <header className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-slate-800">
            ABRIGO  #{dataWork.title.match(/\d+/g)?.pop() ?? ""}
          </h1>

          <p className="text-slate-500 mt-1">
            {formFillData.title}
          </p>


        </header>

        {/* Campos do formulário */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Dados do Formulário
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFillData.field_values.map((field: any) => (

              <FieldItem
                key={field.id}
                label={field.name}
                value={field.value}
              />
            ))}
          </div>
        </section>

        {/* Rodapé técnico */}
        <footer className="text-xs text-slate-400">
          UUID: {formFillData.uuid}
        </footer>
      </div>
    </div>
  );
}

/* =======================
   COMPONENTES AUXILIARES
======================= */

function Info({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-slate-400">{label}</p>
      <p className="font-medium text-slate-700">
        {value ?? "-"}
      </p>
    </div>
  );
}

function FieldItem({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  const isDate = value && !isNaN(Date.parse(value));


  return (
    <div className="border rounded-lg p-4">
      <p className="text-xs uppercase text-slate-400 mb-1">{label} </p>
      <p className="text-slate-700">
        {value ? (isDate ? formatDate(value) : value) : "-"}
      </p>

    </div>
  );
}

function formatDate(date?: string) {
  if (!date) return "-";
  return new Date(date).toLocaleString("pt-BR");
}
