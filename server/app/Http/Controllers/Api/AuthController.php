<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        if ($request->file("avatar")) {
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

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response([
                "message" => "Email или пароль не верные"
            ]);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken("main")->plainTextToken;

        return response([
            "user" => $user,
            "token" => $token
        ]);
    }
}
