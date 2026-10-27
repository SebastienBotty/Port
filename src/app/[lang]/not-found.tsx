import Link from "next/link";

export default function NotFound() {
  return <main className="wrap not-found"><p className="mono">404</p><h1 className="display">PAGE INTROUVABLE.<br />PAGE NOT FOUND.</h1><Link className="work-link" href="/fr">Portfolio FR ↗</Link><Link className="work-link" href="/en">Portfolio EN ↗</Link></main>;
}
