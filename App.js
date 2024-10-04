class Producto{
    constructor(nombre, precio, año){
        this.nombre = nombre;
        this.precio = precio;
        this.año = año;
    }
}

class Ui{
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="toast show  mb-2" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto">${product.nombre}</strong>
                    <small>${product.año}</small>
                    <button type="button" class="btn-close ms-2 mb-1" data-bs-dismiss="toast" aria-label="Close" name="delete">
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div class="toast-body">
                    <p> Precio Q.${product.precio}</p>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado satisfactoriamente', 'warning')
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-dismissible alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));

        const contairner = document.querySelector('.container');

        const app = document.querySelector('#App');
        contairner.insertBefore(div, app);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000)
    }
}

document.getElementById('product-form').addEventListener('submit', function(e){
    
    e.preventDefault();

    const nombre = document.getElementById('name').value
    const precio = document.getElementById('price').value
    const año = document.getElementById('year').value

    const product = new Producto(nombre, precio, año)

    const ui = new Ui();

    if(nombre === '' || precio === '' || año === '' ){
        return ui.showMessage('Completa los campos vacíos', 'danger');
    }
    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage('Producto agregado satisfactoriamente', 'success');
    
});

document.getElementById('product-list').addEventListener('click', function(e){
    const ui = new Ui();
    ui.deleteProduct(e.target);
});