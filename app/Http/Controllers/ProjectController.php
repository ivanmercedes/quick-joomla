<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Rules\DatabaseExists;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
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
        $request->validate([
            'name' => ['required', 'min:3',  new DatabaseExists],
        ]);

        $project = Auth::user()
            ->projects()
            ->create([
                'name' => $request->name,
            ]);

        $dbName = $project->name;
        $existingDbName = env('EXISTING_DB_NAME');

        DB::statement("CREATE DATABASE `{$dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

        $tables = DB::select("SHOW TABLES FROM `$existingDbName`");
        foreach ($tables as $table) {
            $tableName = $table->{"Tables_in_$existingDbName"};
            DB::statement("CREATE TABLE `$dbName`.`$tableName` LIKE `$existingDbName`.`$tableName`");
            DB::statement("INSERT INTO `$dbName`.`$tableName` SELECT * FROM `$existingDbName`.`$tableName`");
        }


        return redirect(route('dashboard'));
    }

    /**
     * Delete the user's account.
     *
     * @return RedirectResponse
     */
    public function destroy(Project $project): RedirectResponse
    {
        $escapedValue     = DB::getPdo()->quote($project->name);
        $existingDatabase = DB::select("SHOW DATABASES LIKE {$escapedValue}");
        if ($existingDatabase) {

            DB::statement("DROP DATABASE `{$project->name}`");
        }

        $project->delete();

        return redirect(route('dashboard'));
    }
}
