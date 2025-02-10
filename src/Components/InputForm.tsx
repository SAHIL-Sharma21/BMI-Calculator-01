"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bmiInMetric, bmiInImperial } from "@/services/logic";
import React, { useState } from "react";
import { Result } from "./Result";
import { History } from "@/services/history";
import { Switch } from "@/components/ui/switch";

interface InputFormProps {
  setHistory: React.Dispatch<React.SetStateAction<History[]>>;
}

export const InputForm = ({setHistory}: InputFormProps) => {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const handleBmiCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userValues = {
        weight: parseFloat(weight),
        height: parseFloat(height),
      };
      if (isNaN(userValues.weight) || isNaN(userValues.height)) {
        throw new Error("Please enter valid numbers.");
      }
      if (userValues.weight <= 0 || userValues.height <= 0) {
        throw new Error("Values must be greater than zero.");
      }

      const bmiResult = unit === "metric" ? bmiInMetric(userValues.weight, userValues.height) :  bmiInImperial(userValues.weight, userValues.height);
      setResult(bmiResult);

      const newHistory: History = {
        weight: userValues.weight,
        height: userValues.height,
        bmi: bmiResult,
      };

      const updatedHistory = [...JSON.parse(localStorage.getItem("history") || "[]"), newHistory];
      localStorage.setItem("history", JSON.stringify(updatedHistory));
      setHistory(updatedHistory); // Update UI immediately
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setHeight("");
        setWeight("");
      }, 500);
    }
  };

  return (
    <Card className="w-[450px] bg-gray-800 border-none p-6 rounded-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-white text-2xl font-bold">
          BMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* {Unit Toggle } */}
        <div className="flex justify-between items-center mb-6">
            <Label className="text-gray-300 text-lg">Metric</Label>
            <Switch 
            checked={unit === "imperial"}
            onCheckedChange={() => setUnit(unit === "metric" ? "imperial" : "metric")}
            className="data-[state=checked]:bg-blue-600"
            />
            <Label className="text-gray-300 text-lg">Imperial</Label>
        </div>

        <form onSubmit={handleBmiCalculation}>
          <div className="space-y-4">
            {/* Weight Input */}
            <div className="flex flex-col">
              <Label htmlFor="weight" className="text-gray-300 text-lg">
                Weight ({unit === "metric" ? "KG" : "lbs"})
              </Label>
              <Input
                id="weight"
                placeholder={`Enter weight in ${unit === "metric" ? "KG" : "lbs"}`}
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="p-3 rounded-lg border-none bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Height Input */}
            <div className="flex flex-col">
              <Label htmlFor="height" className="text-gray-300 text-lg">
                Height ({unit === "metric" ? "M" : "inches"})
              </Label>
              <Input
                id="height"
                placeholder={`Enter height in ${unit === "metric" ? "M" : "inches"}`}
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="p-3 rounded-lg border-none bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
          )}

          <Button
            type="submit"
            variant="default"
            className="w-full mt-6 p-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Check Result"}
          </Button>
        </form>
      </CardContent>

      {result && <Result bmiValue={result} />}
    </Card>
  );
};
