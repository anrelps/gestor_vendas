<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Services\DemoService;

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
        $user->update([
            'nome' => $input['nome'],
            'telefone' => $input['telefone'],
            'email' => $input['email'],
        ]);
        return $user;
    }

    public function updatePassword(User $user, array $input) {
        if(!Hash::check($input['actualPassword'], $user->password)) {
            throw new Exception('Senha incorreta!');
        }
        $user->update([
            'password' => bcrypt($input['password']),
        ]);
        return $user;
    }

    public function logout(User $user) {
        $user->currentAccessToken()->delete();

        if ($user->empresa?->is_demo) {
            (new DemoService())->deleteSession($user->empresa);
        }
    }
}
