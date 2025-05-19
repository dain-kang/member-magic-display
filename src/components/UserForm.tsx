
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { User, UserCreateData, UserUpdateData } from '@/types/user';

// Form schema for validation
const userFormSchema = z.object({
  username: z.string()
    .min(3, '사용자명은 최소 3글자 이상이어야 합니다.')
    .max(50, '사용자명은 최대 50글자까지 가능합니다.'),
  email: z.string()
    .email('유효한 이메일 주소를 입력해주세요.'),
  name: z.string()
    .min(2, '이름은 최소 2글자 이상이어야 합니다.')
    .max(100, '이름은 최대 100글자까지 가능합니다.'),
  password: z.string()
    .min(8, '비밀번호는 최소 8글자 이상이어야 합니다.')
    .optional(),
  role: z.enum(['admin', 'user', 'manager']),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
});

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: UserCreateData | UserUpdateData) => Promise<void>;
  isLoading: boolean;
  mode: 'create' | 'edit';
}

const UserForm = ({ initialData, onSubmit, isLoading, mode }: UserFormProps) => {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: initialData?.username || '',
      email: initialData?.email || '',
      name: initialData?.name || '',
      password: '',  // Empty for security
      role: initialData?.role || 'user',
      status: initialData?.status || 'active',
    },
  });
  
  const handleSubmit = async (values: z.infer<typeof userFormSchema>) => {
    const submissionData = { ...values };
    
    // If editing and password is empty, remove it
    if (mode === 'edit' && !submissionData.password) {
      delete submissionData.password;
    }
    
    await onSubmit(submissionData);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? '새 사용자 등록' : '사용자 정보 수정'}
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>사용자명</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="name@example.com" 
                        type="email" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="이름을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {mode === 'create' ? '비밀번호' : '새 비밀번호 (변경시에만 입력)'}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={mode === 'create' ? '비밀번호 입력' : '새 비밀번호 입력 (선택사항)'} 
                      type="password" 
                      {...field} 
                    />
                  </FormControl>
                  {mode === 'edit' && (
                    <FormDescription>
                      변경하지 않으려면 공란으로 두세요.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>역할</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="역할 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">관리자</SelectItem>
                        <SelectItem value="manager">매니저</SelectItem>
                        <SelectItem value="user">일반 사용자</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {mode === 'edit' && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>상태</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="상태 선택" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">활성</SelectItem>
                          <SelectItem value="inactive">비활성</SelectItem>
                          <SelectItem value="pending">대기중</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-2 border-t pt-4">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => navigate('/users')}
              disabled={isLoading}
            >
              취소
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '처리 중...' : mode === 'create' ? '저장' : '수정'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default UserForm;
