import { ArrowUpRight, GitBranch, Menu } from "lucide-react";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import type { AppDictionary } from "@/lib/i18n/dictionaries";
import styles from "@/features/landing/components/landing-page.module.css";

const repositoryUrl = "https://github.com/huynhkhuanit/sqluminate";

const iconProps = {
  "aria-hidden": true,
  size: 15,
  strokeWidth: 1.8,
} as const;

function cx(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function Brand({
  compact = false,
  descriptor,
}: {
  compact?: boolean;
  descriptor?: string;
}) {
  return (
    <span className={cx(styles.brand, compact && styles.brandCompact)}>
      <span aria-hidden="true" className={styles.brandMark}>
        SQL
      </span>
      <span className={styles.brandCopy}>
        <strong>SQLuminate</strong>
        <span>
          {descriptor ??
            (compact ? "Visual SQL Explorer" : "VISUAL SQL EXPLORER")}
        </span>
      </span>
    </span>
  );
}

interface LandingHeaderProps {
  copy?: AppDictionary["landing"]["header"];
}

export function LandingHeader({ copy }: LandingHeaderProps) {
  const headerCopy = copy ?? {
    brandDescriptor: "VISUAL SQL EXPLORER",
    compactBrandDescriptor: "Visual SQL Explorer",
    homeLabel: "SQLuminate home",
    primaryNavigation: "Primary navigation",
    howItWorks: "How it works",
    capabilities: "Capabilities",
    openSource: "Open source",
    github: "GitHub",
    openWorkspace: "Open workspace",
    workspaceShort: "Workspace",
    menu: "Menu",
    navigationMenu: "Navigation menu",
    mobileNavigation: "Mobile navigation",
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a
          aria-label={headerCopy.homeLabel}
          className={styles.brandLink}
          href="#top"
        >
          <Brand descriptor={headerCopy.brandDescriptor} />
        </a>

        <nav
          aria-label={headerCopy.primaryNavigation}
          className={styles.desktopNav}
        >
          <a href="#how-it-works">{headerCopy.howItWorks}</a>
          <a href="#capabilities">{headerCopy.capabilities}</a>
          <a href="#open-source">{headerCopy.openSource}</a>
        </nav>

        <div className={styles.headerActions}>
          <LanguageSwitcher />
          <a
            aria-label={headerCopy.github}
            className={styles.githubLink}
            href={repositoryUrl}
          >
            <GitBranch {...iconProps} />
            <span>{headerCopy.github}</span>
            <ArrowUpRight {...iconProps} />
          </a>
          <a
            aria-label={headerCopy.openWorkspace}
            className={`${styles.button} ${styles.buttonPrimary} ${styles.headerWorkspace}`}
            href="/workspace"
          >
            <span className={styles.workspaceLong}>
              {headerCopy.openWorkspace}
            </span>
            <span className={styles.workspaceShort}>
              {headerCopy.workspaceShort}
            </span>
            <ArrowUpRight {...iconProps} />
          </a>
        </div>

        <details className={styles.mobileMenu}>
          <summary
            aria-label={headerCopy.navigationMenu}
            className={styles.menuTrigger}
          >
            <Menu {...iconProps} />
            <span>{headerCopy.menu}</span>
          </summary>
          <nav
            aria-label={headerCopy.mobileNavigation}
            className={styles.mobileMenuPanel}
          >
            <a href="#how-it-works">{headerCopy.howItWorks}</a>
            <a href="#capabilities">{headerCopy.capabilities}</a>
            <a href="#open-source">{headerCopy.openSource}</a>
            <a href={repositoryUrl}>{headerCopy.github}</a>
            <div className={styles.mobileLanguage}>
              <LanguageSwitcher />
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
