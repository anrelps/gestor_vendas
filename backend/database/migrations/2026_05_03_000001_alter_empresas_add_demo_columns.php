<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('empresas', function (Blueprint $table) {
            $table->boolean('is_demo')->default(false)->after('assinatura_ativa');
            $table->timestamp('demo_expires_at')->nullable()->after('is_demo');
        });
    }

    public function down(): void
    {
        Schema::table('empresas', function (Blueprint $table) {
            $table->dropColumn(['is_demo', 'demo_expires_at']);
        });
    }
};
