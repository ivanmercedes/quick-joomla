<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Rules\DatabaseExists;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Http\RedirectResponse;

class ProjectController extends Controller
{
    /**
     * Handle an incoming new project request.
     *
     * @throws \Illuminate\Validation\ValidationException
     *
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        // Validar el nombre del proyecto
        $request->validate([
            'name' => ['required', 'min:3', new DatabaseExists],
        ]);

        try {
            // Crear el proyecto
            $project = Auth::user()->projects()->create([
                'name' => $request->name,
            ]);

            // Nombre de la base de datos
            $dbName = $project->name;
            $existingDbName = env('EXISTING_DB_NAME');

            // Crear la base de datos
            DB::statement("CREATE DATABASE `{$dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

            // Copiar tablas de la base de datos existente
            $tables = DB::select("SHOW TABLES FROM `$existingDbName`");
            foreach ($tables as $table) {
                $tableName = $table->{"Tables_in_$existingDbName"};
                DB::statement("CREATE TABLE `$dbName`.`$tableName` LIKE `$existingDbName`.`$tableName`");
                DB::statement("INSERT INTO `$dbName`.`$tableName` SELECT * FROM `$existingDbName`.`$tableName`");
            }

            // Ruta base para los proyectos
            $basePath = env('PROJECTS_BASE_PATH');
            $projectPath = "$basePath/{$project->name}";

            // Validar que el directorio base existe antes de copiar
            if (!File::exists(public_path(env('JOOMLA_TEMPLATE_PATH')))) {
                throw new \Exception("La ruta del template de Joomla no existe.");
            }

            // Copiar el proyecto base Joomla
            File::copyDirectory(public_path(env('JOOMLA_TEMPLATE_PATH')), public_path($projectPath));

            // Cargar el archivo stub
            $stubPath = resource_path('stubs/configuration.php.stub');
            if (!File::exists($stubPath)) {
                throw new \Exception("El archivo stub configuration.php no se encontró.");
            }

            $stubContent = File::get($stubPath);

            // Reemplazar el nombre de la base de datos en el archivo de configuración
            $configurationContent = str_replace('{{ db_name }}', $project->name, $stubContent);

            // Guardar el archivo de configuración
            if (File::put(public_path("$projectPath/configuration.php"), $configurationContent) === false) {
                throw new \Exception("No se pudo escribir el archivo configuration.php.");
            }

            return redirect(route('dashboard'))->with('success', 'Proyecto creado exitosamente.');
        } catch (\Exception $e) {
            // Manejo de errores
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }


    /**
     * Delete the user's account.
     *
     * @return RedirectResponse
     */
    public function destroy(Project $project): RedirectResponse
    {
        try {
            // Eliminar la base de datos del proyecto si existe
            $escapedValue = DB::getPdo()->quote($project->name);
            $existingDatabase = DB::select("SHOW DATABASES LIKE {$escapedValue}");
            if ($existingDatabase) {
                DB::statement("DROP DATABASE `{$project->name}`");
            }

            // Eliminar los archivos del proyecto
            $basePath = env('PROJECTS_BASE_PATH');
            $projectPath = "$basePath/{$project->name}";

            if (File::exists(public_path($projectPath))) {
                File::deleteDirectory(public_path($projectPath));
            }

            // Eliminar el registro del proyecto en la base de datos
            $project->delete();

            // Redirigir con mensaje de éxito
            return redirect(route('dashboard'))->with('success', 'Proyecto eliminado exitosamente.');
        } catch (\Exception $e) {
            // Manejo de errores
            return redirect()->back()->withErrors(['error' => 'Error al eliminar el proyecto: ' . $e->getMessage()]);
        }
    }
}
