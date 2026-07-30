# Contributing to SQLuminate

Thank you for contributing to SQLuminate. This guide describes the branch, commit, review, and merge workflow for the project.

## Branch model

```text
main                         Stable, releasable code
develop                      Shared integration branch
review/milestone-*            Release-candidate review branch
feat/*, fix/*, docs/*, ...    Short-lived work branches
```

- `main` must stay stable and buildable. Do not push directly to it. Changes enter through a pull request (PR).
- `develop` is the default target for feature, bug-fix, and documentation PRs.
- `review/milestone-*` is used to verify a completed milestone before it is merged into `main`. Do not develop features directly on this branch.
- Work branches should solve one focused problem and should be deleted after they are merged.

For urgent production fixes, create `hotfix/*` from `main`. After review, merge the fix into both `main` and `develop`.

## Branch naming

Use a category and a short kebab-case description:

```text
feat/landing-page
feat/parser-boundary
fix/mobile-editor-height
docs/contributing-workflow
chore/update-dependencies
refactor/isolate-parser-adapter
test/add-cte-fixtures
hotfix/security-header
```

Do not use an incomplete name such as `feat/`; the branch name should make its purpose clear.

## Start a new branch

Always start normal work from the latest `develop` branch:

```bash
git switch develop
git pull --ff-only origin develop
git switch -c feat/landing-page
```

If the branch already exists locally and remotely:

```bash
git switch feat/landing-page
git pull --ff-only origin feat/landing-page
```

Do not start normal feature work from `main` or from a review branch.

## Commit changes

Keep commits small, focused, and easy to review. Use Conventional Commits:

```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "feat: add landing page shell"
```

Common prefixes are `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, and `build`.

Do not commit secrets, local environment files, build output, editor state, or user SQL content.

## Push the branch

Push a new branch with its upstream tracking configuration:

```bash
git push -u origin feat/landing-page
```

Later updates only require:

```bash
git push
```

## Open a pull request

Open the PR from the work branch into `develop`:

```text
feat/landing-page -> develop
```

The PR description should include:

- What changed and why.
- The related issue or milestone, when available.
- Tests and quality checks that were run.
- Screenshots or a short recording for UI changes.
- Known limitations or follow-up work.

Before requesting review, run the relevant checks:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Run `pnpm test:e2e` when the change affects a user flow. Install the Playwright browser first if necessary:

```bash
pnpm exec playwright install chromium
```

## Review and update loop

At least one other contributor should review the PR. Address feedback on the same work branch, then push the new commits:

```bash
git add .
git commit -m "style: refine landing page responsive layout"
git push
```

Do not force-push a branch that another contributor is using. If `develop` has moved, update the branch with a merge:

```bash
git fetch origin
git switch feat/landing-page
git merge origin/develop
```

Resolve conflicts, run the checks again, commit the resolution, and push.

## Merge into `develop`

Merge only after:

- Review feedback is resolved.
- Required checks pass.
- The change stays within the PR scope.
- Documentation and tests are updated when applicable.

Use **Squash and merge** for focused work so `develop` keeps a readable history. Delete the remote work branch after merging.

```bash
git push origin --delete feat/landing-page
git branch -d feat/landing-page
```

If GitHub is configured to delete branches automatically, the remote deletion is handled by GitHub.

## Promote a milestone to `main`

When the milestone is complete, update the review branch from `develop`:

```bash
git switch review/milestone-0-1
git pull --ff-only origin review/milestone-0-1
git merge --ff-only origin/develop
git push origin review/milestone-0-1
```

Run the full verification suite on the review branch. Then open a PR:

```text
review/milestone-0-1 -> main
```

After approval and a successful build, merge the PR into `main`. The review branch can then be reused for the next milestone or replaced with a new `review/milestone-*` branch.

## Recommended GitHub protection rules

For `main`:

- Require pull requests.
- Require at least one approval from another contributor.
- Require lint, type-check, test, and build checks.
- Disable force-pushes and branch deletion.

For `develop`, require a pull request and passing checks. Direct pushes should be reserved for repository maintenance by agreement between the maintainers.

## Important terminology

- `git pull` downloads and integrates changes into a local branch.
- A **pull request** asks contributors to review and merge changes from one branch into another.

For SQLuminate, normal changes follow this path:

```text
work branch -> develop -> review/milestone-* -> main
```
