<?php

namespace App\Console\Commands;

use App\Services\DemoService;
use Illuminate\Console\Command;

class CleanExpiredDemos extends Command
{
    protected $signature   = 'demo:clean';
    protected $description = 'Remove sessões de demonstração expiradas';

    public function handle(DemoService $service): void
    {
        $count = $service->cleanExpired();
        $this->info("$count sessão(ões) de demo removida(s).");
    }
}
