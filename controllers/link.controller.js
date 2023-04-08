import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

export const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ uid: req.uid })

        return res.json({ links });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error de servidor 😱🔥' })
    }
};

export const getLink = async (req, res) => {
    try {
        const { nanoLink } = req.params;
        const link = await Link.findOne({ nanoLink });

        if (!link) return res.status(404).json({ error: 'No existe este link 🥲' })

        return res.json({ longLink: link.longLink   })
    } catch (error) {
        console.log(error)
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: 'Formato de Id Incorrecto ✒️ ❌' })
        }
        return res.status(500).json({ error: 'Error de servidor 😱🔥' })
    }
};


// Para un CRUD tradicional
// export const getLinkV1 = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const link = await Link.findById(id);

//         if (!link) return res.status(404).json({ error: 'No existe este link 🥲' })

//         if (!link.uid.equals(req.uid)) return res.status(401).json({ error: 'Este link no te pertenece 😠' })

//         return res.json({ link })
//     } catch (error) {
//         console.log(error)
//         if (error.kind === "ObjectId") {
//             return res.status(403).json({ error: 'Formato de Id Incorrecto ✒️ ❌' })
//         }
//         return res.status(500).json({ error: 'Error de servidor 😱🔥' })
//     }
// };

export const createLink = async (req, res) => {
    try {
        let { longLink } = req.body

        if (!longLink.startsWith("https://")) {
            longLink = "https://" + longLink
        }

        console.log(longLink)

        const link = new Link({ longLink, nanoLink: nanoid(7), uid: req.uid })

        const nweLink = await link.save();

        return res.status(201).json({ nweLink });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error de servidor 😱🔥' })
    }
};

export const removeLink = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await Link.findById(id);

        if (!link) return res.status(404).json({ error: 'No existe este link 🥲' })

        if (!link.uid.equals(req.uid))
            return res.status(401).json({ error: 'Este link no te pertenece 😠' })

        await link.deleteOne();

        return res.json({ link })
    } catch (error) {
        console.log(error)
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: 'Formato de Id Incorrecto ✒️ ❌' })
        }
        return res.status(500).json({ error: 'Error de servidor 😱🔥' })
    }
};

export const updateLink = async (req, res) => {
    try {
        const { id } = req.params;
        const { longLink } = req.body;

        console.log(longLink)

        if (!longLink.startsWith("https://")) {
            longLink = "https://" + longLink
        }

        const link = await Link.findById(id);

        if (!link) return res.status(404).json({ error: 'No existe este link 🥲' })

        if (!link.uid.equals(req.uid))
            return res.status(401).json({ error: 'Este link no te pertenece 😠' })

        //Actualizar
        link.longLink = longLink;
        await link.save()
        // await link.updateOne();

        return res.json({ link })
    } catch (error) {
        console.log(error)
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: 'Formato de Id Incorrecto ✒️ ❌' })
        }
        return res.status(500).json({ error: 'Error de servidor 😱🔥' })
    }
};
