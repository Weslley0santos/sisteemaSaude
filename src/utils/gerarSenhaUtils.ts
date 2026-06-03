export const gerarSenha = () => {
  const numero = Math.floor(100 + Math.random() * 900);

  return `A-${numero}`;
};
