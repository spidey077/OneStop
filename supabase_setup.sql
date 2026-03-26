-- Run this in your Supabase SQL Editor to create the necessary tables
-- for your app's Cart and Orders features.

-- Create a table for Cart Items
create table if not exists public.carts (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  product_name text not null,
  product_price numeric not null,
  product_image text,
  quantity integer default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) but for development we'll add policies to allow all
-- If you configure Clerk proper JWT integration, we'll restrict it, but for now allow public operations
alter table public.carts enable row level security;
create policy "Enable all for carts" on public.carts for all using (true) with check (true);

-- Create a table for Orders
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  total_amount numeric not null,
  status text default 'pending',
  items jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Orders and allow development access
alter table public.orders enable row level security;
create policy "Enable all for orders" on public.orders for all using (true) with check (true);
