"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import InputField from "@/components/InputField";
import ResultCard from "@/components/ResultCard";
import LoadingState from "@/components/LoadingState";

interface FusionResult {
  inputWord: string;
  antonym: string;
  caption: string;
  finiteText: string;
  infiniteText: string;
}

interface GeneratedFusionResult {
  inputWord: string;
  antonym: string;
  caption: string;
  finite?: string;
  infinite?: string;
  finiteText?: string;
  infiniteText?: string;
}

export default function AmpfinityPage() {
  const [term, setTerm] = useState("");
  const [activeResult, setActiveResult] = useState<FusionResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const existingEntry = useQuery(
    api.entries.getByInputWord,
    term ? { inputWord: term } : "skip"
  );
  const generate = useAction(api.ai.generateSynergy);

  const toFusionResult = (result: GeneratedFusionResult): FusionResult => ({
    inputWord: result.inputWord,
    antonym: result.antonym,
    caption: result.caption,
    finiteText: result.finiteText ?? result.finite ?? "",
    infiniteText: result.infiniteText ?? result.infinite ?? "",
  });

  const handleFusion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      if (existingEntry) {
        setActiveResult(toFusionResult(existingEntry as GeneratedFusionResult));
      } else {
        const newResult = await generate({ inputWord: term });
        setActiveResult(toFusionResult(newResult as GeneratedFusionResult));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Link href="https://ampfinity.io/" aria-label="Home">
        <div className="logo">&amp;</div>
      </Link>

      <main className="page-wrap !pt-[78px]">
        <section className="w-full max-w-[820px] ml-auto space-y-10">
          <h1 className="text-4xl md:text-5xl font-black text-center">&amp;^&amp; Fusion Generator 🐾</h1>

          <InputField
            term={term}
            setTerm={setTerm}
            onSubmit={handleFusion}
            isGenerating={isGenerating}
          />

          <section className="min-h-[120px] flex items-center justify-center">
            {isGenerating ? (
              <LoadingState />
            ) : activeResult ? (
              <ResultCard data={activeResult} />
            ) : (
              <div className="text-center max-w-md mx-auto">
                <div className="text-base md:text-lg">
                  単語を入れて対立とFusion♪ Finite × Infiniteを&^&生成しよう ✨
                </div>
              </div>
            )}
          </section>

          

          <footer className="text-center mt-20 pt-10 border-t border-[#fff] text-[0.8em] text-[#666]">
            <p>Ampfinity © 2026. #思想哲学</p>
          </footer>
        </section>
      </main>
    </>
  );
}
