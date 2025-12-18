import { useApp } from '@/contexts/AppContext';
import { RoleSelector } from '@/components/RoleSelector';
import { TutorDashboard } from '@/components/tutor/TutorDashboard';
import { FamilyDashboard } from '@/components/family/FamilyDashboard';

function Index() {
  const { user, userRole, setUserRole } = useApp();

  // If user is logged in, use their role; otherwise show role selector
  const effectiveRole = user?.role || userRole;

  if (!effectiveRole) {
    return <RoleSelector onSelectRole={setUserRole} />;
  }

  if (effectiveRole === 'tutor') {
    return <TutorDashboard />;
  }

  return <FamilyDashboard />;
}

export default Index;
