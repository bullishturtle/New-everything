-- Users and Authentication
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(50) NOT NULL DEFAULT 'customer', -- admin, sales, field_worker, customer
  company_id INTEGER,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Companies/Organizations
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Leads/Prospects
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  source VARCHAR(100), -- website, referral, cold_call, etc.
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, proposal_sent, won, lost
  assigned_to INTEGER REFERENCES users(id),
  notes TEXT,
  estimated_value DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Customers (converted leads)
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  customer_since DATE DEFAULT CURRENT_DATE,
  total_jobs INTEGER DEFAULT 0,
  total_revenue DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Jobs/Projects
CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  job_number VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  property_address TEXT,
  job_type VARCHAR(100), -- roof_repair, roof_replacement, inspection, etc.
  status VARCHAR(50) DEFAULT 'pending', -- pending, scheduled, in_progress, completed, cancelled
  priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
  assigned_to INTEGER REFERENCES users(id),
  estimated_start_date DATE,
  estimated_completion_date DATE,
  actual_start_date DATE,
  actual_completion_date DATE,
  estimated_cost DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Estimates/Proposals
CREATE TABLE IF NOT EXISTS estimates (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id),
  estimate_number VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  subtotal DECIMAL(10,2) NOT NULL,
  tax_rate DECIMAL(5,4) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft', -- draft, sent, approved, rejected, expired
  valid_until DATE,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Estimate Line Items
CREATE TABLE IF NOT EXISTS estimate_items (
  id SERIAL PRIMARY KEY,
  estimate_id INTEGER REFERENCES estimates(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Appointments/Schedule
CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id),
  customer_id INTEGER REFERENCES customers(id),
  assigned_to INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, completed, cancelled, no_show
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Photo Documentation
CREATE TABLE IF NOT EXISTS job_photos (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id),
  uploaded_by INTEGER REFERENCES users(id),
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  caption TEXT,
  photo_type VARCHAR(50), -- before, during, after, damage, repair
  taken_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Communication/Notes
CREATE TABLE IF NOT EXISTS communications (
  id SERIAL PRIMARY KEY,
  related_type VARCHAR(50) NOT NULL, -- lead, customer, job
  related_id INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id),
  communication_type VARCHAR(50) NOT NULL, -- note, email, call, text, meeting
  subject VARCHAR(255),
  content TEXT,
  is_internal BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id),
  customer_id INTEGER REFERENCES customers(id),
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  tax_rate DECIMAL(5,4) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  amount_paid DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'draft', -- draft, sent, paid, overdue, cancelled
  due_date DATE,
  paid_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_customer_id ON jobs(customer_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_communications_related ON communications(related_type, related_id);
