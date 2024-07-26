<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::paginate(10)->onEachSide(1);
        return inertia('Project/Index', [
            'projects' => ProjectResource::collection($projects)
        ]);
    }
    public function create()
    {
        return inertia('Project/Create');
    }
    public function store(ProjectRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        Project::create($data);

        return to_route('projects.index');
    }
    public function show(Project $project)
    {
        //
    }
    public function edit(Project $project)
    {
        //
    }
    public function update(ProjectRequest $request, Project $project)
    {
        //
    }
    public function destroy(Project $project)
    {
        $project->delete();
        return to_route('projects.index');
    }
}
