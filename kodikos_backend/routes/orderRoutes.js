const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  confirmOrder,
  deleteOrder,
  getSalesStats
} = require('../controllers/orderControl');

// إنشاء طلبية جديدة
router.post('/', createOrder);

// جلب كل الطلبيات مع إحصاء المؤكد وغير المؤكد
router.get('/', getOrders);

// تأكيد الطلبية
router.put('/confirm/:id', confirmOrder);

// حذف طلبية
router.delete('/:id', deleteOrder);

// إحصائيات المبيعات الأسبوعية والشهرية
router.get('/sales-stats', getSalesStats);

module.exports = router;
