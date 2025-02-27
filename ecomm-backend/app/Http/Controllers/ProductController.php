<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
class ProductController extends Controller
{
    function addProduct(Request $req)
    {
        $product=new Product;
        $product->name=$req->input('name');
        $product->price=$req->input('price');
        $product->description=$req->input('description');
        $product->file_path=$req->file('file')->store('products');
        $product->save();
        return $product;
    }

    function list()
    {
        return Product::all();
    }

    function delete($id)
    {
        $result= Product::where('id',$id)->delete();
        if($result)
        {
            return ["result"=>"El producto ha sido borrado exitosamente"];
        }
        else{
            return ["result"=>"La operación falló"];
        }
    }
    function getProduct($id)
    {
        return Product::find($id);
    }

    function updateProduct(Request $req, $id)
{
    $product = Product::find($id);
    if (!$product) {
        return response()->json(['message' => 'Producto no encontrado'], 404);
    }

    $product->name = $req->input('name');
    $product->price = $req->input('price');
    $product->description = $req->input('description');

    if ($req->hasFile('file')) {
        $product->file_path = $req->file('file')->store('products');
    }

    $product->save();
    return response()->json(['message' => 'Producto actualizado correctamente', 'product' => $product]);

}

function search($key = null)
    {
        if (!$key) {
            return response()->json([]); // Retorna lista vacía si la búsqueda está vacía
        }

        $products = Product::where('name', 'LIKE', "%$key%")->get();
        return response()->json($products);
    }

}