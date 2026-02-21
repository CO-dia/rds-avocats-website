import { Mail, Scale } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/5 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="text-accent" size={20} strokeWidth={1.5} />
              <span className="font-heading text-xl font-bold tracking-wider text-accent">
                RDS<span className="text-gold">.</span>Avocats
              </span>
            </div>
            <p className="mt-4 font-heading text-sm italic text-gold/60">
              Votre avenir, notre mission.
            </p>
          </div>

          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Contact
            </h4>
            <a
              href="mailto:info@rds-avocats.com"
              className="mt-4 flex items-center gap-3 font-body text-sm text-gold-dim transition-colors hover:text-gold"
            >
              <Mail size={16} strokeWidth={1.5} />
              info@rds-avocats.com
            </a>
          </div>

          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Navigation
            </h4>
            <div className="mt-4 flex flex-col gap-2">
              {[
                { label: "Accueil", href: "#accueil" },
                { label: "À propos", href: "#a-propos" },
                { label: "Équipe", href: "#equipe" },
                { label: "Services", href: "#services" },
                { label: "Rendez-vous", href: "#rendez-vous" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-gold-dim transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/5 pt-8 sm:flex-row sm:justify-between">
          <p className="font-body text-xs text-gold-dim/50">
            &copy; {new Date().getFullYear()} RDS Avocats. Tous droits réservés.
          </p>
          <div className="flex items-center gap-1">
            <div className="h-1 w-1 rounded-full bg-accent/50" />
            <div className="h-1 w-1 rounded-full bg-accent/30" />
            <div className="h-1 w-1 rounded-full bg-accent/10" />
          </div>
        </div>
      </div>
    </footer>
  );
}
