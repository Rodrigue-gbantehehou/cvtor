import { Button } from './ui/Button';
import { User } from '@supabase/supabase-js';
import { signOut } from '../../actions/auth';

export function Header({ user }: { user: User }) {
  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Tableau de bord Admin</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">{user.email}</span>
          <form action={async () => {
            'use server';
            await signOut();
          }}>
            <Button type="submit" variant="outline" size="sm">
              Déconnexion
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
