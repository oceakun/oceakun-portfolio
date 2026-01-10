import React from 'react';
import type { Metadata } from 'next';
import BlogHeader from '../_components/BlogHeader';

export const metadata: Metadata = {
  title: 'Git Hooks: Automate Your Workflow',
  description:
    'Master Git hooks to automate your development workflow. Learn about client-side and server-side hooks, practical examples, and best practices for maintaining code quality.',
  openGraph: {
    title: 'Git Hooks: Automate Your Workflow',
    description:
      'Master Git hooks to automate your development workflow. Learn about client-side and server-side hooks, practical examples, and best practices for maintaining code quality.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Git Hooks: Automate Your Workflow',
    description:
      'Master Git hooks to automate your development workflow. Learn about client-side and server-side hooks, practical examples, and best practices for maintaining code quality.',
  },
};

export default function BlogPage() {
  return (
    <section>
      <BlogHeader title='Git Hooks: Automate Your Workflow' date='11-01-2026' />
      <div className='prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-300 mt-12 text-justify'>
        <div className='text-justify'>
          <h2 className='text-xl dark:text-neutral-200 font-serif'>Content</h2>
          <ul>
            <li>What Are Git Hooks?</li>
            <li>Types of Git Hooks</li>
            <li>Setting Up Your First Hook</li>
            <li>Client-Side Hooks Deep Dive</li>
            <li>Server-Side Hooks</li>
            <li>Practical Examples</li>
            <li>Managing Hooks with Husky</li>
            <li>Best Practices</li>
            <li>Bypassing Hooks (When and Why)</li>
            <li>Troubleshooting Common Issues</li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            What Are Git Hooks?
          </h2>
          <p>
            Git hooks are scripts that Git executes before or after events such
            as commit, push, and merge. They're a powerful way to automate
            tasks, enforce policies, and maintain code quality without manual
            intervention.
          </p>
          <p>
            Think of hooks as checkpoints in your Git workflow—they can validate
            commit messages, run tests, lint code, or even deploy applications
            automatically.
          </p>
          <p>
            <strong>Location:</strong> Hooks live in <code>.git/hooks/</code>{' '}
            directory of your repository. By default, Git provides sample hooks
            with a <code>.sample</code> extension—remove this extension to
            activate them.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Types of Git Hooks
          </h2>
          <p>Git provides two categories of hooks:</p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Client-Side Hooks
          </h3>
          <p>
            Run on your local machine during operations like committing and
            merging:
          </p>
          <ul>
            <li>
              <strong>pre-commit:</strong> Runs before commit is created (lint,
              format, test)
            </li>
            <li>
              <strong>prepare-commit-msg:</strong> Runs before commit message
              editor opens
            </li>
            <li>
              <strong>commit-msg:</strong> Validates commit message format
            </li>
            <li>
              <strong>post-commit:</strong> Runs after commit is created
              (notifications, logging)
            </li>
            <li>
              <strong>pre-rebase:</strong> Runs before rebasing
            </li>
            <li>
              <strong>post-checkout:</strong> Runs after checkout (install
              dependencies)
            </li>
            <li>
              <strong>post-merge:</strong> Runs after merge (database
              migrations)
            </li>
            <li>
              <strong>pre-push:</strong> Runs before push (run tests, block
              force push)
            </li>
          </ul>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Server-Side Hooks
          </h3>
          <p>Run on the Git server (GitHub, GitLab, etc.):</p>
          <ul>
            <li>
              <strong>pre-receive:</strong> Runs before refs are updated (CI
              checks)
            </li>
            <li>
              <strong>update:</strong> Runs once per branch being pushed
            </li>
            <li>
              <strong>post-receive:</strong> Runs after all refs are updated
              (deployments, notifications)
            </li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Setting Up Your First Hook
          </h2>
          <p>
            Let's create a simple pre-commit hook that runs ESLint before
            allowing commits.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Step 1: Create the Hook File
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`#!/bin/bash

# Navigate to repository root
cd "$(git rev-parse --show-toplevel)"

echo "Running ESLint..."

# Run ESLint on staged files
npx eslint $(git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(js|jsx|ts|tsx)$')

# Capture exit code
RESULT=$?

if [ $RESULT -ne 0 ]; then
  echo "❌ ESLint failed. Fix errors before committing."
  exit 1
fi

echo "✅ ESLint passed!"
exit 0`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Step 2: Make It Executable
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`chmod +x .git/hooks/pre-commit`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Step 3: Test It
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`# Make a change and try to commit
git add .
git commit -m "test commit"

# Hook runs automatically`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Client-Side Hooks Deep Dive
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            1. pre-commit: Code Quality Gate
          </h3>
          <p>
            The most commonly used hook. Perfect for enforcing code standards
            before commits enter history.
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`#!/bin/bash

echo "🔍 Running pre-commit checks..."

# Get staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

# 1. Run Prettier
echo "📝 Formatting code..."
npx prettier --write $STAGED_FILES
git add $STAGED_FILES

# 2. Run ESLint
echo "🔍 Linting code..."
npx eslint $STAGED_FILES --fix
if [ $? -ne 0 ]; then
  echo "❌ Linting failed"
  exit 1
fi

# 3. Run TypeScript type check
echo "🔷 Type checking..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ Type check failed"
  exit 1
fi

# 4. Run unit tests for affected files
echo "🧪 Running tests..."
npm test -- --findRelatedTests $STAGED_FILES --passWithNoTests
if [ $? -ne 0 ]; then
  echo "❌ Tests failed"
  exit 1
fi

echo "✅ All checks passed!"
exit 0`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            2. commit-msg: Enforce Commit Message Standards
          </h3>
          <p>
            Validate commit messages against Conventional Commits or custom
            formats.
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`#!/bin/bash

# Read commit message from file
COMMIT_MSG=$(cat "$1")

# Conventional Commits pattern: type(scope): description
PATTERN="^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\\(.+\\))?: .{1,100}"

if ! echo "$COMMIT_MSG" | grep -qE "$PATTERN"; then
  echo "❌ Invalid commit message format"
  echo ""
  echo "Format: <type>(optional scope): <description>"
  echo ""
  echo "Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert"
  echo ""
  echo "Examples:"
  echo "  feat(auth): add social login"
  echo "  fix: resolve memory leak in cache"
  echo "  docs: update API documentation"
  exit 1
fi

echo "✅ Commit message valid"
exit 0`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            3. pre-push: Final Safety Check
          </h3>
          <p>Run comprehensive tests before pushing to remote.</p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`#!/bin/bash

echo "🚀 Running pre-push checks..."

# 1. Prevent force push to main/master
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\\(.*\\),\\1,')

if [ "$current_branch" = "main" ] || [ "$current_branch" = "master" ]; then
  # Check if this is a force push
  while read local_ref local_sha remote_ref remote_sha; do
    if [ "$remote_sha" != "0000000000000000000000000000000000000000" ]; then
      # Check if we're behind remote
      commits_behind=$(git rev-list --count HEAD..$remote_sha)
      if [ "$commits_behind" -gt 0 ]; then
        echo "❌ Cannot force push to $current_branch"
        echo "Pull changes first: git pull origin $current_branch"
        exit 1
      fi
    fi
  done

  echo "⚠️  Pushing to $current_branch - use caution!"
  read -p "Continue? (y/N): " confirm
  if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "Push cancelled"
    exit 1
  fi
fi

# 2. Run full test suite
echo "🧪 Running full test suite..."
npm test
if [ $? -ne 0 ]; then
  echo "❌ Tests failed"
  exit 1
fi

# 3. Build check
echo "🏗️  Building project..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

echo "✅ All checks passed! Pushing..."
exit 0`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            4. post-merge: Automatic Dependency Updates
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`#!/bin/bash

echo "🔄 Post-merge hook running..."

# Check if package.json changed
if git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD | grep --quiet "package.json"; then
  echo "📦 package.json changed, installing dependencies..."
  npm install
fi

# Check if database migrations changed
if git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD | grep --quiet "migrations/"; then
  echo "🗄️  Migrations changed, running migrations..."
  npm run migrate
fi

echo "✅ Post-merge tasks complete"
exit 0`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Server-Side Hooks
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            post-receive: Automated Deployment
          </h3>
          <p>Deploy your application automatically when code is pushed.</p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`#!/bin/bash

# This runs on the server after receiving a push

while read oldrev newrev refname; do
  branch=$(git rev-parse --symbolic --abbrev-ref $refname)

  if [ "$branch" = "main" ]; then
    echo "Deploying to production..."

    # Navigate to deployment directory
    cd /var/www/myapp

    # Pull latest changes
    git fetch origin
    git reset --hard origin/main

    # Install dependencies
    npm ci --production

    # Build application
    npm run build

    # Restart application
    pm2 restart myapp

    echo "✅ Deployment complete"
  fi
done

exit 0`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Managing Hooks with Husky
          </h2>
          <p>
            Problem: <code>.git/hooks/</code> is not tracked by Git, making it
            hard to share hooks across teams. Solution: Husky.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Setup Husky
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`# Install Husky
npm install --save-dev husky

# Initialize Husky
npx husky init

# Create pre-commit hook
npx husky add .husky/pre-commit "npm test"

# Create commit-msg hook
npx husky add .husky/commit-msg "npx commitlint --edit $1"`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Husky + lint-staged: Only Lint Changed Files
          </h3>
          <p>Run linters only on staged files for faster commits.</p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`# Install dependencies
npm install --save-dev husky lint-staged

# package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  },
  "scripts": {
    "prepare": "husky install"
  }
}

# .husky/pre-commit
#!/bin/bash
npx lint-staged`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Husky + commitlint: Enforce Commit Messages
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`# Install commitlint
npm install --save-dev @commitlint/cli @commitlint/config-conventional

# Create commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'perf']
    ],
    'subject-max-length': [2, 'always', 100]
  }
};

# .husky/commit-msg
#!/bin/bash
npx commitlint --edit $1`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Best Practices
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            1. Keep Hooks Fast
          </h3>
          <p>
            Slow hooks disrupt developer flow. If checks take longer than 30
            seconds, move them to CI/CD.
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`# ❌ Bad - runs all tests (slow)
npm test

# ✅ Good - only tests related to changed files
npm test -- --findRelatedTests $STAGED_FILES --passWithNoTests

# ✅ Better - run full suite in CI, quick checks locally
npm run test:quick  # Unit tests only, no integration tests`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            2. Make Hooks Portable
          </h3>
          <p>Use package.json scripts instead of hard-coding tools.</p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`# ❌ Bad - assumes ESLint is installed globally
eslint src/

# ✅ Good - uses project's ESLint
npm run lint

# package.json
{
  "scripts": {
    "lint": "eslint src/",
    "test:quick": "jest --onlyChanged"
  }
}`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            3. Provide Clear Error Messages
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`# ❌ Bad
echo "Failed"
exit 1

# ✅ Good
echo "❌ ESLint found errors:"
echo "  → Run 'npm run lint:fix' to auto-fix"
echo "  → Or bypass with 'git commit --no-verify' (not recommended)"
exit 1`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            4. Version Control Your Hooks
          </h3>
          <p>
            Use Husky or commit hooks to <code>.githooks/</code> and configure
            Git:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`# Set custom hooks directory
git config core.hooksPath .githooks/

# Now .githooks/ is tracked by Git and shared with team`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Bypassing Hooks (When and Why)
          </h2>
          <p>Sometimes you need to bypass hooks. Use with caution.</p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Skip Hooks
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`# Skip pre-commit and commit-msg hooks
git commit --no-verify -m "emergency hotfix"

# Skip pre-push hook
git push --no-verify`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            When to Bypass
          </h3>
          <ul>
            <li>
              <strong>Emergency hotfixes:</strong> Production is down, need to
              push immediately
            </li>
            <li>
              <strong>Work in progress:</strong> Committing incomplete work to
              switch branches
            </li>
            <li>
              <strong>Hook failures unrelated to changes:</strong> Flaky tests
              or external API issues
            </li>
          </ul>
          <p>
            <strong>Important:</strong> Never bypass hooks on main/master
            branches in production.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Troubleshooting Common Issues
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Hook Not Running
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`# Check if hook is executable
ls -la .git/hooks/pre-commit

# Make it executable
chmod +x .git/hooks/pre-commit

# Check for typos in hook name
# Must be exactly: pre-commit (no extension)`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Hook Fails with "Command Not Found"
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`# Problem: Hook can't find npm/node
# Solution: Add explicit PATH

#!/bin/bash

# Add node to PATH
export PATH="/usr/local/bin:$PATH"

# Or use absolute paths
/usr/local/bin/node /usr/local/bin/npm test`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Hook Works Locally but Not for Team
          </h3>
          <p>Use Husky or set custom hooks directory:</p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`# Add to package.json postinstall script
{
  "scripts": {
    "postinstall": "git config core.hooksPath .githooks"
  }
}`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Real-World Example: Complete Setup
          </h2>
          <p>
            Here's a production-ready hooks setup for a React + TypeScript
            project:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`# Install tools
npm install --save-dev husky lint-staged @commitlint/cli @commitlint/config-conventional

# package.json
{
  "scripts": {
    "prepare": "husky install",
    "lint": "eslint src/ --ext .ts,.tsx",
    "lint:fix": "eslint src/ --ext .ts,.tsx --fix",
    "format": "prettier --write src/",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:quick": "jest --onlyChanged --passWithNoTests"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "jest --findRelatedTests --passWithNoTests"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}

# commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional']
};

# .husky/pre-commit
#!/bin/bash
npx lint-staged

# .husky/commit-msg
#!/bin/bash
npx commitlint --edit $1

# .husky/pre-push
#!/bin/bash
echo "🧪 Running tests..."
npm run test:quick

echo "🔷 Type checking..."
npm run type-check`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Conclusion
          </h2>
          <p>
            Git hooks are essential for maintaining code quality and automating
            repetitive tasks. Start with simple hooks like pre-commit linting,
            then gradually add more sophisticated checks as your project grows.
          </p>
          <p>
            <strong>Key takeaways:</strong>
          </p>
          <ul>
            <li>Use pre-commit for linting and formatting</li>
            <li>Use commit-msg to enforce commit message standards</li>
            <li>Use pre-push for running tests before pushing</li>
            <li>Manage hooks with Husky for team consistency</li>
            <li>Keep hooks fast—move slow checks to CI/CD</li>
            <li>Provide clear error messages with actionable guidance</li>
          </ul>
          <p>
            With properly configured hooks, you'll catch bugs earlier, maintain
            consistent code style, and spend less time in code review. The
            initial setup pays dividends throughout the project lifecycle.
          </p>
        </div>
      </div>
    </section>
  );
}
