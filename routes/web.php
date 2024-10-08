<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Models\Project;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/proyectos', function () {
        $projects = Project::orderBy('id', 'desc')->get();

        return Inertia::render(
            'Dashboard',
            [
                'projects' => $projects
            ]
        );
    })->name('dashboard');


    // project routes
    Route::post('/proyectos', [ProjectController::class, 'store'])->name('projects.store');
    Route::delete('/proyectos/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
});

require __DIR__ . '/auth.php';
