
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserPlus,
  BarChart,
  Clock,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';

const Index = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">회원 관리 시스템</h1>
          <p className="text-gray-500 mt-1">REST API 기반 사용자 관리 대시보드에 오신 것을 환영합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">총 사용자</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">138</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <Activity className="h-3 w-3 mr-1" />
                <span>전월 대비 12% 증가</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">활성 사용자</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <Activity className="h-3 w-3 mr-1" />
                <span>전월 대비 8% 증가</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">신규 가입</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <Clock className="h-3 w-3 mr-1" />
                <span>지난 30일</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">관리자 수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <BarChart className="h-3 w-3 mr-1" />
                <span>총 사용자의 3.6%</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>빠른 작업</CardTitle>
              <CardDescription>
                자주 사용하는 기능에 빠르게 접근하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button 
                onClick={() => navigate('/users')} 
                className="justify-start"
                variant="outline"
              >
                <Users className="mr-2 h-4 w-4" />
                사용자 목록 보기
              </Button>
              
              <Button 
                onClick={() => navigate('/users/new')} 
                className="justify-start"
                variant="outline"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                새 사용자 등록
              </Button>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-gray-500">
                더 많은 관리 옵션은 왼쪽 사이드바를 이용하세요.
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>시스템 상태</CardTitle>
              <CardDescription>
                REST API 및 서비스 상태
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">API 서버</span>
                </div>
                <span className="text-sm text-green-500">정상</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">데이터베이스</span>
                </div>
                <span className="text-sm text-green-500">정상</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">캐싱 서버</span>
                </div>
                <span className="text-sm text-green-500">정상</span>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-gray-500">
                마지막 상태 확인: 2분 전
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
