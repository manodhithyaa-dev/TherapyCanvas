import { useApp, AppProvider } from '@/contexts/AppContext';
import { RoleSelector } from '@/components/RoleSelector';
import { TutorDashboard } from '@/components/tutor/TutorDashboard';
import { FamilyDashboard } from '@/components/family/FamilyDashboard';

function AppContent() {
  const { userRole, setUserRole } = useApp();

  if (!userRole) {
    return <RoleSelector onSelectRole={setUserRole} />;
  }

  if (userRole === 'tutor') {
    return <TutorDashboard />;
  }

  return <FamilyDashboard />;
}

const Index = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
