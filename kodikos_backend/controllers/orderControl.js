const Order = require('../model/orderModel');

// إنشاء طلبية جديدة
exports.createOrder = async (req, res) => {
  try {
    const { userId, name, phone, productId, quantity, price } = req.body;

    const newOrder = new Order({
      userId,
      name,
      phone,
      productId,
      quantity,
      price,         // سعر الوحدة
      isConfirm: false, // افتراضي غير مؤكدة
      createdAt: new Date()
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// جلب كل الطلبيات مع إحصاء المؤكدة وغير المؤكدة
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({userId:req.user.id})
      .populate('userId', 'username email')
      .populate('productId', 'name price');

    const confirmedCount = orders.filter(order => order.isConfirm).length;
    const unconfirmedCount = orders.filter(order => !order.isConfirm).length;

    res.status(200).json({
      orders,
      confirmedCount,
      unconfirmedCount
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// تأكيد الطلبية
exports.confirmOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.isConfirm = true;
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// حذف طلبية
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    await order.remove();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// إحصائيات المبيعات الأسبوعية والشهرية
exports.getSalesStats = async (req, res) => {
  try {
    const now = new Date();

    // بداية الأسبوع الحالي (الأحد)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0,0,0,0);

    // بداية الشهر الحالي
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // جلب كل الطلبات المؤكدة
    const confirmedOrders = await Order.find({ isConfirm: true });

    // إحصائيات الأسبوع
    const weeklyOrders = confirmedOrders.filter(order => order.createdAt >= startOfWeek);
    const weeklyRevenue = weeklyOrders.reduce((acc, order) => acc + (order.price * order.quantity), 0);

    // إحصائيات الشهر
    const monthlyOrders = confirmedOrders.filter(order => order.createdAt >= startOfMonth);
    const monthlyRevenue = monthlyOrders.reduce((acc, order) => acc + (order.price * order.quantity), 0);

    res.status(200).json({
      weekly: {
        ordersCount: weeklyOrders.length,
        revenue: weeklyRevenue
      },
      monthly: {
        ordersCount: monthlyOrders.length,
        revenue: monthlyRevenue
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
