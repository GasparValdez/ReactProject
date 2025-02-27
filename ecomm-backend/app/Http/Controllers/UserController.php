<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function register(Request $req)
    {
        $user = new User;
        $user->name = $req->input('name');
        $user->email = $req->input('email');
        $user->password = Hash::make($req->input('password'));

        if ($req->hasFile('file')) {
            $filePath = $req->file('file')->store('users');
            $user->file_path = $filePath;
        }

        $user->save();
        return response()->json($user, 201);
    }

    function login(Request $req) {
        $user = User::where('email', $req->email)->first();
        if (!$user || !Hash::check($req->password, $user->password)) {
            return response()->json(["error" => "Uno o más campos son incorrectos"], 401);
        }
        return response()->json($user);
    }
    
    function addUser(Request $req)
    {
        $user = new User;
        $user->name = $req->input('name');
        $user->email = $req->input('email');
        $user->password = Hash::make($req->input('password'));

        if ($req->hasFile('file')) {
            $user->file_path = $req->file('file')->store('users');
        }

        $user->save();
        return response()->json($user, 201);
    }

    function listUser()
    {
        return User::all();
    }

    function deleteUser($id)
    {
        $result = User::destroy($id);
        return response()->json(["message" => "El usuario ha sido eliminado exitosamente"], 200);
    }

    function getUser($id)
    {
        return User::find($id);
    }

    function updateUser(Request $req, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(["error" => "Usuario no encontrado"], 404);
        }

        $user->name = $req->input('name', $user->name);
        $user->email = $req->input('email', $user->email);
        
        if ($req->has('password')) {
            $user->password = Hash::make($req->input('password'));
        }

        if ($req->hasFile('file')) {
            $user->file_path = $req->file('file')->store('users');
        }

        $user->save();
        return response()->json(['message' => 'Usuario actualizado correctamente', 'user' => $user]);
    }

    
function searchUser($key = null)
{
    if (!$key) {
        return response()->json([]); // Retorna lista vacía si la búsqueda está vacía
    }

    $users = User::where('name', 'LIKE', "%$key%")->get();
    return response()->json($users);
}
}
