"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { MapPin, Star, Users, Leaf, Heart, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useProject } from "@/hooks/projects/use-projects";
import { useToggleProjectFavorite, useParticipateInProject } from "@/hooks/projects/use-project-mutations";
import type { EnhancedProject } from "@/services/api/projects-api";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: EnhancedProject;
}

// Loading skeleton for modal content
function ProjectModalSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-48 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

// Error component for modal
function ProjectModalError({ error, refetch }: { error: Error; refetch: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <Alert className="max-w-md">
        <AlertDescription>
          Failed to load project details. Please try again.
        </AlertDescription>
      </Alert>
      <Button onClick={refetch} variant="outline" className="flex items-center gap-2">
        <RefreshCw className="w-4 h-4" />
        Retry
      </Button>
    </div>
  );
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) {
  const [participationAmount, setParticipationAmount] = useState<number>(1);
  
  // Fetch detailed project data using React Query
  const { 
    data: detailedProject, 
    isLoading, 
    error, 
    refetch 
  } = useProject(project.id);

  // Mutations
  const toggleFavorite = useToggleProjectFavorite();
  const participateInProject = useParticipateInProject();

  // Use detailed project data if available, otherwise fall back to passed project
  const displayProject = detailedProject || project;

  const handleFavoriteToggle = () => {
    toggleFavorite.mutate(project.id);
  };

  const handleParticipate = () => {
    if (participationAmount > 0) {
      participateInProject.mutate({
        projectId: project.id,
        amount: participationAmount,
      });
    }
  };

  const handleClose = () => {
    setParticipationAmount(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <DialogTitle className="text-2xl font-bold text-black dark:text-white">
              {displayProject.name || displayProject.title}
            </DialogTitle>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center text-sm text-black dark:text-gray-300 gap-1">
                <MapPin className="w-4 h-4" />
                {displayProject.location}
              </div>
              {displayProject.rating && (
                <div className="flex items-center text-sm text-black dark:text-gray-300 gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  {displayProject.rating}
                  <span className="text-gray-500 dark:text-gray-400 text-xs">(12 reviews)</span>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteToggle}
            disabled={toggleFavorite.isPending}
            className="flex items-center gap-2"
          >
            <Heart 
              className={`w-5 h-5 ${displayProject.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </Button>
        </div>

        {/* Loading state */}
        {isLoading && <ProjectModalSkeleton />}

        {/* Error state */}
        {error && <ProjectModalError error={error} refetch={refetch} />}

        {/* Content */}
        {!isLoading && !error && displayProject && (
          <>
            <div className="grid grid-cols-[2fr_1fr] gap-1 mb-6">
              {/* Main image */}
              <div className="relative aspect-[8/3] w-full rounded-lg overflow-hidden">
                <Image
                  src={displayProject.mainImage || displayProject.imageUrl || "/placeholder.svg"}
                  alt="Main"
                  fill
                  className="object-cover"
                />
              </div>

              {/* 2x2 thumbnail grid */}
              <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
                {(displayProject.thumbnails || []).slice(0, 4).map((thumb, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] w-full rounded-lg overflow-hidden"
                  >
                    <Image
                      src={thumb || "/placeholder.svg"}
                      alt={`Thumb ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-between border-y border-gray-200 dark:border-gray-700 py-4 mb-6">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <p className="text-black dark:text-white text-sm">
                  <strong>{displayProject.capacity || `${displayProject.supply} tokens`}</strong>{" "}
                  <span className="text-gray-500 dark:text-gray-400">
                    {displayProject.remaining && `/ ${displayProject.remaining}`}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-black dark:text-white font-medium">Annual Impact:</p>
                <p className="text-[#21bf50] font-semibold text-sm">
                  {displayProject.annualImpact || displayProject.impact}
                </p>
              </div>
            </div>

            {/* About & Mission */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* About */}
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-2">About</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {displayProject.about || displayProject.description}
                </p>
              </div>

              {/* Mission */}
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-2">Mission</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {displayProject.mission || "Our mission is to restore and protect natural ecosystems through sustainable reforestation practices."}
                </p>
              </div>
            </div>

            {/* Species & Activities */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Species */}
              {displayProject.species && displayProject.species.length > 0 && (
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-2">Tree Species</h3>
                  <div className="flex flex-wrap gap-2">
                    {displayProject.species.map((species, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full"
                      >
                        {species}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Activities */}
              {displayProject.activities && displayProject.activities.length > 0 && (
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-2">Activities</h3>
                  <div className="flex flex-wrap gap-2">
                    {displayProject.activities.map((activity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Participation Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="font-semibold text-black dark:text-white mb-4">Participate in this Project</h3>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="participation-amount">Amount (tokens)</Label>
                  <Input
                    id="participation-amount"
                    type="number"
                    min="1"
                    value={participationAmount}
                    onChange={(e) => setParticipationAmount(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <Button
                  onClick={handleParticipate}
                  disabled={participateInProject.isPending || participationAmount <= 0}
                  className="flex items-center gap-2"
                >
                  {participateInProject.isPending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Participating...
                    </>
                  ) : (
                    <>
                      <Leaf className="w-4 h-4" />
                      Participate
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
