import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export function NextjsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" {...props}>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.666 18.067l-5.69-8.24v8.24h-1.9V5.933h1.9l5.69 8.24V5.933h1.9v12.134h-1.9z" />
    </svg>
  );
}

export function ReactIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" className="w-8 h-8" {...props}>
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="#38bdf8" />
    </svg>
  );
}

export function TypeScriptIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" {...props}>
      <rect width="24" height="24" rx="5" fill="#3178C6" />
      <path d="M11.5 10.5H5.5V12.2H7.5V19H9.5V12.2H11.5V10.5Z" fill="white" />
      <path d="M18.8 12.8C18.3 12.2 17.5 11.9 16.5 11.9C15.4 11.9 14.6 12.3 14.1 12.8C13.6 13.3 13.4 14 13.4 14.9C13.4 15.8 13.7 16.5 14.3 17C14.9 17.5 15.8 17.8 16.9 18.1C17.6 18.3 18.1 18.5 18.3 18.7C18.5 18.9 18.6 19.2 18.6 19.6C18.6 20 18.4 20.4 18 20.6C17.6 20.8 17 21 16.3 21C15.4 21 14.7 20.7 14.1 20.2C13.5 19.7 13.1 19 13 18.2L11 18.8C11.3 20.1 11.9 21.1 12.8 21.8C13.7 22.5 14.9 22.9 16.3 22.9C17.7 22.9 18.9 22.5 19.8 21.7C20.7 20.9 21.1 19.8 21.1 18.5C21.1 17.5 20.8 16.7 20.1 16.1C19.4 15.5 18.5 15.2 17.3 14.9C16.6 14.7 16.1 14.5 15.9 14.3C15.7 14.1 15.6 13.8 15.6 13.5C15.6 13.2 15.8 12.9 16.1 12.7C16.4 12.5 16.8 12.4 17.3 12.4C18 12.4 18.5 12.6 18.9 13C19.3 13.4 19.6 13.9 19.7 14.6L21.6 14.1C21.4 13.1 20.9 12.2 20.1 11.5C19.8 11.2 19.3 11 18.8 10.8V12.8Z" fill="white" />
    </svg>
  );
}

export function NodejsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#22c55e" className="w-8 h-8" {...props}>
      <path d="M12 2L2 7.7v11.6L12 25l10-5.7V7.7L12 2zm-1 18.5l-6-3.4V10l6 3.4v7.1zm2 0v-7.1l6-3.4v7.1l-6 3.4zM12 11.3L6.1 8 12 4.6 17.9 8 12 11.3z" />
    </svg>
  );
}

export function GoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#00ADD8" className="w-8 h-8" {...props}>
      <path d="M1.5 12c0-4.1 3.2-7.5 7.5-7.5 2.6 0 4.8 1.2 6.1 3.2l-2.4 1.7C11.8 8 10.5 7.1 9 7.1c-2.7 0-4.8 2.2-4.8 4.9s2.1 4.9 4.8 4.9c1.7 0 3.1-.8 3.9-2.2H9v-2.5h6.8v8.8h-2.4v-2c-1.3 1.5-3.1 2.4-5.4 2.4-4.3 0-7.5-3.4-7.5-7.4zm16.5 0c0-4.1 3.3-7.5 7.5-7.5s7.5 3.4 7.5 7.5-3.3 7.5-7.5 7.5-7.5-3.4-7.5-7.5zm12.4 0c0-2.7-2.1-4.9-4.9-4.9s-4.9 2.2-4.9 4.9 2.1 4.9 4.9 4.9 4.9-2.2 4.9-4.9z" transform="scale(0.68) translate(-1, 3)" />
    </svg>
  );
}

export function PythonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" {...props}>
      <path d="M11.9 2C8.6 2 6.5 3.5 6.5 5.5V7.5H12V8.5H4C2.3 8.5 1 9.8 1 11.5C1 13.5 2.5 15.5 5.5 15.5H6.5V13.5C6.5 11.8 7.8 10.5 9.5 10.5H14.5C15.9 10.5 17 9.4 17 8V3.5C17 2.6 14.5 2 11.9 2ZM9.5 3.5C10.1 3.5 10.5 3.9 10.5 4.5C10.5 5.1 10.1 5.5 9.5 5.5C8.9 5.5 8.5 5.1 8.5 4.5C8.5 3.9 8.9 3.5 9.5 3.5Z" fill="#38BDF8" />
      <path d="M12.1 22C15.4 22 17.5 20.5 17.5 18.5V16.5H12V15.5H20C21.7 15.5 23 14.2 23 12.5C23 10.5 21.5 8.5 18.5 8.5H17.5V10.5C17.5 12.2 16.2 13.5 14.5 13.5H9.5C8.1 13.5 7 14.6 7 16V20.5C7 21.4 9.5 22 12.1 22ZM14.5 20.5C13.9 20.5 13.5 20.1 13.5 19.5C13.5 18.9 13.9 18.5 14.5 18.5C15.1 18.5 15.5 18.9 15.5 19.5C15.5 20.1 15.1 20.5 14.5 20.5Z" fill="#FACC15" />
    </svg>
  );
}

export function FlutterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#02569B" className="w-8 h-8" {...props}>
      <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zM14.314 11.229L7.4 18.143l3.7 3.7 3.214-3.214 3.7-3.7-3.7-3.7z" fill="#02569B" />
      <path d="M18.014 14.929l-3.7 3.7 3.7 3.7h7.372l-7.372-7.4z" fill="#0175C2" />
    </svg>
  );
}

export function PostgresIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#336791" className="w-8 h-8" {...props}>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 3c3.9 0 7 3.1 7 7 0 2.2-1 4.2-2.7 5.5l-1.3-1.8c1.3-1 2-2.3 2-3.7 0-2.8-2.2-5-5-5s-5 2.2-5 5c0 1.4.7 2.7 2 3.7L7.7 17.5C6 16.2 5 14.2 5 12c0-3.9 3.1-7 7-7zm-1 5h2v6h-2v-6z" />
    </svg>
  );
}

export function DockerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#2496ED" className="w-8 h-8" {...props}>
      <path d="M13 5h2v2h-2zm-3 0h2v2h-2zm6 3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm9 3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm-3 0h2v2H4z" />
      <path d="M22.5 12.5c-.3 0-.6.1-.9.2-.5-.8-1.4-1.2-2.4-1.2-.2 0-.4 0-.6.1-.3-.6-.8-1.1-1.5-1.3l-.3-.1v1.8c-.3.2-.6.5-.8.8H2c-.6 0-1 .4-1 1 0 3.9 3.1 7.2 7 7.2 4.4 0 8.2-3.2 9.1-7.5 1.2.2 2.4-.2 3.1-1.1.7-.8.8-1.9.3-2.9-.3.1-.7.2-1 .2z" />
    </svg>
  );
}

export function GitIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#F05032" className="w-8 h-8" {...props}>
      <path d="M22.6 10.6L13.4 1.4c-.6-.6-1.5-.6-2.1 0L9.2 3.5l2.6 2.6c.6-.2 1.3 0 1.8.4.5.5.6 1.2.4 1.8l2.5 2.5c.6-.2 1.3 0 1.8.4.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-.6-.6-.7-1.4-.4-2.1l-2.4-2.4v5.3c.2.2.3.5.3.8 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.6.3-1.1.8-1.3V8.8c-.5-.2-.8-.7-.8-1.3 0-.3.1-.6.3-.8L7.8 4.8 1.4 11.2c-.6.6-.6 1.5 0 2.1l9.2 9.2c.6.6 1.5.6 2.1 0l9.9-9.9c.6-.5.6-1.4 0-2z" />
    </svg>
  );
}

// Retained for backwards compatibility if needed
export function TailwindIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#38bdf8" className="w-8 h-8" {...props}>
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
    </svg>
  );
}

export function AstroIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" {...props}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    </svg>
  );
}

export function CppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#00599C" className="w-8 h-8" {...props}>
      <path d="M12 2L2 7.7v11.6L12 25l10-5.7V7.7L12 2zm0 3.3l7 4v8.1l-7 4-7-4V9.3l7-4z" />
    </svg>
  );
}

export function MongoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#47A248" className="w-8 h-8" {...props}>
      <path d="M12.4 1C12.4 1 12 1.4 11.6 2C9.5 5.5 5 11 5 15.5c0 4.1 3.2 7.5 7.2 7.5 4 0 7.2-3.4 7.2-7.5 0-4.5-4.5-10-6.6-13.5-.4-.6-.8-1-.8-1z" />
    </svg>
  );
}

export function GrpcIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#244c5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" {...props}>
      <circle cx="12" cy="5" r="2.5" fill="#38bdf8" />
      <circle cx="5" cy="18" r="2.5" fill="#38bdf8" />
      <circle cx="19" cy="18" r="2.5" fill="#38bdf8" />
      <path d="M12 7.5v9M6.5 16.5l4-7M17.5 16.5l-4-7M7.5 18h9" stroke="#38bdf8" />
    </svg>
  );
}

export function WebpackIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#8DD6F9" className="w-8 h-8" {...props}>
      <path d="M12 1.5l9 5.2v10.6l-9 5.2-9-5.2V6.7l9-5.2zm0 2.3L4.8 8.4l7.2 4.2 7.2-4.2L12 3.8zm-8 6.1v6.8l7 4v-6.8l-7-4zm16 0l-7 4v6.8l7-4v-6.8z" />
    </svg>
  );
}

export function GraphQLIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#E10098" className="w-8 h-8" {...props}>
      <path d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2zm0 2.3L5.3 8.2v7.6L12 19.7l6.7-3.9V8.2L12 4.3z" />
    </svg>
  );
}

export function AiBrainIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" {...props}>
      <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0-3 3.9c0 1.2.5 2.2 1.3 3A4 4 0 0 0 8 18v1a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-1a4 4 0 0 0 1.7-4.1c.8-.8 1.3-1.8 1.3-3A4 4 0 0 0 16 7V6a4 4 0 0 0-4-4z" />
    </svg>
  );
}
