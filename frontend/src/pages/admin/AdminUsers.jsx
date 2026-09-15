import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  ShieldCheck,
  Sprout,
  UserCheck,
  MoreVertical,
  Download,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import DashboardCard from '../../components/ui/DashboardCard';
import StatusBadge from '../../components/ui/StatusBadge';
import { mockAdminData } from '../../data/mockData';

export default function AdminUsers({ initialRoleFilter = 'all' }) {
  const [userList, setUserList] = useState(mockAdminData.userDirectory);
  const [roleFilter, setRoleFilter] = useState(initialRoleFilter);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = userList.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesQuery =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery);
    return matchesRole && matchesQuery;
  });

  const toggleUserStatus = (userId) => {
    setUserList(
      userList.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            status: u.status === 'Active' || u.status === 'Verified' ? 'Suspended' : 'Active',
          };
        }
        return u;
      })
    );
  };

  return (
    <div className="admin-users-page">
      <SectionHeader
        title="User & Access Management"
        subtitle="Manage registered farmers, certified agronomists, and system staff"
        action={
          <button
            className="btn-primary"
            onClick={() => alert('Exporting user roster CSV...')}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
          >
            <Download size={16} />
            <span>Export User Directory</span>
          </button>
        }
      />

      {/* Role Filter Tabs & Search */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search users by name, phone, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { id: 'all', label: 'All Users' },
            { id: 'farmer', label: 'Farmers' },
            { id: 'expert', label: 'Agronomists' },
            { id: 'admin', label: 'Admins' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRoleFilter(tab.id)}
              className={roleFilter === tab.id ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', minHeight: '38px' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <DashboardCard title={`Registered Accounts (${filteredUsers.length})`} icon={Users}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>Name & Contact</th>
                <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>Role</th>
                <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>Location</th>
                <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>Activity (Scans/Reviews)</th>
                <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>Status</th>
                <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{user.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{user.phone} • Joined {user.joined}</div>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        background:
                          user.role === 'farmer'
                            ? 'var(--role-farmer-bg)'
                            : user.role === 'expert'
                            ? 'var(--role-expert-bg)'
                            : 'var(--role-admin-bg)',
                        color:
                          user.role === 'farmer'
                            ? 'var(--role-farmer-text)'
                            : user.role === 'expert'
                            ? 'var(--role-expert-text)'
                            : 'var(--role-admin-text)',
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', color: 'var(--text-secondary)' }}>
                    {user.location}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: 600 }}>
                    {user.scans} submissions
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    <StatusBadge
                      status={user.status === 'Active' || user.status === 'Verified' ? 'healthy' : 'danger'}
                      label={user.status}
                      size="sm"
                    />
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right' }}>
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className="btn-secondary"
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', minHeight: '28px' }}
                    >
                      {user.status === 'Suspended' ? 'Reactivate' : 'Suspend'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
}
