// importaciones
import { mostrarTrending } from '../js/index.js'


// aqui esta el callback que usaremos en IntersectionObserver mas abajo
const inViewPort = ([e]) =>{
    // isIntersecting quiere decir esta en pantalla
    // dentro del e que es un evento esta la informacion contenida en un array
    // lo que hacemos con el evento es destructuring para obtener con los corchetes y nos entrega solo el objeto
    // cambia de falso a verdadero una vez te posicionas en el objeto

    // capturamos el valor de isIntersecting
    const {isIntersecting, target} = e
    if (isIntersecting) {
        console.log('la ultima imagen esta en pantalla');
        mostrarTrending()
        // con esta funcion no estaria siendo observado nuevamente el primer elemento
        observer.unobserve(target)
    }
}
// aqui instanciamos IntersectionObserver
const observer = new IntersectionObserver(inViewPort)
// esto crea un obvservador en el nodo que queremos del html
export const getObserver = (nodo) =>{
    observer.observe(nodo)
}