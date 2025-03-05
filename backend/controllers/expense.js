const Transaction = require( '../models/transactionmodel');



exports.expenseByCategory = async (req, res) => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);

  try {
    let categoryMonthlyAvg = await Transaction.aggregate([
      {
        $match: {
          createdAt: { $gte: firstDay, $lte: lastDay },
          username: req.body.username,
          category: { $ne:'Income'},
        },
      },
      {
        $group: {
          _id: "$category",
          totalSpent: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: "$_id",
          total: "$totalSpent",
        },
      },
    ]).exec();
    res.json(categoryMonthlyAvg);
  } catch (err) {
    console.log(err);
  }
};


exports.weeklytransaction= async(req, res) => {

  try {
    const date = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(date.getDate() - 7);

    const utcCurrentDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    const utcSevenDaysAgo = new Date(Date.UTC(sevenDaysAgo.getUTCFullYear(), sevenDaysAgo.getUTCMonth(), sevenDaysAgo.getUTCDate()));

    const data = await Transaction.aggregate([
      {
        $match: {
          username: req.body.username,
          createdAt: { $gte: utcSevenDaysAgo, $lte: utcCurrentDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ['$transactiontype', 'Income'] }, '$amount', 0],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ['$transactiontype', 'Expense'] }, '$amount', 0],
            },
          },
        },
      },
      {
        $project: {
          date: '$_id',
          totalIncome: 1,
          totalExpense: 1,
          _id: 0,
        },
      },
      {
        $sort: { date: 1 }, // Sort by date in ascending order
      },
    ]);

    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


exports.monthlytransaction= async(req, res) => {

  try {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    const data = await Transaction.aggregate([
      {
        $match: {
          username: req.body.username,
          createdAt: { $gte: firstDay, $lte: lastDay },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ['$transactiontype', 'Income'] }, '$amount', 0],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ['$transactiontype', 'Expense'] }, '$amount', 0],
            },
          },
        },
      },
      {
        $project: {
          date: '$_id',
          totalIncome: 1,
          totalExpense: 1,
          _id: 0,
        },
      },
      {
        $sort: { date: 1 }, // Sort by date in ascending order
      },
    ]);

    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


exports.yearlytransaction= async(req, res) => {

  try {
    const date = new Date();
    const y = date.getFullYear();
    const firstDay = new Date(y, 0, 1);
    const lastDay = new Date(y+1, 0, 0);

    const data = await Transaction.aggregate([
      {
        $match: {
          username: req.body.username,
          createdAt: { $gte: firstDay, $lte: lastDay },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m', date: '$createdAt' },
          },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ['$transactiontype', 'Income'] }, '$amount', 0],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ['$transactiontype', 'Expense'] }, '$amount', 0],
            },
          },
        },
      },
      {
        $project: {
          month: '$_id',
          totalIncome: 1,
          totalExpense: 1,
          _id: 0,
        },
      },
      {
        $sort: { date: 1 }, 
      },
    ]);

    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}