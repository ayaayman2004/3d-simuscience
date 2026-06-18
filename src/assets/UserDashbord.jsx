import React, { useContext } from 'react';
import { ThemeContext } from "../ThemeContext";

function UserDashboard() {
  const { language } = useContext(ThemeContext);
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1>{language === "en" ? `Welcome, ${user?.username || 'User'}!` : `مرحباً، ${user?.username || 'المستخدم'}!`}</h1>
      <nav>
        <ul>
          <li><a href="/lab">{language === "en" ? "Virtual Lab" : "المختبر الافتراضي"}</a></li>
          <li><a href="/history">{language === "en" ? "Reaction History" : "تاريخ التفاعلات"}</a></li>
          <li><a href="/knowledge">{language === "en" ? "Knowledge Base" : "قاعدة المعرفة"}</a></li>
        </ul>
      </nav>
      <p>{language === "en" 
        ? "This is your personal dashboard where you can perform virtual experiments and view results." 
        : "هذا هو لوحة التحكم الخاصة بك حيث يمكنك إجراء التجارب الافتراضية ومشاهدة النتائج."}</p>
    </div>
  );
}

export default UserDashboard;
