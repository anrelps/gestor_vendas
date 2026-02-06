<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;

class UserService {

    public function __construct(private User $user) {}

    public function me() {
        return Auth::user();
    }

    public function login(array $credentials) {
        $authAttempt = Auth::attempt($credentials);
        if($authAttempt) {
            $token = explode("|", auth()->user()->createToken('accessToken')->plainTextToken)[1];
            return [
                'user' => auth()->user(),
                'token' => $token,
            ];
        }
        return false;
    }

    public function register(array $input) {
        return $this->user->create([
            'empresa_id' => $input['empresa_id'],
            'nome' => $input['nome'],
            'email' => $input['email'],
            'password' => bcrypt($input['password']),
            'telefone' => $input['telefone'],
        ]);
    }

    public function update(User $user, array $input) {
        return $user->update([
            'empresa_id' => $input['empresa_id'],
            'nome' => $input['nome'],
            'telefone' => $input['telefone'],
        ]);
    }

    public function logout(User $user) {
        return $user->currentAccessToken()->delete();
    }
}
