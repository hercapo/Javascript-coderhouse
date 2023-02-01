// STOCK DE PRODUCTOS

const stockProductos = [
    {
        id: 1,
        nombre: "Running",
        cantidad: 1,
        desc: "Talles del 38 al 43",
        precio: 22000,
        img: "https://cdn.pixabay.com/photo/2013/05/31/20/33/running-shoes-115149_960_720.jpg",
      },
      {
        id: 2,
        nombre: "Running",
        cantidad: 1,
        desc: "Talles del 38 al 43",
        precio: 25000,
        img: "https://cdn.pixabay.com/photo/2014/05/18/11/26/shoes-346986_960_720.jpg",
      },
      {
        id: 3,
        nombre: "Running",
        cantidad: 1,
        desc: "Talles del 38 al 43",
        precio: 25700,
        img:"https://cdn.pixabay.com/photo/2016/11/18/22/29/footwear-1837170_960_720.jpg",
      },
      {
        id: 4,
        nombre: "traking/running",
        cantidad: 1,
        desc: "Talles del 38 al 43",
        precio: 25000,
        img: "https://cdn.pixabay.com/photo/2016/12/10/16/57/shoes-1897709_960_720.jpg",
      },
      {
        id: 5,
        nombre: "Urban",
        cantidad: 1,
        desc: "Talles del 38 al 43",
        precio: 22000,
        img:   "https://cdn.pixabay.com/photo/2020/05/04/07/15/nike-5128118_960_720.jpg",
      },
      {
        id: 6,
        nombre: "Urban",
        cantidad: 1,
        desc: "Talles del 38 al 43",
        precio: 22000,
        img:   "https://cdn.pixabay.com/photo/2020/04/14/09/53/nike-5041718_960_720.jpg",
      },
      {
        id: 7,
        nombre: "Deportivos",
        cantidad: 1,
        desc: "Talles del 38 al 43",
        precio: 25000,
        img: "https://cdn.pixabay.com/photo/2020/07/07/04/31/shoes-5379215_960_720.jpg",
      },
      {
        id: 8,
        nombre: "Urban/Crossfit",
        cantidad: 1,
        desc: "Talles del 38 al 43",
        precio: 18000,
        img: "https://cdn.pixabay.com/photo/2017/02/13/02/06/reebok-2061623_960_720.jpg",
      },
      {
        id: 9,
        nombre: "Runnning",
        cantidad: 1,
        desc: "Talles del 38 al 43",
        precio: 23000,
        img: "https://cdn.pixabay.com/photo/2014/04/05/11/38/nike-316449_960_720.jpg",
      },
      {id: 10,
        nombre: "Casual/Runing",
        cantidad: 1,
        desc: "Talles del 38 al 43",
        precio: 25000,
        img: "https://cdn.pixabay.com/photo/2013/05/31/20/00/shoes-115102_960_720.jpg",
      },
  ];
  let carrito = [];
  
  const contenedor = document.querySelector("#contenedor");
  const carritoContenedor = document.querySelector("#carritoContenedor");
  const vaciarCarrito = document.querySelector("#vaciarCarrito");
  const precioTotal = document.querySelector("#precioTotal");
  const activarFuncion = document.querySelector("#activarFuncion");
  const procesarCompra = document.querySelector("#procesarCompra");
  const totalProceso = document.querySelector("#totalProceso");
  const formulario = document.querySelector('#procesar-pago')
  const precioDolarText = document.getElementById('precio-dolar');

  // LLAMAR PRECIO DOLAR

  const precioDolar = fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');

  const traerDolar = () => {
    precioDolar
    .then(res => res.json())
    .then(res => {
        console.log(res);
        const oficial = res.find(dolar => dolar.casa.agencia === '349');
        console.log(oficial);
        precioDolarText.innerText = `Dolar Oficial:  Compra $${oficial?.casa.compra} - Venta $${oficial?.casa.venta}`
    });
}
  
// FUNCION PROCESAR PEDIDOS

  if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    
    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
  });
  if(formulario){
    formulario.addEventListener('submit', enviarCompra)
  }
  
  
  if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
      carrito.length = [];
      mostrarCarrito();
    });
  }
  
  if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
      if (carrito.length === 0) {
        Swal.fire({
          title: "¡Tu carrito está vacio!",
          text: "Compra algo para continuar con la compra",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        location.href = "compra.html";
      }
    });
  }
  
  stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
      contenedor.innerHTML += `
      <div class="card mt-3" style="width: 18rem;">
      <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
      </div>
    </div>
      `;
    }
  });
  
  const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)
  
    if(existe){
      const prod = carrito.map(prod => {
        if(prod.id === id){
          prod.cantidad++
        }
      })
    } else {
      const item = stockProductos.find((prod) => prod.id === id)
      carrito.push(item)
    }
    mostrarCarrito()
  
  };
  
  const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
      modalBody.innerHTML = "";
      carrito.forEach((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;
        console.log(modalBody);
        modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        
    
        `;
      });
    }
  
    if (carrito.length === 0) {
      modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
      `;
    } else {
      // console.log("Algo");
    }
    carritoContenedor.textContent = carrito.length;
  
    if (precioTotal) {
      precioTotal.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
      );
    }
  
    guardarStorage();
  };
  
  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  function eliminarProducto(id) {
    const lentesId = id;
    carrito = carrito.filter((lentes) => lentes.id !== lentesId);
    mostrarCarrito();
  }
  function procesarPedido() {
    carrito.forEach((prod) => {
      const listaCompra = document.querySelector("#lista-compra tbody");
      const { id, nombre, precio, img, cantidad } = prod;
      if (listaCompra) {
        const row = document.createElement("tr");
        row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
              `;
        listaCompra.appendChild(row);
      }
    });
    totalProceso.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }
  
   function enviarCompra(e){
     e.preventDefault()
     const persona = document.querySelector('#persona').value
     const Correo = document.querySelector('#correo').value
  
     if(correo === '' || persona == ''){
       Swal.fire({
         title: "¡Debes completar tu email y nombre!",
         text: "Rellena el formulario",
         icon: "error",
         confirmButtonText: "Aceptar",
     })
   } else {
  
    const btn = document.getElementById('button');
  
     btn.value = 'Enviando...';
  
     const serviceID = 'default_service';
     const templateID = 'template_n8x3h2q';
  
     emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Finalizar compra';
        Swal.fire({
          title: "¡ Muchas gracias por tu compra!",
          text: "Tu correo fue enviado",
          icon: "success",
          confirmButtonText: "Aceptar",
      })
      }, (err) => {
        btn.value = 'Finalizar compra';
        alert(JSON.stringify(err));
      });
      
     const spinner = document.querySelector('#spinner')
     spinner.classList.add('d-flex')
     spinner.classList.remove('d-none')
  
     setTimeout(() => {
       spinner.classList.remove('d-flex')
       spinner.classList.add('d-none')
       formulario.reset()
  
       const alertExito = document.createElement('p')
       alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
       alertExito.textContent = 'Compra realizada correctamente'
       formulario.appendChild(alertExito)
  
       setTimeout(() => {
         alertExito.remove()
       }, 3000)
  
  
     }, 3000)
   }
   localStorage.clear()
   }
   traerDolar();
   