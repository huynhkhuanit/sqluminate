import {
  ArrowUpRight,
  BookOpen,
  Braces,
  Download,
  FileCode2,
  GitBranch,
  Layers,
  Paintbrush,
  Save,
  Scale,
  ShieldCheck,
  Sun,
  UserRoundX,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AppDictionary } from "@/lib/i18n/dictionaries";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { GuidedFormatDemo } from "@/features/landing/components/guided-format-demo";
import {
  Brand,
  LandingHeader,
} from "@/features/landing/components/landing-header";
import styles from "@/features/landing/components/landing-page.module.css";

const repositoryUrl = "https://github.com/huynhkhuanit/sqluminate";
const contributingUrl = `${repositoryUrl}/blob/main/CONTRIBUTING.md`;
const licenseUrl = `${repositoryUrl}/blob/main/LICENSE`;

const iconProps = {
  "aria-hidden": true,
  size: 18,
  strokeWidth: 1.7,
} as const;

type CapabilityStatus = "available" | "inProgress" | "planned";

interface CapabilityItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface CapabilityGroup {
  title: string;
  status: CapabilityStatus;
  items: readonly CapabilityItem[];
}

function cx(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function getCapabilityGroups(
  copy: AppDictionary["landing"]["capabilities"],
): readonly CapabilityGroup[] {
  return [
    {
      title: copy.groups.availableNow,
      status: "available",
      items: [
        { icon: FileCode2, ...copy.items.monaco },
        { icon: Paintbrush, ...copy.items.formatting },
        { icon: Save, ...copy.items.persistence },
        { icon: Sun, ...copy.items.themes },
        { icon: BookOpen, ...copy.items.examples },
      ],
    },
    {
      title: copy.groups.inProgress,
      status: "inProgress",
      items: [
        { icon: Braces, ...copy.items.parser },
        { icon: ShieldCheck, ...copy.items.diagnostics },
      ],
    },
    {
      title: copy.groups.planned,
      status: "planned",
      items: [
        { icon: Layers, ...copy.items.structure },
        { icon: GitBranch, ...copy.items.graph },
        { icon: Workflow, ...copy.items.flow },
        { icon: Download, ...copy.items.export },
        { icon: BookOpen, ...copy.items.gallery },
      ],
    },
  ];
}

function StatusBadge({
  labels,
  status,
}: {
  labels: AppDictionary["landing"]["capabilities"]["statuses"];
  status: CapabilityStatus;
}) {
  return (
    <span className={cx(styles.statusBadge, styles[`status${status}`])}>
      <span aria-hidden="true" className={styles.statusDot} />
      {labels[status]}
    </span>
  );
}

function StepVisual({
  copy,
  variant,
}: {
  copy: AppDictionary["landing"]["howItWorks"]["steps"];
  variant: "write" | "understand" | "explore";
}) {
  if (variant === "write") {
    return (
      <div aria-hidden="true" className={styles.stepVisual}>
        <span>
          <b>SELECT</b> c.name
        </span>
        <span>
          <b>FROM</b> customers c
        </span>
        <span>
          <b>JOIN</b> orders o
        </span>
        <span className={styles.stepCaret} />
      </div>
    );
  }

  if (variant === "understand") {
    return (
      <div
        aria-hidden="true"
        className={cx(styles.stepVisual, styles.scopeVisual)}
      >
        <span className={styles.scopeLine} />
        <span className={styles.scopeChip}>{copy.write.sqlText}</span>
        <span className={styles.scopeChip}>{copy.understand.astBoundary}</span>
        <span className={styles.scopeChip}>{copy.understand.ownedTypes}</span>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cx(styles.stepVisual, styles.flowVisual)}
    >
      <span>{copy.explore.from}</span>
      <i />
      <span className={styles.flowActive}>{copy.explore.join}</span>
      <i />
      <span>{copy.explore.where}</span>
      <i />
      <span>{copy.explore.select}</span>
    </div>
  );
}

interface LandingPageProps {
  dictionary?: AppDictionary;
}

export function LandingPage({
  dictionary = getDictionary("en"),
}: LandingPageProps) {
  const copy = dictionary.landing;
  const capabilityGroups = getCapabilityGroups(copy.capabilities);
  const trustItems: ReadonlyArray<{ icon: LucideIcon; title: string }> = [
    { icon: ShieldCheck, title: copy.trust.processedLocally },
    { icon: FileCode2, title: copy.trust.sqlNeverExecuted },
    { icon: UserRoundX, title: copy.trust.noAccount },
    { icon: Scale, title: copy.trust.mitLicensed },
  ];

  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#main-content">
        {copy.skipToContent}
      </a>

      <LandingHeader copy={copy.header} />

      <main id="main-content">
        <section aria-labelledby="hero-title" className={styles.hero} id="top">
          <div className={cx(styles.container, styles.heroGrid)}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                {copy.hero.eyebrow.map((label, index) => (
                  <span key={label}>
                    {index > 0 ? <span aria-hidden="true">•</span> : null}
                    {label}
                  </span>
                ))}
              </p>
              <h1 aria-label={copy.hero.titleAria} id="hero-title">
                {copy.hero.titleStart}
                <br />
                <span>{copy.hero.titleHighlight}</span>
              </h1>
              <p className={styles.heroBody}>{copy.hero.body}</p>
              <div className={styles.heroActions}>
                <a
                  className={cx(styles.button, styles.buttonPrimary)}
                  href="/workspace"
                >
                  <span>{copy.hero.openEditor}</span>
                  <ArrowUpRight {...iconProps} />
                </a>
                <a
                  className={cx(styles.button, styles.buttonSecondary)}
                  href="#capabilities"
                >
                  <span>{copy.hero.viewRoadmap}</span>
                </a>
              </div>
            </div>

            <GuidedFormatDemo />
          </div>
        </section>

        <section aria-label={copy.trust.ariaLabel} className={styles.trustRail}>
          <div className={cx(styles.container, styles.trustGrid)}>
            {trustItems.map(({ icon: Icon, title }) => (
              <div className={styles.trustItem} key={title}>
                <Icon {...iconProps} />
                <strong>{title}</strong>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="how-it-works-title"
          className={styles.section}
          id="how-it-works"
        >
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <h2 id="how-it-works-title">{copy.howItWorks.title}</h2>
              <p>{copy.howItWorks.body}</p>
            </div>

            <div className={styles.stepsGrid}>
              <article className={cx(styles.step, styles.stepPrimary)}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>01</span>
                  <StatusBadge
                    labels={copy.capabilities.statuses}
                    status="available"
                  />
                </div>
                <h3>{copy.howItWorks.steps.write.title}</h3>
                <p>{copy.howItWorks.steps.write.description}</p>
                <StepVisual copy={copy.howItWorks.steps} variant="write" />
              </article>

              <article className={styles.step}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>02</span>
                  <StatusBadge
                    labels={copy.capabilities.statuses}
                    status="inProgress"
                  />
                </div>
                <h3>{copy.howItWorks.steps.understand.title}</h3>
                <p>{copy.howItWorks.steps.understand.description}</p>
                <StepVisual copy={copy.howItWorks.steps} variant="understand" />
              </article>

              <article className={styles.step}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>03</span>
                  <StatusBadge
                    labels={copy.capabilities.statuses}
                    status="planned"
                  />
                </div>
                <h3>{copy.howItWorks.steps.explore.title}</h3>
                <p>{copy.howItWorks.steps.explore.description}</p>
                <StepVisual copy={copy.howItWorks.steps} variant="explore" />
              </article>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="capabilities-title"
          className={cx(styles.section, styles.capabilitiesSection)}
          id="capabilities"
        >
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <h2 id="capabilities-title">{copy.capabilities.title}</h2>
              <p>{copy.capabilities.body}</p>
            </div>

            <div className={styles.capabilityGroups}>
              {capabilityGroups.map((group) => (
                <section className={styles.capabilityGroup} key={group.title}>
                  <div className={styles.capabilityGroupHeader}>
                    <h3>{group.title}</h3>
                    <StatusBadge
                      labels={copy.capabilities.statuses}
                      status={group.status}
                    />
                  </div>
                  <div className={styles.capabilityList}>
                    {group.items.map(({ icon: Icon, title, description }) => (
                      <article className={styles.capabilityItem} key={title}>
                        <span className={styles.capabilityIcon}>
                          <Icon {...iconProps} />
                        </span>
                        <span className={styles.capabilityCopy}>
                          <strong>{title}</strong>
                          <span>{description}</span>
                        </span>
                        <StatusBadge
                          labels={copy.capabilities.statuses}
                          status={group.status}
                        />
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="open-source-title"
          className={styles.section}
          id="open-source"
        >
          <div className={cx(styles.container, styles.openSourceGrid)}>
            <div className={styles.openSourceCopy}>
              <h2 id="open-source-title">{copy.openSource.title}</h2>
              <p>{copy.openSource.body}</p>
              <div className={styles.sourceActions}>
                <a
                  className={cx(styles.button, styles.buttonPrimary)}
                  href={repositoryUrl}
                >
                  <GitBranch {...iconProps} />
                  <span>{copy.openSource.viewSource}</span>
                </a>
                <a
                  className={cx(styles.button, styles.buttonSecondary)}
                  href={contributingUrl}
                >
                  <span>{copy.openSource.readContributing}</span>
                  <ArrowUpRight {...iconProps} />
                </a>
              </div>
            </div>

            <aside
              aria-label={copy.openSource.repositoryStatus}
              className={styles.repoPanel}
            >
              <div className={styles.repoPanelHeader}>
                <span className={styles.repoPanelDot} />
                <span>{copy.openSource.repositoryLabel}</span>
              </div>
              <h3>SQLuminate</h3>
              <p>{copy.openSource.license}</p>
              <dl className={styles.repoFacts}>
                <div>
                  <dt>{copy.openSource.facts.nextMilestone}</dt>
                  <dd>{copy.openSource.facts.parserBoundary}</dd>
                </div>
                <div>
                  <dt>{copy.openSource.facts.currentDialect}</dt>
                  <dd>{copy.openSource.facts.multiDialect}</dd>
                </div>
                <div>
                  <dt>{copy.openSource.facts.queryHandling}</dt>
                  <dd>{copy.openSource.facts.localByDefault}</dd>
                </div>
              </dl>
            </aside>
          </div>

          <div className={cx(styles.container, styles.disclaimerGrid)}>
            <div id="privacy">
              <span className={styles.disclaimerLabel}>
                {copy.openSource.privacy.label}
              </span>
              <p>{copy.openSource.privacy.text}</p>
            </div>
            <div id="limitations">
              <span className={styles.disclaimerLabel}>
                {copy.openSource.limitations.label}
              </span>
              <p>{copy.openSource.limitations.text}</p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="final-cta-title"
          className={styles.ctaSection}
        >
          <div className={cx(styles.container, styles.ctaPanel)}>
            <div>
              <h2 id="final-cta-title">{copy.cta.title}</h2>
              <p>{copy.cta.body}</p>
            </div>
            <div className={styles.ctaSignal} aria-hidden="true">
              <span>{copy.cta.signalProduct}</span>
              <strong>{copy.cta.signalStatus}</strong>
              <i />
              <i />
              <i />
            </div>
            <div className={styles.ctaActions}>
              <a
                className={cx(styles.button, styles.buttonPrimary)}
                href="/workspace"
              >
                <span>{copy.cta.openWorkspace}</span>
                <ArrowUpRight {...iconProps} />
              </a>
              <a
                className={cx(styles.button, styles.buttonSecondary)}
                href={repositoryUrl}
              >
                <span>{copy.cta.viewGithub}</span>
                <GitBranch {...iconProps} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={cx(styles.container, styles.footerInner)}>
          <div className={styles.footerBrand}>
            <Brand compact descriptor={copy.header.compactBrandDescriptor} />
            <p>{copy.footer.tagline}</p>
          </div>
          <nav aria-label={copy.footer.navigation} className={styles.footerNav}>
            <a href={`${repositoryUrl}#readme`}>{copy.footer.docs}</a>
            <a href="#privacy">{copy.footer.privacy}</a>
            <a href="#limitations">{copy.footer.limitations}</a>
            <a href={contributingUrl}>{copy.footer.contributing}</a>
            <a href={repositoryUrl}>{copy.footer.github}</a>
            <a href={licenseUrl}>{copy.footer.mitLicense}</a>
          </nav>
          <p className={styles.footerNote}>{copy.footer.note}</p>
        </div>
      </footer>
    </div>
  );
}
