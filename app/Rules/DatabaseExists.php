<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;

class DatabaseExists implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $escapedValue     = DB::getPdo()->quote($value);
        $existingDatabase = DB::select("SHOW DATABASES LIKE {$escapedValue}");

        if (!empty($existingDatabase)) {
            $fail("The database name ($value) already exists. Please choose another.");
        }
    }
}
