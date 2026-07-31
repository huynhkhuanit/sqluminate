import { SqlNodeField } from "@/features/landing/components/sql-node-field";
import { ThreeSceneCard } from "@/features/landing/components/three-scene-card";

const repositoryUrl = "https://github.com/huynhkhuanit/sqluminate";

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`landing-brand ${compact ? "is-compact" : ""}`}>
      <span aria-hidden="true" className="landing-brand-mark">
        SQL
      </span>
      <span className="landing-brand-copy">
        <strong>SQLuminate</strong>
        <span>{compact ? "Visual SQL Explorer" : "VISUAL SQL EXPLORER"}</span>
      </span>
    </span>
  );
}

function WriteSqlVisual() {
  return (
    <div aria-hidden="true" className="write-sql-visual">
      <code>
        <span>SELECT</span> customers.name,
      </code>
      <code>
        <span>FROM</span> customers
      </code>
      <code>
        <span>JOIN</span> orders <i>|</i>
      </code>
    </div>
  );
}

function RelationVisual() {
  return (
    <div aria-hidden="true" className="relation-visual">
      <span className="relation-line relation-line-a" />
      <span className="relation-line relation-line-b" />
      <span className="relation-line relation-line-c" />
      <i className="relation-point relation-point-a" />
      <i className="relation-point relation-point-b" />
      <i className="relation-point relation-point-c" />
      <i className="relation-point relation-point-d" />
    </div>
  );
}

function FlowVisual() {
  return (
    <div aria-hidden="true" className="flow-visual">
      <span>FROM</span>
      <span className="is-active">JOIN</span>
      <span>WHERE</span>
      <span>GROUP BY</span>
    </div>
  );
}

const trustItems = [
  {
    label: "PRIVACY",
    title: "Local by default",
    body: "Query text is edited and saved in your browser.",
  },
  {
    label: "BOUNDARY",
    title: "No database required",
    body: "The workspace formats SQL. It never executes your query.",
  },
  {
    label: "FOCUS",
    title: "No AI required",
    body: "Formatting, examples, and editing work without a provider.",
  },
  {
    label: "LICENSE",
    title: "MIT and open source",
    body: "A small, reviewable tool for learners and contributors.",
  },
] as const;

export function LandingPage() {
  return (
    <main className="landing-shell">
      <header className="landing-header">
        <div className="landing-header-inner">
          <a aria-label="SQLuminate home" href="#top">
            <Brand />
          </a>

          <span aria-hidden="true" className="landing-header-rule" />
          <nav aria-label="Primary navigation" className="landing-nav">
            <a href="#how-it-works">How it works</a>
            <a href="#features">Features</a>
            <a href="#open-source">Open source</a>
          </nav>
          <span aria-hidden="true" className="landing-header-rule" />

          <div className="landing-header-actions">
            <a className="landing-github-link" href={repositoryUrl}>
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a
              className="landing-button landing-button-primary"
              href="/workspace"
            >
              Open workspace
            </a>
          </div>

          <details className="landing-mobile-menu">
            <summary>MENU</summary>
            <nav aria-label="Mobile navigation">
              <a href="#how-it-works">How it works</a>
              <a href="#features">Features</a>
              <a href="#open-source">Open source</a>
              <a href={repositoryUrl}>GitHub</a>
            </nav>
          </details>
        </div>
      </header>

      <section aria-labelledby="hero-title" className="landing-hero" id="top">
        <div className="landing-container landing-hero-grid">
          <div className="landing-hero-copy">
            <p className="landing-eyebrow">THREE.JS VISUAL LAYER</p>
            <h1 aria-label="See the query behind the query." id="hero-title">
              See the query
              <br />
              behind the query.
            </h1>
            <p className="landing-hero-body">
              Turn SQL into a clear visual map of sources, joins, and logical
              steps, right in your browser.
            </p>
            <div className="landing-hero-actions">
              <a
                className="landing-button landing-button-primary"
                href="/workspace"
              >
                Open workspace
              </a>
              <a
                className="landing-button landing-button-secondary"
                href="#how-it-works"
              >
                See how it works
              </a>
            </div>
          </div>

          <SqlNodeField />
        </div>
      </section>

      <section aria-label="Product principles" className="principles-strip">
        <div className="landing-container principles-grid">
          <div className="principles-intro">
            <h2>Clarity is a feature.</h2>
            <span>
              A visual layer for learning, reviewing, and teaching SQL.
            </span>
          </div>
          <div className="principle-stat">
            <strong>100%</strong>
            <span>Processed in your browser by default</span>
          </div>
          <div className="principle-stat">
            <strong>01</strong>
            <span>Educational flow, never a physical plan</span>
          </div>
          <div className="principle-stat">
            <strong>MIT</strong>
            <span>Open source for learners and teachers</span>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="how-it-works-title"
        className="landing-section how-it-works-section"
        id="how-it-works"
      >
        <div className="landing-container">
          <div className="landing-section-heading">
            <p className="landing-eyebrow landing-eyebrow-plain">
              HOW IT WORKS
            </p>
            <h2 id="how-it-works-title">From raw SQL to a map you can read.</h2>
            <p>
              A calm, inspectable workflow that keeps the query in view while
              its structure becomes visible.
            </p>
          </div>

          <div className="journey-grid">
            <article className="journey-card journey-card-main">
              <span className="journey-index">WRITE</span>
              <h3>Start with working SQL.</h3>
              <p>
                Keep your query local, readable, and ready to format as you
                explore it.
              </p>
              <WriteSqlVisual />
            </article>

            <article className="journey-card">
              <span className="journey-index">MAP</span>
              <div>
                <h3>See the relationships.</h3>
                <p>Trace sources and joins as a connected system.</p>
              </div>
              <RelationVisual />
            </article>

            <article className="journey-card">
              <span className="journey-index">LEARN</span>
              <div>
                <h3>Follow the logic.</h3>
                <p>Read a simplified clause sequence without false claims.</p>
              </div>
              <FlowVisual />
            </article>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="features-title"
        className="landing-section features-section"
        id="features"
      >
        <div className="landing-container">
          <div className="landing-section-heading">
            <h2 id="features-title">Every clause gets a place.</h2>
            <p>
              Three focused views keep the question in your head: relationships,
              sequence, and structure.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card feature-card-graph">
              <div className="feature-card-copy">
                <span className="feature-label">JOIN GRAPH</span>
                <h3>Map the relationships.</h3>
                <p>
                  Turn sources and JOIN predicates into readable nodes and
                  edges.
                </p>
              </div>
              <ThreeSceneCard
                label="Interactive 3D JOIN relationship model"
                variant="relationships"
              />
            </article>

            <article className="feature-card feature-card-flow">
              <div className="feature-card-copy">
                <span className="feature-label">LOGICAL FLOW</span>
                <h3>Learn the sequence.</h3>
                <p>
                  Follow a pedagogical order that stays clearly separate from a
                  physical plan.
                </p>
              </div>
              <ThreeSceneCard
                label="Interactive 3D logical query flow"
                variant="flow"
              />
            </article>

            <article className="feature-card feature-card-structure">
              <div className="feature-card-copy">
                <span className="feature-label">QUERY STRUCTURE</span>
                <h3>Keep clauses visible.</h3>
                <p>
                  Inspect projections, filters, grouping, sorting, and limits
                  without losing the whole query.
                </p>
              </div>
              <ThreeSceneCard
                label="Interactive 3D query structure layers"
                variant="structure"
              />
            </article>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="trust-title"
        className="landing-section trust-section"
        id="open-source"
      >
        <div className="landing-container trust-panel">
          <div className="trust-copy">
            <h2 id="trust-title">Your query stays yours.</h2>
            <span>
              SQLuminate earns trust with deterministic, local-first features
              before anything optional is added.
            </span>
          </div>

          <div className="trust-grid">
            {trustItems.map((item) => (
              <article key={item.title}>
                <span className="trust-label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="final-cta-title" className="final-cta-section">
        <div className="landing-container final-cta-panel">
          <div className="final-cta-copy">
            <h2 id="final-cta-title">Make your next query click.</h2>
            <span>
              Open the local workspace, load the example, and see SQL from the
              query outward.
            </span>
          </div>
          <ThreeSceneCard
            label="Interactive 3D SQLuminate beacon"
            variant="beacon"
          />
          <div className="final-cta-actions">
            <a
              className="landing-button landing-button-primary"
              href="/workspace"
            >
              Open workspace
            </a>
            <a
              className="landing-button landing-button-secondary"
              href={repositoryUrl}
            >
              View source
            </a>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-container landing-footer-inner">
          <Brand compact />
          <nav aria-label="Footer navigation">
            <a href={`${repositoryUrl}#readme`}>Docs</a>
            <a href="/workspace">Example</a>
            <a href={repositoryUrl}>
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a href={`${repositoryUrl}/blob/main/LICENSE`}>MIT License</a>
          </nav>
          <p>
            <span>SQL processed locally</span>
            <span>No query logging</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
