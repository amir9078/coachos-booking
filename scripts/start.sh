#!/bin/sh
set -x

# Replace the statically built BUILT_NEXT_PUBLIC_WEBAPP_URL with run-time NEXT_PUBLIC_WEBAPP_URL
# NOTE: if these values are the same, this will be skipped.
scripts/replace-placeholder.sh "$BUILT_NEXT_PUBLIC_WEBAPP_URL" "$NEXT_PUBLIC_WEBAPP_URL"

set +x
DB_HOSTPORT=$(printf '%s' "$DATABASE_URL" | sed -E 's#^[a-zA-Z]+://[^@]*@([^/]+)/.*#\1#')
set -x
scripts/wait-for-it.sh "$DB_HOSTPORT" -- echo "database is up"
npx prisma migrate deploy --schema /app/packages/prisma/schema.prisma
npx ts-node --transpile-only /app/scripts/seed-app-store.ts
yarn start
