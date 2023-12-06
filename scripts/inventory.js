export default class Inventory {
  #products;

  constructor() {
    this.#products = [];
  }

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

  editProduct(id) {
    let product = this.products.find((product) => product.id === id);
    if (product) {
      let editForm = document.createElement("form");
      editForm.innerHTML = `
        <input type="text" id="editName" value="${product.name}">
        <input type="number" id="editQuantity" value="${product.quantity}">
        <input type="number" id="editPrice" value="${product.price}">
        <input type="hidden" id="editId" value="${product.id}">
        <button type="submit">Actualizar producto</button>
      `;
      editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.updateProduct(
          document.getElementById("editId").value,
          document.getElementById("editName").value,
          document.getElementById("editQuantity").value,
          document.getElementById("editPrice").value
        );
        editForm.remove();
      });
      document.body.appendChild(editForm);
    }
  }

  deleteProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
    localStorage.removeItem(`Producto: ${id}`);
    this.displayInventory();
  }

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

  searchProduct(name) {
    let filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
    this.displayInventory(filteredProducts);
  }

  displayInventory(products = this.products) {
    let tableBody = document.getElementById("add-rows");
    tableBody.innerHTML = "";

    products.forEach((product) => {
      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>${product.price}</td>
        <td>
          <button class="delete-button">Borrar</button>
          <button class="edit-button">Editar</button>
        </td>
      `;
      row
        .querySelector("button:nth-child(1)")
        .addEventListener("click", () => this.deleteProduct(product.id));
      row
        .querySelector("button:nth-child(2)")
        .addEventListener("click", () => this.editProduct(product.id));

      tableBody.appendChild(row);
    });
  }

  get products() {
    return this.#products;
  }

  set products(products) {
    this.#products = products;
  }
}
