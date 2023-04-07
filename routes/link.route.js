import { Router } from "express";
import { createLink, getLink, getLinks, removeLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireAuth.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";

const router = Router();

//Get           /api/v1/links       all links
router.get('/', requireToken, getLinks);
//Get           /api/v1/links/:id   sigle Link
router.get('/:id', requireToken, paramLinkValidator, getLink);
//Post          /api/v1/links       creeate link
router.post('/', requireToken, bodyLinkValidator, createLink);
//PATCH/PUT     /api/v1/links/:id   update link

//DELETE        /api/v1/links/:id   Delete
router.delete('/:id', requireToken, paramLinkValidator, removeLink);

export default router