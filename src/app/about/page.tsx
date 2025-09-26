"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AboutPage() {
  return (
    <main className="p-6">
      <Card className="p-4">
        <CardContent>
          <h2 className="text-xl font-semibold">About Kanban</h2>
          <p className="mt-2 text-gray-600">
            This project is part of the MyCritters onboarding.
          </p>

          <div className="mt-4 flex gap-2">
            <Input placeholder="Type something..." />
            <Button onClick={() => console.log("Button clicked!")}>
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
