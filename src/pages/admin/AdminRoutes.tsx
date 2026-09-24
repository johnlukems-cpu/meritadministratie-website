import { Navigate, Route, Routes } from 'react-router';
import { AdminGate } from '@/components/admin/AdminGate';
import { AdminLayout } from '@/layouts/AdminLayout';
import ContentCalendar from './ContentCalendar';
import ContentDashboard from './ContentDashboard';
import ContentDetail from './ContentDetail';
import ContentNew from './ContentNew';

/**
 * Alle routes van de MERIT Content Studio, in één module zodat de bundel
 * apart geladen wordt (zie de lazy import in src/App.tsx) en de publieke
 * website er niets van meekrijgt.
 *
 * Paden zijn relatief aan /admin (zie src/config/admin-routes.ts).
 * De beveiliging zit in <AdminGate> (interface) én in elk endpoint onder
 * /api/admin/ (server-side, doorslaggevend).
 */
export default function AdminRoutes() {
  return (
    <AdminGate>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="content" element={<ContentDashboard />} />
          <Route path="content/nieuw" element={<ContentNew />} />
          <Route path="content/kalender" element={<ContentCalendar />} />
          <Route path="content/:id" element={<ContentDetail />} />
          <Route path="*" element={<Navigate to="/admin/content" replace />} />
        </Route>
      </Routes>
    </AdminGate>
  );
}
