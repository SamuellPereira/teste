import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [site, setSite] = useState(null);
  const [conteudo, setConteudo] = useState("");

  useEffect(() => {
    const fetchSite = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("sites")
        .select("*")
        .eq("owner", user.id)
        .single();

      if (!error && data) {
        setSite(data);
        setConteudo(data.conteudo_home);
      }
    };
    fetchSite();
  }, []);

  const salvar = async () => {
    if (!site) return;
    const { error } = await supabase
      .from("sites")
      .update({ conteudo_home: conteudo })
      .eq("id", site.id);
    if (error) alert(error.message);
    else alert("Site atualizado!");
  };

  if (!site) return <p>Carregando site...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Editar {site.nome}</h1>
      <textarea
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
        rows={5}
        cols={40}
      />
      <br />
      <button onClick={salvar}>Salvar alterações</button>
    </div>
  );
}
