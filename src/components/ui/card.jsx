"use client"
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  onMouseMove,
  onMouseLeave,
  children,
  ...props
}) {
  const ref = React.useRef(null)
  const handleMouseMove = React.useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty("--mx", x + "px")
    el.style.setProperty("--my", y + "px")
    if (onMouseMove) onMouseMove(e)
  }, [onMouseMove])

  const handleMouseLeave = React.useCallback((e) => {
    const el = ref.current
    if (el) {
      el.style.setProperty("--mx", "-999px")
      el.style.setProperty("--my", "-999px")
    }
    if (onMouseLeave) onMouseLeave(e)
  }, [onMouseLeave])

  return (
    <div
      ref={ref}
      data-slot="card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "bg-card text-card-foreground relative overflow-hidden group flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}>
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: "radial-gradient(140px circle at var(--mx, -999px) var(--my, -999px), color-mix(in oklab, var(--primary) 22%, transparent), transparent 60%)"
        }}
      />
      {children}
    </div>
  );
}

function CardHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props} />
  );
}

function CardTitle({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props} />
  );
}

function CardDescription({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props} />
  );
}

function CardAction({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props} />
  );
}

function CardContent({
  className,
  ...props
}) {
  return (<div data-slot="card-content" className={cn("px-6", className)} {...props} />);
}

function CardFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
