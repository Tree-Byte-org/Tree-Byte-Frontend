import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Project = {
  id: string; 
  name: string;
  photo_url?: string;
  impact?: string;
  price_per_token?: number;
};

export default function ProjectCard({
  project,
  onAdopt,
}: {
  project: Project;
  onAdopt: (id: string) => void; 
}) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <Image
          width={600}
          height={600}
          src={project.photo_url || "/default-project.jpg"}
          alt={project.name}
          className="w-full h-48 object-cover rounded-md"
          priority
        />
        <h3 className="text-lg font-bold mt-2">{project.name}</h3>
      </CardHeader>
      <CardContent>
        {project.impact && (
          <p className="text-sm text-gray-600">{project.impact}</p>
        )}
        {project.price_per_token && (
          <p className="text-sm font-medium text-green-700 mt-1">
            ${project.price_per_token} per token
          </p>
        )}
        <Button className="mt-3" onClick={() => onAdopt(project.id)}>
          Adopt Tree
        </Button>
      </CardContent>
    </Card>
  );
}
