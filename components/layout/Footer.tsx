import { ArrowUpRight } from "lucide-react";
import { group } from "@/data/group";
export function Footer() {
  return (
    <footer className="container footer">
      <div>
        <a className="brand" href="#home">
          {group.name}
          <span className="brand-period">/</span>
        </a>
        <p>Twelve people. A story still unfolding.</p>
      </div>
      <span>
        © {new Date().getFullYear()} {group.name}
      </span>
      <a className="back-top" href="#home">
        Back to top <ArrowUpRight size={16} />
      </a>
    </footer>
  );
}
