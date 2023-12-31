import Product from './product.js';
import Inventory from './inventory.js';
import { storeProducts } from './localStorage.js';

// Crea una instancia del inventario
const inventory = new Inventory();
// Define una lista de productos predeterminados con instancias de la clase Product
let defaultProducts  = [
  new Product(1, "Lamzu Atlantis", Product.getRandomQuantity(), 100.99),
  new Product(2, "Razer Viper S.E", Product.getRandomQuantity(), 320.99),
  new Product(3, "Razer Orochi V2", Product.getRandomQuantity(), 78.99),
  new Product(4, "End Game XMR1", Product.getRandomQuantity(), 70.99),
  new Product(5, "Ninjutso Sora", Product.getRandomQuantity(), 99.99),
  new Product(6, "Logitech G PRO W", Product.getRandomQuantity(), 95.99),
  new Product(7,"Asus ROG HARPER AIM LAB Edition",Product.getRandomQuantity(),110.99),
  new Product(8, "Lamzu Thorn", Product.getRandomQuantity(), 120.99),
  new Product(9, "Razer Viper V2", Product.getRandomQuantity(), 105.99),
  new Product(10, "Lamzu Atlantis mini 4K", Product.getRandomQuantity(), 95.99),
];
// Agrega cada producto predeterminado al inventario
defaultProducts.forEach(product => inventory.addProduct(product));

// Almacena los productos predeterminados en el almacenamiento local
storeProducts(defaultProducts);

// Obtiene el formulario de añadir producto por su ID y agrega un evento de escucha al envío
const addForm = document.getElementById('form-add');
addForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('nameInput').value;
  const quantity = document.getElementById('stockInput').value;
  const price = document.getElementById('priceInput').value;
  const id = Date.now();
  const product = new Product(id, name, quantity, price);
  inventory.addProduct(product);
  this.reset();
});

// Obtiene el formulario de editar producto por su ID y agrega un evento de escucha al envío
const editForm = document.getElementById('form-edit');
editForm.addEventListener('submit', function(e) {
  e.preventDefault(); 
  const name = document.getElementById('nameInput').value;
  const quantity = document.getElementById('stockInput').value;
  const price = document.getElementById('priceInput').value;
  const id = document.getElementById('editId').value;
  inventory.updateProduct(id, name, quantity, price);
  this.reset(); 
});

// Obtiene el campo de búsqueda de productos por su ID y agrega un evento de entrada de texto
const searchInput = document.getElementById('product-search');
searchInput.addEventListener('input', function(e) {
  const searchValue = e.target.value;
  inventory.searchProduct(searchValue);
});