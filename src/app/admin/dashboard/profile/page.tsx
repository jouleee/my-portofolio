import { getProfile } from '@/app/actions';
import ProfileForm from '@/components/portfolio/profile-form';

export const revalidate = 0;

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b-2 border-dashed border-border-color/20">
        <div className="font-space-grotesk">
          <h1 className="text-3xl font-black uppercase font-syne tracking-tight">Hero & Profile Settings</h1>
          <p className="text-sm font-bold text-foreground/50 mt-1 uppercase">
            Live database management for hero headlines, personal bio, and experience stat
          </p>
        </div>
      </div>

      {/* Form */}
      <ProfileForm profile={profile} />
    </div>
  );
}
