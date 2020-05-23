import { Component, OnInit } from '@angular/core';
import { Elemento } from '../elemento';//interfaz elemento
import { ELEMENTOS } from '../mock-elementos';//array con 2 elementos para primera carga

@Component({
  selector: 'app-elementos',
  templateUrl: './elementos.component.html',
  styleUrls: ['./elementos.component.css']
})
export class ElementosComponent implements OnInit {

  //elementos = ELEMENTOS;//array inicial con 2 elementos para mostrar
  nuevoElemento: Elemento;//variable para almacenar un nuevo elemento
  lista: Elemento[];//array para almacenar elementos creados, representa la lista de la tienda
  listaSeleccionados: Elemento[];//array para almacenar los elementos seleccionados, lista con los seleccionados

  /**
   * Constructor para el componente, inicializa la lista de elementos 
   * y la lista de elementos seleccionados.
   */
  constructor() {//constructor de la lista
    this.nuevoElemento = { nombre: '', descripcion: '', precio: null, selec: false, };//un nuevo elemento vacío
    this.lista = ELEMENTOS;//inicialiciamos la lista los dos elementos preconfigurados 
    this.listaSeleccionados = [];//la lista de los elementos seleccionados inicalmente está vacía
  }

  ngOnInit(): void {
  }

  /**
   * funcion para añadir un elemento a la lista de elementos.
   * @param event 
   */
  addElemento(event) {//funcion para añadir un elemento
    this.lista.push(this.nuevoElemento);//se ñade el nuevo elemento en el erray de la lista
    this.nuevoElemento = { nombre: '', descripcion: '', precio: null, selec: false };
    event.preventDefault();
  }

  /**función para eliminar un elemento de la lista en función de su posición en el array
   * tambien eliminará el elemento de la lista de seleccionados.
   * @param {number} index posición del elemento a eliminar
   */
  deleteElemento(index: number) {//eliminar un elemento de la lista
    let elemento = this.lista[index];//elemento a eliminar
    this.lista.splice(index, 1);//lo eliminamos de la lista de productos
    //buscamos su posición en la lista de seleccionados
    let indice = this.listaSeleccionados.indexOf(elemento);
    //lo eliminamos de la lista de seleccionados
    this.listaSeleccionados.splice(indice, 1);
  }

  /**función para eliminar los elementos que han sido seleccionados en la lista, 
   * también elimirá esos elementos de la lista de seleccionados.
   */
  deleteElementosSelec() {
    //empezamos por el indice final del array para realizar el posible borrado
    for (let i = (this.lista.length - 1); i > -1; i--) {
      if (this.lista[i].selec) {//si el elemento está seleccionado (true)
        this.lista.splice(i, 1);//lo eliminamos de la lista
        let elemento = this.lista[i];/*detectamos el elemento a eliminar y 
        buscamos su posición en la lista de seleccionados*/
        let indice = this.listaSeleccionados.indexOf(elemento);
        //finalmente también lo eliminamos de la lista de seleccionados
        this.listaSeleccionados.splice(indice, 1);
      }
    }
  }

  /**función para seleccionar o des-seleccionar un elemento de la lista 
   * y añadirlo o quitarlo de la lista de seleccionados en función 
   * de si la propiedad "selec" del elemento es true o false
   * @param {Elemento} elemento elemento que se quiere seleccionar o des-seleccionar
   */
  onSelect(elemento: Elemento): void {
    if (elemento.selec) {//si el elemento está seleccionado lo desmarcamos
      elemento.selec = false;
      //buscamos su posición en la lista de seleccionados
      let indice = this.listaSeleccionados.indexOf(elemento);
      //lo eliminamos de la lista de seleccionados
      this.listaSeleccionados.splice(indice, 1);
    } else {//si no está seleccionado lo marcamos
      elemento.selec = true;
      //lo añadimos a la lista de seleccionados
      this.listaSeleccionados.push(elemento)
    }

  }
}
