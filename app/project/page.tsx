import ProjectList from "@/components/project/project-list";

export default function ProjectPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Available Projects</h1>
      <ProjectList />
    </main>
  );
}
