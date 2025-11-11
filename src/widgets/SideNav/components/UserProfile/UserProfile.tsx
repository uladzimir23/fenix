// src/widgets/SideNav/components/UserProfile/UserProfile.tsx
import React from 'react';
import styles from './UserProfile.module.scss';

interface UserProfileProps {
  isExpanded: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ isExpanded }) => {
  return (
    <div className={styles.userProfile}>
      <div className={styles.avatar}>
        <img
          src="https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
          alt="User avatar"
        />
      </div>
      {isExpanded && (
        <div className={styles.userInfo}>
          <div className={styles.userName}>User</div>
          <div className={styles.userEmail}>admin@gmail.com</div>
        </div>
      )}
    </div>
  );
};