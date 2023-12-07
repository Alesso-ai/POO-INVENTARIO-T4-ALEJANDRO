export default class Inventory {
  #products;

  constructor() {
    this.#products = [];
  }
// Agrega un producto al inventario
  addProduct(product) {
    this.products.push(product);
    if (product.name && product.quantity && product.price) {
      const plainProduct = {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      };
      const productJson = JSON.stringify(plainProduct);
      localStorage.setItem(`Producto: ${product.id}`, productJson);
    }

    this.displayInventory();
  }

// Edita un producto en el inventario
  editProduct(id) {
    let product = this.products.find((product) => product.id === id);
    if (product) {
      const newName = prompt("Introduce el nuevo nombre:", product.name);
      const newQuantity = prompt("Introduce la nueva cantidad:", product.quantity);
      const newPrice = prompt("Introduce el nuevo precio:", product.price);
  
      if (newName !== null && newQuantity !== null && newPrice !== null) {
        this.updateProduct(id, newName, newQuantity, newPrice);
        this.displayInventory();
      }
    }
  }
// Elimina un producto del inventario
  deleteProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
    localStorage.removeItem(`Producto: ${id}`);
    this.displayInventory();
  }
// Actualiza la información de un producto en el inventario
  updateProduct(id, name, quantity, price) {
    let product = this.products.find((product) => product.id == id);
    localStorage.removeItem(`Producto: ${id}`);

    if (product) {
      product.name = name;
      product.quantity = quantity;
      product.price = price;
      this.displayInventory();
    }

    if (product.name && product.quantity && product.price) {
      const plainProduct = {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      };
      const productJson = JSON.stringify(plainProduct);
      localStorage.setItem(`Producto: ${product.id}`, productJson);
    }
  }
// Busca productos en el inventario por nombre
  searchProduct(name) {
    let filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
    this.displayInventory(filteredProducts);
  }
// Muestra los productos del inventario en la interfaz
  displayInventory(products = this.products) {
    const tableBody = document.getElementById("add-rows");
    tableBody.innerHTML = "";

    products.forEach((product) => {
      const row = this.createRow(product);
      tableBody.appendChild(row);
    });
  }

// Crea una fila para un producto en la interfaz
  createRow(product) {
    const row = document.createElement("tr");
    const cellNames = this.createCell(product.name);
    const cellQuantity = this.createCell(product.quantity);
    const cellPrice = this.createCell(product.price);
    const cellActions = this.createActionsCell(product.id);

    row.appendChild(cellNames);
    row.appendChild(cellQuantity);
    row.appendChild(cellPrice);
    row.appendChild(cellActions);

    return row;
  }
// Crea una celda con un valor para la interfaz
  createCell(value) {
    const cell = document.createElement("td");
    cell.textContent = value;
    return cell;
  }
// Crea la celda de acciones (botones) para la interfaz
  createActionsCell(productId) {
    const cell = document.createElement("td");
    const deleteButton = this.createButton("delete-button", "Borrar", () => this.deleteProduct(productId));
    const editButton = this.createButton("edit-button", "Editar", () => this.editProduct(productId));

    cell.appendChild(deleteButton);
    cell.appendChild(editButton);

    return cell;
  }
// Crea un botón con un manejador de eventos para la interfaz
  createButton(className, text, clickHandler) {
    const button = document.createElement("button");
    button.className = className;
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
  }
// Obtiene la lista de productos
  get products() {
    return this.#products;
  }
// Establece la lista de productos
  set products(products) {
    this.#products = products;
  }
}
