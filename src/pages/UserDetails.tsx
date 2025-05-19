
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { userApi } from '@/utils/api';
import { ChevronLeft, User as UserIcon, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserCard from '@/components/UserCard';
import DeleteUserDialog from '@/components/DeleteUserDialog';
import MainLayout from '@/components/layout/MainLayout';
import type { User } from '@/types/user';

// Mock data for development preview
const mockUsers: { [key: string]: User } = {
  '1a2b3c4d': {
    id: '1a2b3c4d',
    username: 'johndoe',
    email: 'john@example.com',
    name: '홍길동',
    role: 'admin',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  '2b3c4d5e': {
    id: '2b3c4d5e',
    username: 'janedoe',
    email: 'jane@example.com',
    name: '김영희',
    role: 'user',
    status: 'active',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  '3c4d5e6f': {
    id: '3c4d5e6f',
    username: 'bobsmith',
    email: 'bob@example.com',
    name: '이철수',
    role: 'manager',
    status: 'pending',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString()
  }
};

// TODO: Remove mock data and use real API
const fetchUserData = async (userId: string) => {
  // For development, return mock data
  console.log(`Fetching user data for ID: ${userId}`);
  const user = mockUsers[userId];
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
  
  // When ready to use the real API:
  // const response = await userApi.getUserById(userId);
  // if (response.error) {
  //   throw new Error(response.error);
  // }
  // return response.data;
};

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    userId: null as string | null,
    userName: ''
  });
  
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserData(id || ''),
    enabled: !!id,
  });
  
  const handleEdit = () => {
    navigate(`/users/edit/${id}`);
  };
  
  const handleDelete = () => {
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
        
        // Navigate back to users list
        navigate('/users');
      } catch (err) {
        console.error('Failed to delete user:', err);
        toast.error('사용자 삭제 중 오류가 발생했습니다.');
      }
    }
  };
  
  const handleCancelDelete = () => {
    setDeleteDialog({ isOpen: false, userId: null, userName: '' });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Button 
            variant="outline" 
            className="p-0 h-9 px-2"
            onClick={() => navigate('/users')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            목록으로
          </Button>
          
          <Button 
            size="sm" 
            className="h-9"
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4 mr-2" />
            수정
          </Button>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2 mb-4">
            <UserIcon className="h-6 w-6" />
            사용자 정보
          </h1>
          
          {isLoading ? (
            <div className="text-center py-10">
              <p>불러오는 중...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-10">
              <p className="text-red-500">사용자 정보를 불러오는 중 오류가 발생했습니다.</p>
              <p className="mt-2 text-sm text-gray-500">{error instanceof Error ? error.message : '알 수 없는 오류'}</p>
              <Button onClick={() => navigate('/users')} className="mt-4">
                사용자 목록으로 돌아가기
              </Button>
            </div>
          ) : user ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <UserCard 
                user={user} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            </div>
          ) : (
            <div className="text-center py-10">
              <p>사용자를 찾을 수 없습니다.</p>
            </div>
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

export default UserDetails;
