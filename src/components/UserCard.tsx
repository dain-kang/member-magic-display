
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  Shield, 
  Clock, 
  Check 
} from 'lucide-react';
import type { User } from '@/types/user';

interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getUserStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <Check className="h-3 w-3 mr-1" />
            활성
          </Badge>
        );
      case 'inactive':
        return <Badge variant="outline" className="text-gray-500">비활성</Badge>;
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3 w-3 mr-1" />
            대기중
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <CardDescription>#{user.id}</CardDescription>
          </div>
          {getUserStatusBadge(user.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <UserIcon className="h-4 w-4 text-gray-500" />
            <span className="font-medium">사용자명:</span>
            <span>{user.username}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="font-medium">이메일:</span>
            <span>{user.email}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-gray-500" />
            <span className="font-medium">역할:</span>
            <span className="capitalize">{user.role}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="font-medium">생성일:</span>
            <span>{formatDate(user.createdAt)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="font-medium">업데이트:</span>
            <span>{formatDate(user.updatedAt)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 border-t pt-4">
        <Button variant="outline" className="flex-1" onClick={onEdit}>
          수정
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 text-red-600 hover:text-red-700 hover:border-red-300 hover:bg-red-50" 
          onClick={onDelete}
        >
          삭제
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
