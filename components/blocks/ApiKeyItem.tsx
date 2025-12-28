/** @format */

"use client";

import { useState } from "react";
import { Copy, Key, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function ApiComponent() {
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [postName, setPostName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateProject = async () => {
    setLoading(true);

    const res = await fetch("/api/project/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postName,
        content:
          "Demo Content. This content will be updated with the readme file content of your repository",
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.apiKey) {
      setApiKey(data.apiKey);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className='flex flex-col gap-4 p-4 max-w-md'>
      {apiKey && (
        <div className='flex items-center justify-between rounded-lg px-4 py-2 text-xs bg-gray-100 text-gray-700'>
          <span className='font-mono truncate'>{apiKey}</span>

          <Button variant='ghost' onClick={handleCopy}>
            {copied ? (
              <Check className='h-4 w-4 text-green-500' />
            ) : (
              <Copy className='h-4 w-4' />
            )}
          </Button>
        </div>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button className='flex gap-2'>
            <Key className='h-4 w-4' />
            Generate API Key
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              This will create a project and generate an API key (shown once).
            </DialogDescription>
          </DialogHeader>

          <Input
            placeholder='Project Title'
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
          />

          <DialogFooter>
            <Button
              onClick={handleCreateProject}
              disabled={loading || !postName}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
