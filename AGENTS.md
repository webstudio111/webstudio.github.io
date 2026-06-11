# AGENTS.md

Guidance for AI agents working in this repository.

## Repository status

This repository (`kinda-random-ahh`) is currently a **placeholder**: it contains only `README.md` with a title. There is no application source code, dependency manifests (`package.json`, `requirements.txt`, etc.), Docker configuration, CI workflows, or test suites.

## Cursor Cloud specific instructions

### Services

No services must be started. There is no runnable application, API, or frontend in this repo yet.

### Lint / test / build / run

None of these commands exist until application code and tooling are added. Do not assume a particular stack.

When manifests are added, use the lockfile-appropriate package manager (for example `package-lock.json` → `npm ci`, `pnpm-lock.yaml` → `pnpm install`, `requirements.txt` → `pip install -r requirements.txt`) and follow any new `README.md` or `CONTRIBUTING.md` instructions.

### VM update script behavior

The startup update script conditionally installs dependencies only when known manifest files exist. On the current `main` branch it is effectively a no-op.

### Git

The default branch is `main`. The repo has a single initial commit. Feature branches for agent work should use the `cursor/<descriptive-name>-7a90` naming pattern per Cloud Agent conventions.
