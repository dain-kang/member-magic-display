
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/utils/api';
import { toast } from 'sonner';
import { User, Users as UsersIcon, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserTable from '@/components/UserTable';
import DeleteUserDialog from '@/components/DeleteUserDialog';
import MainLayout from '@/components/layout/MainLayout';
import type { User as UserType } from '@/types/user';

// Mock data for development preview
const mockUsers: UserType[] = [
  {
    id: '1a2b3c4d',
    username: 'johndoe',
    email: 'john@example.com',
    name: '홍길동',
    role: 'admin',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2b3c4d5e',
    username: 'janedoe',
    email: 'jane@example.com',
    name: '김영희',
    role: 'user',
    status: 'active',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3c4d5e6f',
    username: 'bobsmith',
    email: 'bob@example.com',
    name: '이철수',
    role: 'manager',
    status: 'pending',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: '4d5e6f7g',
    username: 'alicejones',
    email: 'alice@example.com',
    name: '박지영',
    role: 'user',
    status: 'inactive',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString()
  }
];

// TODO: Remove mock data and use real API
const fetchUsersData = async (page: number) => {
  // For development, return mock data
  console.log(`Fetching users data for page ${page}`);
  return {
    data: mockUsers,
    total: mockUsers.length,
    page: page,
    totalPages: 1,
    limit: 10
  };
  
  // When ready to use the real API:
  // const response = await userApi.getUsers(page);
  // if (response.error) {
  //   throw new Error(response.error);
  // }
  // return response.data;
};

const Users = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    userId: null as string | null,
    userName: ''
  });
  
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['users', currentPage],
    queryFn: () => fetchUsersData(currentPage),
  });
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleDeleteClick = (userId: string) => {
    const user = data?.data.find(u => u.id === userId);
    
    if (user) {
      setDeleteDialog({
        isOpen: true,
        userId: user.id,
        userName: user.name
      });
    }
  };
  
  const handleDeleteConfirm = async () => {
    if (deleteDialog.userId) {
      try {
        // For development, just log
        console.log(`Deleting user with ID: ${deleteDialog.userId}`);
        toast.success(`사용자 ${deleteDialog.userName}이(가) 삭제되었습니다.`);
        
        // When ready to use the real API:
        // const response = await userApi.deleteUser(deleteDialog.userId);
        // if (response.error) {
        //   throw new Error(response.error);
        // }
        
        // Close dialog and refetch data
        setDeleteDialog({ isOpen: false, userId: null, userName: '' });
        refetch();
      } catch (err) {
        console.error('Failed to delete user:', err);
        toast.error('사용자 삭제 중 오류가 발생했습니다.');
      }
    }
  };
  
  const handleCancelDelete = () => {
    setDeleteDialog({ isOpen: false, userId: null, userName: '' });
  };
  
  if (isError) {
    console.error('Error loading users:', error);
    return (
      <MainLayout>
        <div className="text-center py-10">
          <p className="text-red-500">사용자 정보를 불러오는 중 오류가 발생했습니다.</p>
          <Button onClick={() => refetch()} className="mt-4">
            다시 시도
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <UsersIcon className="h-6 w-6" />
              사용자 관리
            </h1>
            <p className="text-gray-500">
              시스템의 모든 사용자를 관리합니다.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              필터
            </Button>
            <Button size="sm" className="h-9" onClick={() => navigate('/users/new')}>
              <Plus className="h-4 w-4 mr-2" />
              사용자 추가
            </Button>
          </div>
        </div>
        
        <div>
          {isLoading ? (
            <div className="text-center py-10">
              <p>불러오는 중...</p>
            </div>
          ) : (
            <UserTable
              users={data?.data || []}
              currentPage={currentPage}
              totalPages={data?.totalPages || 1}
              onPageChange={handlePageChange}
              onDeleteUser={handleDeleteClick}
            />
          )}
        </div>
      </div>
      
      <DeleteUserDialog
        isOpen={deleteDialog.isOpen}
        userId={deleteDialog.userId}
        userName={deleteDialog.userName}
        onDelete={handleDeleteConfirm}
        onCancel={handleCancelDelete}
      />
    </MainLayout>
  );
};

export default Users;
