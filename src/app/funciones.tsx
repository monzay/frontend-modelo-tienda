export function redirecionar(ruta: string, router: any) {
    router.push(ruta);
}

export function obtenerToken(nombre:string) {
  return localStorage.getItem(nombre);
}