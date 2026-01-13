import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

export async function generateReviewToken(clientData) {
  const token = crypto.randomBytes(32).toString('hex');

  const { data, error } = await supabase
    .from('review_tokens')
    .insert({
      token,
      client_name: clientData.name,
      client_email: clientData.email,
      client_phone: clientData.phone,
      project_id: clientData.projectId,
      project_type: clientData.projectType,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      used: false
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function validateReviewToken(token) {
  const { data, error } = await supabase
    .from('review_tokens')
    .select('*')
    .eq('token', token)
    .eq('used', false)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !data) {
    throw new Error('Invalid or expired review token');
  }

  return data;
}

export async function markTokenUsed(token) {
  const { error } = await supabase
    .from('review_tokens')
    .update({
      used: true,
      used_at: new Date().toISOString()
    })
    .eq('token', token);

  if (error) throw error;
}