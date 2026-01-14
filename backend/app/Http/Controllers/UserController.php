<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\Request;
use App\Traits\Api\ApiResponse;
use Exception;

class UserController extends Controller
{
    use ApiResponse;

    public function __construct(private UserService $service) {}

    public function login(Request $request) {
        try {
            $credentials = $request->validate([
                'email' => 'required|string',
                'password' => 'required|string|min:8'
            ]);

            $remember = $request->boolean('remember');
            $res = $this->service->login($credentials, $remember);
            if($res) {
                $request->session()->regenerate(); // Prevent session fixation
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
}
