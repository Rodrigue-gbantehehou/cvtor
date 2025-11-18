import { supabase } from '../supabaseClient';

export interface DashboardStats {
  totalUsers: number;
  totalResumes: number;
  totalTemplates: number;
  totalExports: number;
  exportsByType: { pdf: number; docx: number };
  recentExports: Array<{
    id: string;
    status: string;
    format: string;
    created_at: string;
    resume: { title: string } | null;
  }>;
  recentUsers: Array<{
    id: string;
    email: string;
    created_at: string;
    profile: { full_name: string } | null;
  }>;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  // Récupérer les statistiques de base
  const [
    { count: usersCount },
    { count: resumesCount },
    { count: templatesCount },
    { count: exportsCount },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('resumes').select('*', { count: 'exact', head: true }),
    supabase.from('templates').select('*', { count: 'exact', head: true }),
    supabase.from('exports').select('*', { count: 'exact', head: true }),
  ]);

  // Récupérer les exports par type
  const { data: exportsData } = await supabase
    .from('exports')
    .select('format');
  
  const exportsByType = exportsData?.reduce((acc: Record<string, number>, item: { format: string }) => {
    acc[item.format] = (acc[item.format] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Récupérer les derniers exports
  const { data: recentExports } = await supabase
    .from('exports')
    .select('id, status, format, created_at, resumes!inner(title)')
    .order('created_at', { ascending: false })
    .limit(5);

  // Récupérer les derniers utilisateurs
  const { data: recentUsers } = await supabase
    .from('profiles')
    .select('user_id, full_name, created_at, auth:users!inner(email)')
    .order('created_at', { ascending: false })
    .limit(5);

  return {
    totalUsers: usersCount || 0,
    totalResumes: resumesCount || 0,
    totalTemplates: templatesCount || 0,
    totalExports: exportsCount || 0,
    exportsByType: {
      pdf: exportsByType?.['pdf'] || 0,
      docx: exportsByType?.['docx'] || 0,
    },
    recentExports: (recentExports || []).map((exp: any) => ({
      id: exp.id,
      status: exp.status,
      format: exp.format,
      created_at: exp.created_at,
      resume: { title: exp.resumes?.title || 'Sans titre' },
    })),
    recentUsers: (recentUsers || []).map((user: any) => ({
      id: user.user_id,
      email: user.auth?.email || 'Email non disponible',
      created_at: user.created_at,
      profile: { full_name: user.full_name || 'Utilisateur sans nom' },
    })),
  };
};
