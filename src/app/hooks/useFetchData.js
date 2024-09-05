import { useEffect, useState } from 'react';

const useFetchData = (url) => {
  const [data, setData] = useState(null); // استخدام null بدلاً من [] لتوضيح أن البيانات غير موجودة بعد
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // دالة لجلب البيانات
    const fetchData = async () => {
      setLoading(true); // تأكد من تعيين حالة التحميل عند بدء الجلب
      setError(null); // إعادة تعيين الأخطاء عند بدء عملية الجلب

      try {
        const response = await fetch(url);

        if (!response.ok) {
          // رمي خطأ مخصص إذا كانت الاستجابة غير ناجحة
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result); // تعيين البيانات المستلمة
      } catch (err) {
        // تعيين رسالة الخطأ
        setError(err.message);
      } finally {
        setLoading(false); // تعيين حالة التحميل إلى false في النهاية
      }
    };

    fetchData();
  }, [url]); // إعادة تنفيذ التأثير عند تغيير الـ URL

  return { data, loading, error }; // إرجاع البيانات والحالة والأخطاء
};

export default useFetchData;
