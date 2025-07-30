"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MapPin, Star, Users, Leaf } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    title: string;
    location: string;
    rating: number;
    mainImage: string;
    thumbnails: string[];
    capacity: string;
    remaining: string;
    annualImpact: string;
    about: string;
    mission: string;
    species: string[];
    activities: string[];
  };
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <DialogTitle className="text-2xl font-bold text-black dark:text-white">
              {project.title}
            </DialogTitle>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center text-sm text-black dark:text-gray-300 gap-1">
                <MapPin className="w-4 h-4" />
                {project.location}
              </div>
              <div className="flex items-center text-sm text-black dark:text-gray-300 gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                {project.rating}
                <span className="text-gray-500 dark:text-gray-400 text-xs">(12 reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-1 mb-6">
          {/* Main image */}
          <div className="relative aspect-[8/3] w-full rounded-lg overflow-hidden">
            <Image
              src={project.mainImage || "/placeholder.svg"}
              alt="Main"
              fill
              className="object-cover"
            />
          </div>

          {/* 2x2 thumbnail grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
            {project.thumbnails.slice(0, 4).map((thumb, i) => (
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
            <Image
              src="/icons/tree-icon.svg"
              alt="tree"
              width={20}
              height={20}
            />
            <p className="text-black dark:text-white text-sm">
              <strong>{project.capacity}</strong>{" "}
              <span className="text-gray-500 dark:text-gray-400">
                / {parseInt(project.capacity) + parseInt(project.remaining)}
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-black dark:text-white font-medium">Annual Impact:</p>
            <p className="text-[#21bf50] font-semibold text-sm">
              {project.annualImpact}
            </p>
          </div>
        </div>

        {/* About & Mission */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* About */}
          <div>
            <h3 className="font-semibold text-black dark:text-white text-base flex items-center gap-2 mb-2">
              <Users className="w-4 h-4" />
              About our project
            </h3>
            <p className="text-sm text-black dark:text-gray-300 leading-relaxed">
              {project.about}
            </p>
          </div>

          {/* Mission + Species */}
          <div>
            <h3 className="font-semibold text-black dark:text-white text-base flex items-center gap-2 mb-2">
              <Leaf className="w-4 h-4" />
              Mission
            </h3>
            <p className="text-sm text-black dark:text-gray-300 leading-relaxed mb-4">
              {project.mission}
            </p>
            <div>
              <p className="text-black dark:text-white font-medium text-sm mb-1">
                Available Species:
              </p>
              <div className="text-sm text-black dark:text-gray-300 space-x-2">
                {project.species.map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="underline hover:text-green-600 dark:hover:text-green-400"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activities & Tokens */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Activities */}
          <div>
            <p className="text-black dark:text-white font-medium text-sm mb-2">Activities:</p>
            <div className="flex flex-wrap gap-2">
              {project.activities.map((activity, index) => (
                <span
                  key={index}
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-black dark:text-white"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>

          {/* Tokens */}
          <div>
            <p className="text-black dark:text-white font-medium text-sm mb-2">
              Available Tokens:
            </p>
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center"
                >
                  <Leaf className="w-5 h-5 text-[#7EF45D]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 border border-[#7EF45D] text-black dark:text-white bg-[#DFFFD4] dark:bg-gray-800 hover:bg-[#caf8be] dark:hover:bg-gray-700"
          >
            Need information?
          </Button>
          <Button className="flex-1 bg-[#7EF45D] hover:bg-[#6DE04A] text-black">
            Apply to this project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
