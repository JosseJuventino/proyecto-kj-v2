// src/utils.ts

function capitalizarLetras(nombre: string): string {
  return nombre.toLowerCase().replace(/\b\w/g, (letra) => letra.toUpperCase());
}

export function cutName(completeName: string): string {
  const partesNombre = completeName.split(" ");

  const primerNombre = partesNombre[0];
  const primerApellido =
    partesNombre.length > 1 ? partesNombre[partesNombre.length - 2] : "";
  const nombreDepurado = capitalizarLetras(primerNombre + " " + primerApellido);
  return nombreDepurado;
}
