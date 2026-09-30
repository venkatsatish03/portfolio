import { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'

interface HackerDossierProps {
  code: string
  fileName?: string
}

interface CodeToken {
  text: string
  className: string
  start: number
  end: number
}

export function HackerDossier({
  code,
  fileName = 'satish_dossier.ts',
}: HackerDossierProps) {
  const [typedLength, setTypedLength] = useState(0)
  const [copied, setCopied] = useState(false)
  const isTyping = typedLength < code.length
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Tokenize the code snippet for hacker-style syntax highlighting
  const tokens = useMemo(() => {
    const result: CodeToken[] = []
    const regex =
      /(\/\/[^\n]*)|("(?:\\.|[^"\\])*")|(\b(?:const|let|var|export|function)\b)|([a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*:))|([a-zA-Z_$][a-zA-Z0-9_$]*)|([{}()[\];:,=])|(\s+)|(.)/g

    let match: RegExpExecArray | null
    let cursor = 0

    while ((match = regex.exec(code)) !== null) {
      const [full, comment, str, kw, prop, ident, punct, space] = match
      const start = cursor
      const end = cursor + full.length
      cursor = end

      let className = 'text-emerald-400'
      if (comment) {
        className = 'text-emerald-600/80 italic'
      } else if (str) {
        className =
          'text-emerald-200 font-medium drop-shadow-[0_0_6px_rgba(167,243,208,0.4)]'
      } else if (kw) {
        className =
          'text-lime-400 font-bold drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]'
      } else if (prop) {
        className =
          'text-green-300 font-semibold drop-shadow-[0_0_5px_rgba(134,239,172,0.3)]'
      } else if (ident) {
        className = 'text-emerald-300 font-medium'
      } else if (punct) {
        className = 'text-emerald-500'
      } else if (space) {
        className = ''
      }

      result.push({ text: full, className, start, end })
    }

    return result
  }, [code])

  // Continuous typing engine
  useEffect(() => {
    if (isPaused) return

    if (typedLength < code.length) {
      const nextChar = code[typedLength]

      // Organic typing delays: pause longer at newlines and punctuation
      let delay = 18
      if (nextChar === '\n') {
        delay = 60
      } else if (nextChar === ',' || nextChar === ':') {
        delay = 35
      }

      timerRef.current = setTimeout(() => {
        setTypedLength((prev) => prev + 1)
      }, delay)
    } else {
      // Completed typing! Hold for 4.5 seconds, then continuously restart
      timerRef.current = setTimeout(() => {
        setTypedLength(0)
      }, 4500)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [typedLength, code, isPaused])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Fallback if clipboard API is blocked
      const textArea = document.createElement('textarea')
      textArea.value = code
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  const handleRestart = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setTypedLength(0)
    setIsPaused(false)
  }

  const handleSkip = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setTypedLength(code.length)
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="relative mt-6 overflow-hidden rounded-xl border border-emerald-500/40 bg-[#050806] shadow-[0_0_35px_rgba(16,185,129,0.18),_inset_0_1px_0_rgba(52,211,153,0.15)] font-mono text-xs selection:bg-emerald-500 selection:text-black"
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background Radial Phosphor Bloom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.12),_transparent_75%)]"
      />

      {/* Retro CRT Scanline Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25 hacker-crt-scanlines z-10"
      />

      {/* Terminal Window Header Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between border-b border-emerald-500/25 bg-[#080d0a]/90 px-4 py-2.5 backdrop-blur-sm">
        {/* Left: Window Dots & Title */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/90 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/90 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]/90 shadow-[0_0_6px_rgba(16,185,129,0.6)] animate-pulse" />
          </div>
          <span className="ml-2 text-[11px] tracking-wider text-emerald-400 font-semibold hacker-text-glow">
            // {fileName}
          </span>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-3 text-[11px]">
          {/* Live Status indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-emerald-400/80">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isTyping
                  ? 'bg-emerald-400 animate-ping'
                  : isPaused
                    ? 'bg-amber-400'
                    : 'bg-emerald-500'
              }`}
            />
            <span className="text-[10px] tracking-widest uppercase">
              {isPaused ? 'PAUSED' : isTyping ? 'STREAMING' : 'LOOPING'}
            </span>
          </div>

          {/* Pause / Play Toggle */}
          <button
            aria-label={isPaused ? 'Resume typing' : 'Pause typing'}
            className="text-emerald-400/70 hover:text-emerald-300 transition-colors cursor-pointer"
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Resume typing' : 'Pause typing'}
            type="button"
          >
            {isPaused ? '▶ Play' : '⏸ Pause'}
          </button>

          {/* Skip / Replay */}
          {isTyping ? (
            <button
              aria-label="Skip typing animation"
              className="text-emerald-400/70 hover:text-emerald-300 transition-colors cursor-pointer"
              onClick={handleSkip}
              title="Show full code immediately"
              type="button"
            >
              ⏩ Skip
            </button>
          ) : (
            <button
              aria-label="Replay typing animation"
              className="text-emerald-400/70 hover:text-emerald-300 transition-colors cursor-pointer"
              onClick={handleRestart}
              title="Restart typing"
              type="button"
            >
              ↺ Replay
            </button>
          )}

          {/* Copy Button */}
          <button
            aria-label="Copy dossier code"
            className="flex items-center gap-1 rounded border border-emerald-500/40 bg-emerald-950/40 px-2.5 py-0.5 font-semibold text-emerald-300 transition-all hover:border-emerald-400 hover:bg-emerald-900/60 hover:text-white shadow-[0_0_10px_rgba(16,185,129,0.15)] cursor-pointer"
            onClick={handleCopy}
            type="button"
          >
            {copied ? (
              <>
                <span className="text-emerald-400">✓</span>
                <span>Copied</span>
              </>
            ) : (
              <span>Copy</span>
            )}
          </button>
        </div>
      </div>

      {/* Terminal Content Area */}
      <div className="relative z-20 p-4 sm:p-5 overflow-x-auto min-h-[285px]">
        {/* Terminal Command Line prompt */}
        <div className="mb-3 flex items-center gap-2 text-[11px] text-emerald-600/90 select-none">
          <span className="text-emerald-400 font-bold">$</span>
          <span className="text-emerald-300">cat</span>
          <span className="text-emerald-500">satish_dossier.ts</span>
          <span className="text-emerald-700/80">--decrypt --live-stream</span>
        </div>

        {/* Typed Code Output */}
        <pre className="text-[11.5px] sm:text-[12px] leading-relaxed font-mono hacker-text-glow">
          {tokens.map((token, i) => {
            if (typedLength <= token.start) return null

            if (typedLength >= token.end) {
              return (
                <span className={token.className} key={i}>
                  {token.text}
                </span>
              )
            }

            // Partially typed token
            const partial = token.text.slice(0, typedLength - token.start)
            return (
              <span className={token.className} key={i}>
                {partial}
              </span>
            )
          })}

          {/* Flashing Green Hacker Cursor */}
          <span
            aria-hidden="true"
            className="inline-block text-emerald-400 font-bold animate-terminal-cursor select-none shadow-[0_0_8px_rgba(52,211,153,0.8)]"
          >
            █
          </span>
        </pre>
      </div>

      {/* Terminal Footer Status Bar */}
      <div className="relative z-20 flex items-center justify-between border-t border-emerald-500/20 bg-[#060a08] px-4 py-1.5 text-[10px] text-emerald-600 select-none">
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span>TypeScript</span>
          <span className="hidden sm:inline">SEC_LEVEL: 0xDEADBEEF</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-500/80">
          <span>
            {typedLength}/{code.length} CHARS
          </span>
          <span>•</span>
          <span className="text-emerald-400">
            {Math.round((typedLength / code.length) * 100)}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}
