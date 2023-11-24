const Transaction = require( '../models/transactionmodel');
const user = require("../controllers/user");
	


// const listByUser = async (req, res) => {
//   let firstDay = req.query.firstDay
//   let lastDay = req.query.lastDay
//   try {
//     let expenses = await Expense.find({'$and':[{'incurred_on':{'$gte': firstDay, '$lte':lastDay}}, {'recorded_by': req.auth._id}]}).sort('incurred_on').populate('recorded_by', '_id name')
//     res.json(expenses)
//   } catch (err){
//     console.log(err)
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err)
//     })
//   }
// }

//1.
exports.currentMonthPreview = async (req, res) => {
  const date = new Date(), y = date.getFullYear(), m = date.getMonth()
  const firstDay = new Date(y, m, 1)
  const lastDay = new Date(y, m + 1, 0)

  const today = new Date()
  today.setUTCHours(0,0,0,0)
  
  const tomorrow = new Date()
  tomorrow.setUTCHours(0,0,0,0)
  tomorrow.setDate(tomorrow.getDate()+1)
  
  const yesterday = new Date()
  yesterday.setUTCHours(0,0,0,0)
  yesterday.setDate(yesterday.getDate()-1)
  
  try {
    let currentPreview = await Transaction.aggregate([
      {
          $facet: { month: [
                              { $match : { createdAt : { $gte : firstDay, $lt: lastDay }, username: req.body.username }},
                              { $group : { _id : "currentMonth" , totalSpent:  {$sum: "$amount"} } },
                            ],
                    today: [
                      { $match : { createdAt : { $gte : today, $lt: tomorrow }, username: req.body.username }},
                      { $group : { _id : "today" , totalSpent:  {$sum: "$amount"} } },
                    ],
                    yesterday: [
                      { $match : { createdAt : { $gte : yesterday, $lt: today }, username: req.body.username }},
                      { $group : { _id : "yesterday" , totalSpent:  {$sum: "$amount"} } },
                    ]
                  }
      }])
    let expensePreview = {month: currentPreview[0].month[0], today: currentPreview[0].today[0], yesterday: currentPreview[0].yesterday[0]}
    res.json(expensePreview)
  } catch (err){
    console.log(err)
  }
}

// 2.
exports.expenseByCategory = async (req, res) => {
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);

  try {
    let categoryMonthlyAvg = await Transaction.aggregate([
      {
        $facet: {
          average: [
            {
              $match: { username: req.body.username },
            },
            {
              $group: {
                _id: { category: "$category", month: { $month: "$createdAt" } },
                totalSpent: { $sum: "$amount" },
                count: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: "$_id.category",
                avgSpent: { $avg: { $divide: ["$totalSpent", "$count"] } },
              },
            },
            {
              $project: {
                _id: "$_id",
                value: { average: "$avgSpent" },
              },
            },
          ],
          total: [
            {
              $match: {
                createdAt: { $gte: firstDay, $lte: lastDay },
                username: req.body.username,
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
                value: { total: "$totalSpent" },
              },
            },
          ],
        },
      },
      {
        $project: {
          overview: { $concatArrays: ["$average", "$total"] },
        },
      },
      { $unwind: '$overview' },
      { $replaceRoot: { newRoot: "$overview" } },
      { $group: { _id: "$_id", mergedValues: { $mergeObjects: "$value" }}},
    ]).exec();
    res.json(categoryMonthlyAvg);
  } catch (err) {
    console.log(err);
  }
};


// 3.a
exports.averageCategories = async (req, res) => {
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);

  try {
    let categoryMonthlyAvg = await Transaction.aggregate([
      { $match : { createdAt : { $gte : firstDay, $lte: lastDay }, username: req.body.username }},
      { $group : { _id : {category: "$category"}, totalSpent:  {$sum: "$amount"} } },
      { $group: { _id: "$_id.category", avgSpent: { $avg: "$totalSpent"}}},
      { $project: {x: '$_id', y: '$avgSpent'}}
    ]).exec()
    res.json({monthAVG:categoryMonthlyAvg})
    console.log('firstDay:', firstDay);
    console.log('lastDay:', lastDay);
    console.log('username:', req.body.username);
  } catch (err) {
    console.log(err)
  }
}

// // 3.b
// const yearlyExpenses = async (req, res) => {
//   const y = req.query.year
//   const firstDay = new Date(y, 0, 1)
//   const lastDay = new Date(y, 12, 0)
//   try {
//     let totalMonthly = await Expense.aggregate(  [
//       { $match: { incurred_on: { $gte : firstDay, $lt: lastDay }, recorded_by: mongoose.Types.ObjectId(req.auth._id) }},
//       { $group: { _id: {$month: "$incurred_on"}, totalSpent:  {$sum: "$amount"} } },
//       { $project: {x: '$_id', y: '$totalSpent'}}
//     ]).exec()
//     res.json({monthTot:totalMonthly})
//   } catch (err){
//     console.log(err)
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err)
//     })
//   }
// }

// //3.c
// const plotExpenses = async (req, res) => {
//   const date = new Date(req.query.month), y = date.getFullYear(), m = date.getMonth()
//   const firstDay = new Date(y, m, 1)
//   const lastDay = new Date(y, m + 1, 0)

//   try {
//     let totalMonthly = await Expense.aggregate(  [
//       { $match: { incurred_on: { $gte : firstDay, $lt: lastDay }, recorded_by: mongoose.Types.ObjectId(req.auth._id) }},
//       { $project: {x: {$dayOfMonth: '$incurred_on'}, y: '$amount'}}
//     ]).exec()
//     res.json(totalMonthly)
//   } catch (err){
//     console.log(err)
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err)
//     })
//   }
// }

//   const update = async (req, res) => {
//     try {
//       let expense = req.expense
//       expense = extend(expense, req.body)
//       expense.updated = Date.now()
//       await expense.save()
//       res.json(expense)
//     } catch (err) {
//       return res.status(400).json({
//         error: errorHandler.getErrorMessage(err)
//       })
//     }
//   }
  
// const remove = async (req, res) => {
//     try {
//       let expense = req.expense
//       let deletedExpense = await expense.remove()
//       res.json(deletedExpense)
//     } catch (err) {
//       return res.status(400).json({
//         error: errorHandler.getErrorMessage(err)
//       })
//     }
// }

// const hasAuthorization = (req, res, next) => {
//   const authorized = req.expense && req.auth && req.expense.recorded_by._id == req.auth._id
//   if (!(authorized)) {
//     return res.status('403').json({
//       error: "User is not authorized"
//     })
//   }
//   next()
// }

// export default currentMonthPreview;
    // create,
    // expenseByID,
    // read,
    // expenseByCategory,
    // averageCategories,
    // yearlyExpenses,
    // plotExpenses,
    // listByUser,
    // remove,
    // update,
    // hasAuthorization