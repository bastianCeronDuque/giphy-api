// Importaciones 
import { getObserver } from '../src/observer.js'

// variables
const urlApi = 'https://api.giphy.com/v1/gifs/search'
const key = '?api_key=TTqACZPvB6EvuUOOMYHOuIjo5m9wm0y9'
const trending = 'https://api.giphy.com/v1/gifs/trending'
const limit = '&limit=20'

// offset es el momento en el que comienza la busqueda 
let offset = 0

// Capturamos el localstorage
const localS = () =>{
    return JSON.parse(localStorage.getItem('lastSearch'))
}

// nodos html
const button = document.getElementById('serch__form')

const printPlace = document.getElementById('print__place');

// configuracion de las imagenes
const figures = document.getElementById('print__place')
const figure = (props) =>{

    const {id, url} = props
    const figure = document.createElement('figure');
    const img = document.createElement('img');

    img.src = props.images.original.url
    img.alt = props.title
    figure.className = 'main__gifs__container-img';
    figure.appendChild(img);
    return figure
}

// get data desde API
const getData = async(palabra) =>{
    const res = await fetch(`${urlApi}${key}&q=${palabra}${limit}`)
    const { data } = await res.json()
    
    printPlace.append(...getRenderTendencia(data));
}
const getRenderTendencia = data => data.map(gift => figure(gift));

// funcion principal de la promesa crear elemento
const principalFunction = async e => {
	e.preventDefault();
	
	// getting input value
	const input = document.getElementById('input').value;
	
	if(!input) return;

	// Fetching data on a function
	await getData(input);
};
// funcion para cargar los trendings
const loadFunction = async()=>{
    const res = await fetch(`${trending}${key}${limit}&offset=${offset}`)
    const { data } = await res.json()
    // con offset cargamos nuevas imagenes sumando a cada momento que 
    offset += 20
    // console.log(data);
    return data
}

// funcion para mostrar los gifs
export const mostrarTrending = async ()=>{
    const data = await loadFunction()
    // tomamos la ultima imagen 
    const lastImg = data.pop()
    const lastImgTemplate = figure(lastImg)
    // llamamos a nuestra funcion de obversador y le pasamos la imagen que habiamos tomado
    getObserver(lastImgTemplate)
    console.log(lastImgTemplate, data.length);

    const templates = data.map((img) => figure(img))
    figures.append(...templates)
    figures.append(lastImgTemplate)

    // datos desde localStorage
    // const dataLocal = localS()
    // if (!dataLocal) {
    //     console.log('estoy vacio');
    //     localStorage.setItem('lastSearch', JSON.stringify(templates))
    // }else{
    //     dataLocal.push(...templates)
    //     localStorage.setItem('lastSearch', JSON.stringify(dataLocal))
    // }
}


// Addeventlistener
button.addEventListener('click', principalFunction)
window.addEventListener('load', loadFunction)
window.addEventListener('load', mostrarTrending)