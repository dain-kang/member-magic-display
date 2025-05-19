
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ChevronLeft, User as UserIcon, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserFormComponent from '@/components/UserForm';
import MainLayout from '@/components/layout/MainLayout';
import { userApi } from '@/utils/api';
import type { User, UserCreateData, UserUpdateData } from '@/types/user';

// Mock data for development preview - same as in UserDetails
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

const UserFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isEditMode = !!id;
  
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserData(id || ''),
    enabled: isEditMode,
  });
  
  const handleSubmit = async (data: UserCreateData | UserUpdateData) => {
    setIsSubmitting(true);
    
    try {
      // For development, just log the data
      console.log('Form submission:', data);
      
      if (isEditMode) {
        console.log(`Updating user with ID: ${id}`);
        // When ready to use the real API:
        // const response = await userApi.updateUser(id!, data);
        // if (response.error) {
        //   throw new Error(response.error);
        // }
        toast.success('사용자 정보가 수정되었습니다.');
      } else {
        console.log('Creating new user');
        // When ready to use the real API:
        // const response = await userApi.createUser(data as UserCreateData);
        // if (response.error) {
        //   throw new Error(response.error);
        // }
        toast.success('새 사용자가 등록되었습니다.');
      }
      
      // Navigate back to users list
      navigate('/users');
    } catch (err) {
      console.error('Form submission error:', err);
      toast.error(isEditMode 
        ? '사용자 수정 중 오류가 발생했습니다.' 
        : '사용자 등록 중 오류가 발생했습니다.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="p-0 h-9 px-2"
              onClick={() => navigate('/users')}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              목록으로
            </Button>
            
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              {isEditMode ? (
                <>
                  <UserIcon className="h-6 w-6" />
                  사용자 수정
                </>
              ) : (
                <>
                  <UserPlus className="h-6 w-6" />
                  새 사용자 등록
                </>
              )}
            </h1>
          </div>
        </div>
        
        {isEditMode && isLoading ? (
          <div className="text-center py-10">
            <p>사용자 정보를 불러오는 중...</p>
          </div>
        ) : isEditMode && isError ? (
          <div className="text-center py-10">
            <p className="text-red-500">사용자 정보를 불러오는 중 오류가 발생했습니다.</p>
            <p className="mt-2 text-sm text-gray-500">{error instanceof Error ? error.message : '알 수 없는 오류'}</p>
            <Button onClick={() => navigate('/users')} className="mt-4">
              사용자 목록으로 돌아가기
            </Button>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <UserFormComponent
              initialData={user}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              mode={isEditMode ? 'edit' : 'create'}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default UserFormPage;
