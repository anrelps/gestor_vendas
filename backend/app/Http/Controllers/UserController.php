<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use App\Traits\Api\ApiResponse;
use Illuminate\Http\Request;
use Exception;

class UserController extends Controller
{
    use ApiResponse;

    public function __construct(private UserService $service) {}

    public function me() {
        try {
            $user = $this->service->me();
            return new UserResource($user);
        } catch(Exception $e) {
            return $this->errorResponse('Ocorreu um erro ao tentar obter os dados do usário.', 500);
        }
    }

    public function login(Request $request) {
        try {
            $credentials = $request->validate([
                'email' => 'required|string',
                'password' => 'required|string|min:8'
            ]);
            $res = $this->service->login($credentials);
            if($res) {
                return $this->successResponse($res, 200);
            }
            return $this->errorResponse('E-mail ou senha incorretos!', 401);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function register(Request $request) {
        try {
            $data = $request->validate([
                'empresa_id' => 'required|numeric',
                'nome' => 'required|string',
                'email' => 'required|email',
                'password' => 'required|min:8|confirmed', // precisa de um input password_confirmation
                'telefone' => 'nullable|string',
            ]);

            $res = $this->service->register($data);
            return $this->successResponse(new UserResource($res), 200);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function update(User $user, Request $request) {
        try {
            $data = $request->validate([
                'empresa_id' => 'required|numeric',
                'nome' => 'required|string',
                'telefone' => 'nullable|string',
            ]);
            $res = $this->service->update($user, $data);
            return $this->successResponse(new UserResource($res), 200);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function logout() {
        try {
            $this->service->logout(auth()->user());
            return $this->successResponse('Logout realizado com sucesso.', 200);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }
}
