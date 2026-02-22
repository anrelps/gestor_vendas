<?php

namespace App\Services;

use App\Models\Empresa;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class EmpresaLogoService {

    public function upload(UploadedFile $file, Empresa $empresa) {
        $manager = new ImageManager(new Driver);
        $image = $manager->read($file->getRealPath())->cover(400, 400)->toWebp(85);
        $filename = 'empresas/'.$empresa->id.'/logo_'.now()->timestamp.'.webp';
        Storage::disk('public')->put($filename, $image);

        if($empresa->logo_path) {
            Storage::disk('public')->delete($empresa->logo_path);
        }

        return $filename;
    }
}
