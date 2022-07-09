const objProducto = [
{id: "1", categoria: 'sonido',name : 'IPod', description: 'proximamente...', stock: 10, precio: "$230", img: 'https://i.ibb.co/2t34cmz/Ipod.png'},
{id : "2", categoria: 'imagen',name : 'TV', description: 'proximamente...', stock: 67, precio: "$680", img: 'https://i.ibb.co/XkVGqHq/Televisor.png'},
{id : "3", categoria: 'imagen',name : 'Balanza Digital', description: 'proximamente...', stock: 4, precio: "$579", img: 'https://i.ibb.co/8szm0c8/balanza-Digital.jpg'},
{id : "4", categoria: 'sonido',name : 'MP4', description: 'proximamente...', stock: 3, precio: "$247", img: 'https://i.ibb.co/Gp1CnN8/MP4.png'},
{id : "5", categoria: 'sonido',name : 'Mini-Componente', description: 'proximamente...',  stock: 14, precio: "$942", img: 'https://i.ibb.co/7SktjLx/minicomponente.jpg'},
{id : "6", categoria: 'imagen',name : 'Monitor Pc', description: 'proximamente...', stock: 2, precio: "$467", img: 'https://i.ibb.co/282CX0t/monitor.webp'},
{id : "7", categoria: 'imagen',name : 'Teclado', description: 'proximamente...',stock: 6, precio: "$567", img: 'https://i.ibb.co/f1n817T/teclado.jpg'},
{id : "8", categoria: 'imagen',name : 'Mouse', description: 'proximamente...', stock: 5, precio: "$123", img: 'https://i.ibb.co/x7rvd7c/Mouse.jpg'},
{id : "9", categoria: 'imagen',name : 'DVD', description: 'proximamente...', stock: 10, precio: "$234", img: 'https://i.ibb.co/qyCvrnm/dvd.jpg'},
{id : "10", categoria: 'sonido',name : 'Licuadora', description: 'proximamente...', stock: 20, precio: "$120", img: 'https://i.ibb.co/jT1cdNY/licuadora.webp'},
{id : "11", categoria: 'sonido', name : 'Celular', description: 'proximamente...', stock: 11, precio: "$290", img: 'https://i.ibb.co/kg50R2F/celulares.jpg'},
{id : "12", categoria: 'imagen', name : 'Camaras de Vigilancia', description: 'proximamente...', stock: 4, precio: "$2290", img:"https://i.ibb.co/7Ks3X2M/camaras.png"},

];

export const getFetch = (id)=>{
return new Promise ((resolve)=>{
   setTimeout( () => { 
    if(id){
        resolve(objProducto.find(producto => producto.id === id))
    }else{
        resolve(objProducto)
    }
    }, 1000 )
});
};

