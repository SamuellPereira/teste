import { supabase } from "../../lib/supabaseClient";

export async function getServerSideProps(context) {
  const { dominio } = context.params;

  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("dominio", dominio)
    .single();

  if (error || !data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { site: data },
  };
}

export default function Site({ site }) {
  return (
    <div
      style={{
        background: site.tema === "escuro" ? "#222" : "#fff",
        color: site.tema === "escuro" ? "#fff" : "#000",
        padding: "20px",
      }}
    >
      <h1>{site.nome}</h1>
      <p>{site.conteudo_home}</p>
    </div>
  );
}
