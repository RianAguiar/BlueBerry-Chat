import { useState, useEffect } from "react";

export default function Posts() {
  // Estado do formulário
  const [titulo, setTitulo] = useState("");

  // Estado que armazenará os posts vindos da API
  const [posts, setPosts] = useState([]);

  // --------------------------
  // Buscar posts
  // --------------------------
  async function buscarPosts() {
    try {
      const resposta = await fetch("http://localhost:8000/posts/");

      if (!resposta.ok) {
        throw new Error("Erro ao buscar posts");
      }

      const dados = await resposta.json();

      setPosts(dados);
    } catch (erro) {
      console.log(erro);
    }
  }

  // Executa apenas quando o componente é carregado
  useEffect(() => {
    buscarPosts();
  }, []);

  // --------------------------
  // Enviar novo post
  // --------------------------
  async function enviar(e) {
    e.preventDefault();

    try {
      const resposta = await fetch("http://localhost:8000/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
        }),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao criar post");
      }

      const novoPost = await resposta.json();

      console.log(novoPost);

      // Limpa o input
      setTitulo("");

      // Atualiza a lista
      buscarPosts();

    } catch (erro) {
      console.log(erro);
    }
  }












  
  return (
    <div>

      <h1>Lista de Posts</h1>

      <form onSubmit={enviar}>

        <input
          type="text"
          placeholder="Digite um título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <button type="submit">
          Salvar
        </button>

      </form>

      <hr />

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.titulo}</h3>
        </div>
      ))}

    </div>
  );
}