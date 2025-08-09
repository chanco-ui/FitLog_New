import React from 'react';
import { Dumbbell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

interface LineUser {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showUserInfo?: boolean;
  user?: LineUser;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false, 
  onBack,
  showUserInfo = false,
  user,
  onLogout
}) => {
  return (
    <header className="flex items-center justify-between py-6 px-6 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        {showBackButton && onBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-black border border-gray-200"
            aria-label="戻る"
          >
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div className="flex items-center space-x-3">
          <Dumbbell className="w-6 h-6 text-black" />
          <div>
            <h1 className="text-xl font-bold text-black">{title}</h1>
          </div>
        </div>
      </div>

      {showUserInfo && user && (
        <div className="flex items-center space-x-3">
          {user.pictureUrl && (
            <Image 
              src={user.pictureUrl} 
              alt={user.displayName}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <div className="text-right">
            <p className="text-sm font-medium text-black">{user.displayName}</p>
            {onLogout && (
              <Button 
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="mt-1"
              >
                <LogOut className="w-4 h-4 mr-1" />
                ログアウト
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}; 