const transaction = require('../models/transactionmodel');
const user = require('../models/usermodel');
const dashboard = require('../models/dashboardmodel');

exports.makeTransaction = async (req, res) => {
    try {
        const { transactionname, transactiontype, amount, category, createdAt } = req.body;
        const username = req.body.username;
        const currentDate = new Date();
        const requestDate = new Date(req.body.date);
        if (requestDate > currentDate) {
            res.status(400).json(
                {
                    success: false,
                    message: "Date cannot be future."
                }
            );
        }
        const createdtransaction = await transaction.create({ username, transactionname, transactiontype, amount, category, createdAt });

        const dashboardid = await dashboard.findOne({ username: username }).populate().exec();

        if (dashboardid) {

            if (transactiontype === "Expense") {
                dashboardid.expense += amount;
                dashboardid.balance -= amount;
            } else if (transactiontype === "Income") {
                dashboardid.income += amount;
                dashboardid.balance += amount;
            } else {
                console.log("Transaction type InValid");
            }
            await dashboardid.save();

        }

        console.log("transaction added");

        // send a json response and success flag
        res.status(200).json(
            {
                success: true,
                data: createdtransaction,
                message: "Entry Created Successfully"
            }
        );
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                data: "Internal server issue",
                message: err.message
            }
        )
    }
}


exports.getallTransaction = async (req, res) => {
    try {
        const username = req.body.username;

        const alltransactions = await transaction.find({ username: username }).sort({ createdAt: -1 }).populate().exec();

        // send a json response and success flag
        res.status(200).json(
            {
                success: true,
                data: alltransactions,
                message: "All transactions fetched successfully."
            }
        );
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                data: "Internal server issue",
                message: err.message
            }
        )
    }
}

exports.filteredTransactions = async (req, res) => {
    try {
        const { transactionType, month, date, expenseType, search } = req.query;
        const username = req.body.username;
        console.log(transactionType, month, date, expenseType, search);
        const pipeline = [];

        pipeline.push({
            $match: { username: username },
        });

        if (transactionType) {
            pipeline.push({
                $match: { transactiontype: transactionType },
            });
        }

        if (month) {
            const [year, monthNum] = month.split("-");
            pipeline.push({
                $match: {
                    createdAt: {
                        $gte: new Date(`${year}-${monthNum}-01`),
                        $lt: new Date(`${year}-${Number(monthNum) + 1}-01`),
                    },
                },
            });
        }

        if (date) {
            const targetDate = new Date(date);
            pipeline.push({
                $match: {
                    createdAt: {
                        $gte: new Date(targetDate.setHours(0, 0, 0, 0)),
                        $lt: new Date(targetDate.setHours(23, 59, 59, 999)),
                    },
                },
            });
        }

        if (expenseType) {
            pipeline.push({
                $match: { category: expenseType },
            });
        }

        if (search) {
            pipeline.push({
                $match: { transactionname: { $regex: search, $options: "i" } },
            });
        }

        pipeline.push({
            $sort: { createdAt: -1 },
        });

        const transactions = await transaction.aggregate(pipeline);

        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
}

exports.recentTransactions = async (req, res) => {
    try {
        const username = req.body.username;
        const finduser = await investment.find({ username: username }).sort({ createdAt: -1 }).limit(10).populate().exec();

        if (finduser) {
            return res.status(200).json({
                success: true,
                message: "Recent transactions fetched successfully."
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Recent transactions cannot be fetched."
            })
        }

    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                data: "Internal server issue",
                message: err.message
            }
        )
    }
}

exports.updateTransaction = async (req, res) => {            // expenses to be updated
    try {

        const { id } = req.params;
        const { transactionname, transactiontype, category, amount } = req.body;

        const updatetransaction = await transaction.findByIdAndUpdate(id, { transactionname, transactiontype, category, amount }, { new: true });

        if (!updatetransaction) {
            return res.status(401).json({
                success: false,
                message: "Transaction not found."
            })
        }

        return res.status(200).json({
            success: true,
            data: updatetransaction,
            message: "Transaction updated successfully."
        })



    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                data: "Internal server issue",
                message: err.message
            }
        )
    }
}


exports.deleteTransaction = async (req, res) => {
    try {
        const username = req.body.username;
        const { transactionId } = req.params;

        const deletetransaction = await transaction.findByIdAndDelete(transactionId).populate().exec();

        console.log(deletetransaction);

        // const dashboardid = await dashboard.findOne({ username: username }).populate().exec();

        // if (deletetransaction.transactiontype === 'Expense') {
        //     dashboardid.expense -= amount;
        //     dashboardid.balance += amount;
        // } else if (deletetransaction.transactiontype === 'Income') {
        //     dashboardid.income -= amount;
        //     dashboardid.balance -= amount;
        // } else {
        //     console.log("Transaction type INvalid");
        // }

        // await dashboardid.save();

        if (!deletetransaction) {
            return res.status(401).json({
                success: false,
                message: "Transaction not found."
            })
        }

        return res.status(200).json({
            success: true,
            data: deletetransaction,
            message: "Transaction deleted successfully."
        })

    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                data: "Internal server issue",
                message: err.message
            }
        )
    }
}
