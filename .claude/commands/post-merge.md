---
description: Clean up after a PR is merged and point to the next spec
allowed-tools: Read, Edit, Bash(git:*)
---

1. `BRANCH=$(git branch --show-current)`. Stop if it is `main` and ask which branch was merged.
2. `git fetch origin --prune`.
3. Verify the merge: `git merge-base --is-ancestor $BRANCH origin/main`. If it fails, stop:
   "This branch is not in main yet. Merge the PR first."
4. `git switch main` and `git pull --ff-only`.
5. Delete the local branch with `git branch -d $BRANCH` (this command is the one case where Claude
   deletes a branch). Ask me before deleting the remote branch.
6. Set the spec's Status to `done` (in the spec and in the table in `docs/specs/README.md`) if it is not
   already, and tell me if that left an uncommitted change.
7. Summary: merged branch, what was deleted, and the next `todo` spec from `docs/specs/README.md` with
   the command to start it (`/create-spec NN name`).
