<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        if ($request->file("avatar")){
            $filename = $request->file("avatar")->store("avatars");
        } else {
            $filename = 'avatars/N40lVtCJSWL2tsNmuT1w0qIPFyFlrw9ZUimqWJaJ.png';
        }

        /** @var User $user */
        $user = User::create([
            "name" => $data["name"],
            "email" => $data["email"],
            "password" => $data["password"],
            "avatar" => $filename
        ]);

        $token = $user->createToken("main")->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }
}
