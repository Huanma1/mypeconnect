<?php

/**
 * Para corrar esto tienes que ir al cmd y poner lo siguiente:
 * php artisan tinker
 *
 * Asociar un producto a una Mype con información adicional.
 *
    *$mype = Mype::find(1); // Encuentra la Mype
    *$product = Product::find(1); // Encuentra el producto

    *Asocia el producto con la Mype y agrega información adicional
    *$mype->products()->attach($product->id, [
    *   'custom_price' => 15000, // Precio personalizado en pesos chilenos
    *   'stock' => 10, // Stock del producto
    *]);
 */

/**
* Obtener los productos de una Mype con precios personalizados
*
   *$mype = Mype::find(1);
   *$products = $mype->products; // Obtiene todos los productos asociados a la Mype

   *foreach ($products as $product) {
   *    echo $product->product_name . ' - Precio: ' . $product->pivot->custom_price . ' - Stock: ' . $product->pivot->stock;
   *}
*/

/**
* Comparar precios de un producto entre diferentes Mypes
*
   *$product = Product::find(1);
   *$mypes = $product->mypes; // Obtiene todas las Mypes que venden este producto

   *foreach ($mypes as $mype) {
   *    echo $mype->name . ' - Precio: ' . $mype->pivot->custom_price . ' - Stock: ' . $mype->pivot->stock;
   *}
*/
