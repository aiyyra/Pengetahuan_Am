#!/bin/sh
# Exit immediately if a command exits with a non-zero status.
set -e

# Wait for the database to be ready
echo "Waiting for database..."
# The 'db' name must match your postgres service name in docker-compose.yml
while ! nc -z db 5432; do
  sleep 1
done
echo "Database is up!"

# Run database migrations
echo "Running database migrations..."

# Apply SQL migrations directly
echo "Applying SQL migrations..."
PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U $POSTGRES_USER -d $POSTGRES_DB -f drizzle/0000_worthless_blizzard.sql || echo "Migration may have already been applied"

echo "Migrations finished!"

# Execute the main command (passed to the script)
exec "$@"