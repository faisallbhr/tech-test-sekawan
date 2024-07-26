<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'max:255'],
            'budget' => ['required', 'numeric'],
            'down_payment' => ['nullable', 'numeric'],
            'due_date' => ['required', 'date'],
            'status' => ['required', Rule::in(['pending', 'in-progress', 'done'])],
            'note' => ['nullable', 'string']
        ];
    }
}
