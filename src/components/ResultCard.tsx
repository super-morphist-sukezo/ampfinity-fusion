"use client";

interface ResultData {
  inputWord: string;
  antonym: string;
  caption: string;
  finiteText: string;
  infiniteText: string;
}

export default function ResultCard({ data }: { data: ResultData }) {
  return (
    <div className="w-full max-w-3xl mx-auto manifest-output">
      <div className="subtitle">
        {data.inputWord} and {data.antonym}：「{data.caption}」
      </div>
      <div className="finite">• Finite: {data.finiteText}</div>
      <div className="infinite">• Infinite: {data.infiniteText}</div>
    </div>
  );
}
