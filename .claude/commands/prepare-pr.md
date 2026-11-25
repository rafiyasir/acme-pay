---
description: Prepare a copyable PR title and body for the current branch
allowed-tools: Read, Bash(git log:*), Bash(git diff:*), Bash(git status:*), Bash(git branch:*), Bash(git remote:*)
---

1. `git branch --show-current`. Stop if on `main`. The base is `main`.
2. Read the commits (`git log main..HEAD --oneline`), the diff summary (`git diff --stat main...HEAD`)
   and the spec this branch implements. Stop if the working tree has uncommitted changes.
3. Output, each in its own code block so I can copy it:
   - **Title:** Conventional Commit style, e.g. `feat(api): list employees with filters and pagination (spec 04)`
   - **Body:**
     ```
     ## What
     ## Why (link to docs/specs/NN-...)
     ## How it was tested (unit, integration, manual steps)
     ## Notes (trade-offs, follow-ups, how AI helped or where it was corrected)
     ```
   - **Compare link** (printed here for me to click; not part of the body): built from
     `git remote get-url origin` as `https://github.com/<owner>/<repo>/compare/main...<branch>?expand=1`.
4. No links of any kind in the title or body.
5. Remind me: push the branch, create the PR into `main`, merge with a **merge commit** (never squash),
   then run `/post-merge`.

Do not push and do not create the PR.
