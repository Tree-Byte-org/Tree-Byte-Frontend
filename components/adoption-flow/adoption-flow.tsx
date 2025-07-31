"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MapPin,
  TreePine,
  Wallet,
  Gift,
  BarChart3,
} from "lucide-react";
import { FarmSelection } from "@/components/adoption-flow/farm-selection";
import { WalletConnection } from "@/components/adoption-flow/wallet-connection";
import { TreeAdoption } from "@/components/adoption-flow/tree-adoption";
import { NFTPreview } from "@/components/adoption-flow/nft-preview";
import { ImpactDashboard } from "@/components/adoption-flow/impact-dashboard";
import Link from "next/link";

const steps = [
  {
    id: 1,
    title: "Select",
    icon: MapPin,
    description: "Explore farms and choose your tree",
  },
  {
    id: 2,
    title: "Connect your wallet",
    icon: Wallet,
    description: "Link your Stellar wallet",
  },
  {
    id: 3,
    title: "Adopt your tree",
    icon: TreePine,
    description: "Complete the adoption",
  },
  {
    id: 4,
    title: "Receive your NFT",
    icon: Gift,
    description: "Get your digital certificate",
  },
  {
    id: 5,
    title: "Track your impact",
    icon: BarChart3,
    description: "Monitor your forest",
  },
];

export function AdoptionFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [adoptionComplete, setAdoptionComplete] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FarmSelection
            onSelectFarm={setSelectedFarm}
            selectedFarm={selectedFarm}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <WalletConnection
            onConnect={setWalletConnected}
            isConnected={walletConnected}
            onNext={nextStep}
          />
        );
      case 3:
        return (
          <TreeAdoption
            farm={selectedFarm}
            onComplete={setAdoptionComplete}
            onNext={nextStep}
          />
        );
      case 4:
        return <NFTPreview farm={selectedFarm} onNext={nextStep} />;
      case 5:
        return <ImpactDashboard farm={selectedFarm} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <Button variant="ghost" className="mb-6" asChild>
          <div className="flex items-center">
            <Link href={'/'}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>
        </Button>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          🌳 How to adopt your tree on TreeByte?
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Adopting a tree and becoming part of the regenerative movement is very
          easy. Here&apos;s how to do it step by step:
        </p>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.id
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                <step.icon className="h-6 w-6" />
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-full h-1 mx-4 ${
                    currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                  } hidden md:block`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
          {steps.map((step) => (
            <div key={step.id} className="text-center">
              <h3
                className={`font-semibold ${
                  currentStep >= step.id ? "text-green-600" : "text-gray-400"
                }`}
              >
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-6xl mx-auto">{renderStepContent()}</div>

      {/* Navigation */}
      {currentStep > 1 && currentStep < 5 && (
        <div className="flex justify-between max-w-6xl mx-auto mt-8">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <div></div>
        </div>
      )}
    </div>
  );
}
