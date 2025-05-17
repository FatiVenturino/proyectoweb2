const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/catalogo/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('No es una imagen válida'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // límite de 5MB
    }
});

// Controlador para subir imagen
const subirImagen = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ mensaje: 'No se ha subido ninguna imagen' });
        }

        const descripcion = req.body.descripcion;
        const imagenUrl = `/uploads/catalogo/${req.file.filename}`;
        
        // Aquí podrías guardar la información en la base de datos
        // Por ahora solo devolvemos la URL y la descripción
        res.status(200).json({
            mensaje: 'Imagen subida exitosamente',
            imagenUrl: imagenUrl,
            descripcion: descripcion
        });
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        res.status(500).json({ mensaje: 'Error al subir la imagen' });
    }
};

// Controlador para obtener todas las imágenes
const obtenerImagenes = async (req, res) => {
    try {
        const directorio = path.join(__dirname, '../uploads/catalogo');
        const archivos = await fs.readdir(directorio);
        
        const imagenes = archivos.map(archivo => ({
            id: archivo,
            url: `/uploads/catalogo/${archivo}`,
            descripcion: archivo.split('-').slice(1).join('-').replace(/\.[^/.]+$/, '') // Extraer descripción del nombre del archivo
        }));

        res.status(200).json(imagenes);
    } catch (error) {
        console.error('Error al obtener imágenes:', error);
        res.status(500).json({ mensaje: 'Error al obtener las imágenes' });
    }
};

// Controlador para eliminar una imagen
const eliminarImagen = async (req, res) => {
    try {
        const { id } = req.params;
        const rutaArchivo = path.join(__dirname, '../uploads/catalogo', id);

        await fs.unlink(rutaArchivo);
        res.status(200).json({ mensaje: 'Imagen eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la imagen:', error);
        res.status(500).json({ mensaje: 'Error al eliminar la imagen' });
    }
};

module.exports = {
    upload,
    subirImagen,
    obtenerImagenes,
    eliminarImagen
}; 