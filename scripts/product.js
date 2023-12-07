// Clase que representa un producto con propiedades privadas

export default class Product {
   // Propiedades privadas de la clase
  #id;
  #name;
  #quantity;
  #price;
   // Constructor que inicializa las propiedades del producto con los valores proporcionados
  constructor(id, name, quantity, price) {
    this.#id = id;
    this.#name = name;
    this.#quantity = quantity;
    this.#price = price;
  }
// Metodo estático que devuelve una cantidad aleatoria entre 1 y 20
  static getRandomQuantity() {
    return Math.floor(Math.random() * 20) + 1;
  }

   // Metodos de acceso (getters) para las propiedades privadas
  get id() {
    return this.#id;
  }
  set id(id) {
    this.#id = id;
  }

  get name() {
    return this.#name;
  }
  set name(name) {
    this.#name = name;
  }

  get quantity() {
    return this.#quantity;
  }
  set quantity(quantity) {
    this.#quantity = quantity;
  }

  get price() {
    return this.#price;
  }
  set price(price) {
    this.#price = price;
  }
}
