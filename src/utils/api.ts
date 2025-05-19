
import type { User, UserCreateData, UserUpdateData, PaginatedResponse } from '@/types/user';

// API 기본 URL 설정
const API_URL = 'https://api.example.com'; // 실제 API 주소로 변경 필요

/**
 * API 호출을 위한 기본 fetch 래퍼 함수
 */
const fetchAPI = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data?: T; error?: string }> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || '알 수 없는 오류가 발생했습니다.' };
    }

    return { data };
  } catch (error) {
    console.error('API 호출 오류:', error);
    return { error: '서버 연결에 실패했습니다.' };
  }
};

/**
 * 사용자 관련 API 함수 모음
 */
export const userApi = {
  // 모든 사용자 가져오기 (페이지네이션 지원)
  getUsers: (page = 1, limit = 10) =>
    fetchAPI<PaginatedResponse<User>>(`/users?page=${page}&limit=${limit}`),

  // ID로 사용자 정보 가져오기
  getUserById: (id: string) =>
    fetchAPI<User>(`/users/${id}`),

  // 새 사용자 생성
  createUser: (userData: UserCreateData) =>
    fetchAPI<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  // 기존 사용자 정보 업데이트
  updateUser: (id: string, userData: UserUpdateData) =>
    fetchAPI<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  // 사용자 삭제
  deleteUser: (id: string) =>
    fetchAPI<{ success: boolean }>(`/users/${id}`, {
      method: 'DELETE',
    }),
};
