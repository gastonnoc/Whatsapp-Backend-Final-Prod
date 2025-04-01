import User from '../models/User.model.js'; // Importar el modelo de usuario
import { ServerError } from "../utils/errors.utils.js"; // Error personalizado

// Controlador para actualizar la imagen de perfil
export const updateProfileImage = async (req, res) => {
    try {
        const { userId } = req.user; // Obtener ID del usuario desde el token
        const { profile_image_base64 } = req.body; // Obtener la nueva imagen de perfil desde el body

        if (!profile_image_base64) {
            throw new ServerError('No se ha proporcionado una imagen de perfil', 400);
        }

        // Buscar al usuario en la base de datos
        const user = await User.findById(userId);
        if (!user) {
            throw new ServerError('Usuario no encontrado', 404);
        }

        // Actualizar la imagen de perfil en la base de datos
        user.profile_image_base64 = profile_image_base64; // Guardamos la imagen en base64
        user.modified_at = Date.now(); // Actualizar la fecha de modificación

        // Guardar los cambios
        await user.save();

        return res.json({
            message: 'Imagen de perfil actualizada',
            user,
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error interno del servidor',
            ok: false
        });
    }
};
