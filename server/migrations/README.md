# Database Migrations

## How to run migrations

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the SQL from each migration file
4. Execute the SQL

## Migration files (in order):

1. `create_notifications_table.sql` - Creates notifications table
2. `add_user_id_to_posts.sql` - Adds user_id to posts table
3. `create_messages_table.sql` - Creates messages table with encryption support

## Notes

- Make sure to run migrations in order
- Check if tables already exist before running
- RLS (Row Level Security) is enabled for security
