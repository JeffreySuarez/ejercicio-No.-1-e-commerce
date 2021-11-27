import React, { useState } from "react";
import { storage, fs } from "../Firebase/Config";

export const AddProducts = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);

  const [imagenError, setImagenError] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

  const tipoImagen = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];

  const handleProductImg = (e) => {
    let seleccionarArchivo = e.target.files[0];

    if (seleccionarArchivo) {
      if (seleccionarArchivo && tipoImagen.includes(seleccionarArchivo.type)) {
        setImagen(seleccionarArchivo);
        setImagenError("");
      } else {
        setImagen(null);
        setImagenError(
          "Por favor selecciona un archivo de imagen valido de tipo (png o jgp)"
        );
      }
    } else {
      console.log("por favor seleccionar su archivo");
    }
  };

  const handleAddProducts = (e) => {
    e.preventDefault();
    console.log(titulo, descripcion, precio, imagen);
    const subiendoTarea = storage
      .ref(`product-images/${imagen.name}`)
      .put(imagen);
    subiendoTarea.on(
      "state_changed",
      (snapshot) => {
        const progreso =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progreso);
      },
      (error) => setUploadError(error.message),
      () => {
        storage
          .ref("product-images")
          .child(imagen.name)
          .getDownloadURL()
          .then((url) => {
            fs.collection("Products")
              .add({
                titulo,
                descripcion,
                precio: Number(precio),
                url,
              })
              .then(() => {
                setSuccessMsg("Se ha añadido correctamente el Producto");
                setTitulo("");
                setDescripcion("");
                setPrecio("");
                document.getElementById("file").value = "";
                setImagenError("");
                setUploadError("");
                setTimeout(() => {
                  setSuccessMsg("");
                }, 3000);
              })
              .catch((error) => setUploadError(error.message));
          });
      }
    );
  };
  return (
    <div className="container">
      <br></br>
      <br></br>
      <h1>Add Products</h1>
      <hr></hr>
      {successMsg && (
        <>
          <div className="bg-success text-white">{successMsg}</div>
          <br></br>
        </>
      )}

      <form
        autoComplete="off"
        className="form-group"
        onSubmit={handleAddProducts}
      >
        <label>Nombre del Producto</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setTitulo(e.target.value)}
          value={titulo}
        />
        <br></br>
        <label>Descripción del Producto</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setDescripcion(e.target.value)}
          value={descripcion}
        />
        <br></br>
        <label>Precio del Producto</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setPrecio(e.target.value)}
          value={precio}
        />
        <br></br>
        <label>Subir imagen del Producto</label>
        <input
          type="file"
          id="file"
          className="form-control"
          required
          onChange={handleProductImg}
        />

        {imagenError && (
          <>
            <br></br>
            <div className="bg-danger text-white">{imagenError}</div>
          </>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="btn btn-success btn-md">
            Añadir
          </button>
        </div>
      </form>

      {uploadError && (
        <>
          <br></br>
          <div className="bg-danger text-white">{uploadError}</div>
        </>
      )}
    </div>
  );
};
