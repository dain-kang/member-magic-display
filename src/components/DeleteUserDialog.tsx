
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteUserDialogProps {
  isOpen: boolean;
  userId: string | null;
  userName: string;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteUserDialog = ({ 
  isOpen,
  userId,
  userName,
  onDelete, 
  onCancel 
}: DeleteUserDialogProps) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>사용자를 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            <p>
              사용자 <span className="font-semibold">{userName}</span>을(를) 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>취소</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onDelete} 
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserDialog;
