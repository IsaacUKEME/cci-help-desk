-- Create prayer_requests table
CREATE TABLE public.prayer_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  request TEXT NOT NULL,
  is_urgent BOOLEAN NOT NULL DEFAULT false,
  category TEXT NOT NULL DEFAULT 'General',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'praying', 'answered')),
  pastoral_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can SUBMIT a prayer request
CREATE POLICY "Anyone can submit a prayer request"
  ON public.prayer_requests
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users (pastoral team) can VIEW all prayer requests
CREATE POLICY "Authenticated users can view prayer requests"
  ON public.prayer_requests
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Only authenticated users (pastoral team) can UPDATE status / add notes
CREATE POLICY "Authenticated users can update prayer requests"
  ON public.prayer_requests
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_prayer_requests_updated_at
  BEFORE UPDATE ON public.prayer_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
