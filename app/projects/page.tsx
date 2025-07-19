import ProjectList from "@/components/projects/project-list";

export default function ProjectsPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Available Projects</h1>
      <ProjectList />
    </main>
  );
}
