/**
 * @format
 */
"use client";

import { useEffect, useCallback, useState } from "react";
import { Copy, Key, Check } from "lucide-react";
import { Button } from "../ui/button";
import { generateApiKey } from "@/lib/actions/apiKey";

export default function ApiComponent() {
  const [apiKey, setApiKey] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {}, []);

  const fetchApiKeyItem = useCallback(async () => {
    const key = await generateApiKey();
    setApiKey(key);
  }, [setApiKey]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className='flex flex-row p-4 gap-3'>
      <div className='flex items-center justify-between rounded-lg px-4 py-2 text-xs bg-gray-100 text-gray-600'>
        <span className='tracking-wide font-bold px-6'>{apiKey}</span>

        <Button
          variant='ghost'
          onClick={handleCopy}
          className='flex items-center gap-1 rounded px-2 py-1 transition cursor-pointer hover:underline'
          aria-label='Copy code'
        >
          {copied ? (
            <>
              <Check className='h-3.5 w-3.5 text-green-500' />
              Copied
            </>
          ) : (
            <>
              <Copy className='h-3.5 w-3.5' />
              Copy
            </>
          )}
        </Button>
      </div>
      <Button
        onClick={fetchApiKeyItem}
        variant='default'
        className='cursor-pointer font-mono font-stretch-50% uppercase self-center'
      >
        <Key className='h-4 w-4' /> Generate Key
      </Button>
    </section>
  );
}
