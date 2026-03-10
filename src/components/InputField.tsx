"use client";

interface InputFieldProps {
  term: string;
  setTerm: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isGenerating: boolean;
}

export default function InputField({ term, setTerm, onSubmit, isGenerating }: InputFieldProps) {
  return (
    <form onSubmit={onSubmit} className="input-group w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="単語を入力 (例: 自由、AI)"
        disabled={isGenerating}
        className="bot-input"
      />
      <button
        type="submit"
        disabled={isGenerating || !term}
        className="bot-submit"
      >
        {isGenerating ? "生成中..." : "Generate"}
      </button>
    </form>
  );
}
