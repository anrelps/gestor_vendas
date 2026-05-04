<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Services\DemoService;
use App\Traits\Api\ApiResponse;
use Exception;

class DemoController extends Controller
{
    use ApiResponse;

    public function __construct(private DemoService $service) {}

    public function login()
    {
        try {
            $result = $this->service->createSession();

            return $this->successResponse([
                'user'  => new UserResource($result['user']),
                'token' => $result['token'],
            ], 200);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine(), 500);
        }
    }
}
