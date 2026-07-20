# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **documentation repository** for setting up and managing a **gaming accessories e-commerce store** using WordPress and WooCommerce. It is not a software development project, but rather a structured collection of setup guides, configuration documentation, and operational procedures for store management.

**Store Context**: This is a teen-managed gaming accessories store with parental oversight. The documentation is written to be accessible to both beginners and those with technical experience.

## Repository Structure

```
docs/
├── hosting-domain-plan.md           # Hosting provider recommendations and domain strategy
├── wordpress-installation-guide.md  # Step-by-step WordPress installation methods
├── woocommerce-setup-guide.md      # WooCommerce configuration and store setup
├── theme-installation-guide.md     # Storefront theme installation and customization
├── essential-plugins-guide.md      # Essential WordPress/WooCommerce plugins
└── essential-pages-guide.md        # Required store pages (About, Contact, FAQ, etc.)

.worktrees/
└── task-X-description/              # Git worktree directories for task-specific work
```

## Branching Strategy

The repository uses a **task-based branching model**:

- **master**: Main documentation branch with completed, released documentation
- **task-X-description**: Feature/task branches for specific setup phases
  - Each branch corresponds to a major setup step in the store creation process
  - Examples: `task-1-hosting-plan`, `task-4-storefront-theme`, `task-6-essential-pages`

**Workflow**: Work is done on task branches, then merged to master once documentation is finalized and reviewed. Use git worktrees (`git worktree add`) for parallel work on multiple tasks.

## How to Update Documentation

1. **Edit markdown files** in the `docs/` directory directly or on a task branch
2. **Use clear, accessible language** since readers range from beginners to experienced developers
3. **Include step-by-step instructions** with screenshots/examples where helpful
4. **Keep store context in mind**: Target audience includes a teen manager with parental guidance
5. **Update dates** in documentation when significant revisions are made
6. **Link between guides** when one guide references setup from another

## Common Tasks

### Adding new documentation
1. Create a new branch: `git switch -c task-X-description`
2. Create a new markdown file in `docs/`
3. Write content following the style of existing guides
4. Commit and push to the branch
5. Merge to master when complete

### Updating existing guides
1. Edit the relevant markdown file in `docs/`
2. Commit with a message describing what changed (e.g., "Update WordPress installation steps for PHP 8.1+")
3. Push to master or the relevant task branch

### Managing task branches
```bash
# List all branches
git branch -a

# Checkout a task branch
git switch task-4-storefront-theme

# Create a worktree for isolated work
git worktree add .worktrees/task-name task-branch-name

# Clean up worktree
git worktree remove .worktrees/task-name
```

## Documentation Standards

- **Headings**: Use H1 for document titles, H2 for major sections, H3 for subsections
- **Lists**: Use bullet points for unordered lists, numbered lists for step-by-step instructions
- **Code/Config**: Use markdown code blocks with language hints (```php, ```bash, etc.)
- **Emphasis**: Use **bold** for important terms, `monospace` for technical terms/paths/commands
- **Audience**: Write for non-technical readers; explain jargon or provide context
- **Date stamps**: Include plan/creation dates using format: `*Plan created: YYYY-MM-DD*`

## Key Guides Reference

**For setup phase questions**, start with:
- **Hosting**: `docs/hosting-domain-plan.md` - Choosing a host and domain
- **Installation**: `docs/wordpress-installation-guide.md` - Getting WordPress running
- **Store Setup**: `docs/woocommerce-setup-guide.md` - Configuring WooCommerce
- **Appearance**: `docs/theme-installation-guide.md` - Installing and configuring Storefront theme
- **Plugins**: `docs/essential-plugins-guide.md` - Essential WordPress/WooCommerce plugins
- **Content**: `docs/essential-pages-guide.md` - Required store pages and content

## GitHub Connection

- **Remote**: https://github.com/fadydoc2000/mitochondrial-metabolic-reprogramming.git
- **Main branch**: master (documentation branch)
- **Workflow**: All branches are pushed to GitHub for backup and collaboration

## Notes

- This is a **documentation-only** repository; it contains no code to build or test
- No build tools, linters, or test runners are needed
- All communication should be clear and tailored to the store's target audience
- When in doubt about store setup details, refer to official WordPress/WooCommerce documentation
