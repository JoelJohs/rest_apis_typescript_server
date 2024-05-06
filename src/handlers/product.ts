import { Request, Response } from "express";
import Product from "../models/Product.model";

// GET Handlers
export const getProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [["id", "ASC"]],
    });

    res.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

// POST Handler
export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);

  // test message
  res.json({ data: product });
};

// PUT/PATCH Handler

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  // If product is found, update it
  await product.update(req.body);
  await product.save();

  res.json({ data: product });
};

/**
 * Updates the availability of a product.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response with the updated product data.
 */

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  // If product is found, update it
  product.availability = !product.dataValues.availability;
  await product.save();

  res.json({ data: product });
};

// DELETE Handler
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  await product.destroy();

  res.json({ data: "Producto Eliminado" });
};
