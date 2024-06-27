const stock = require('../models/stockmodel');
const user = require('../models/usermodel');
const investment = require('../models/investmentmodel');

exports.stocktransaction = async (req, res) => {
    try {
        const { stockname, transactiontype, unitprice, amount } = req.body;
        const username = req.body.username;
        const stockcreated = await stock.create({ username, stockname, transactiontype, unitprice, amount });

        const investid = await investment.findOne({ username: username }).populate().exec();
        

        if (investid) {
            if (transactiontype === "buy") {

                const index = investid.holdings.findIndex(holding => holding.stockname === stockname);
                const units = amount / unitprice;

                if (index !== -1) {                                         // if stock is already present then update the values
                    investid.holdings[index].units += units;
                    investid.holdings[index].averageprice = (investid.holdings[index].averageprice * (investid.holdings[index].units - units) + (amount)*1) / investid.holdings[index].units;
                    investid.holdings[index].amount += amount*1;
                } else {                                                   // stock not present then add it to holdings
                    investid.holdings.push({
                        stockname: stockname,
                        units: units,
                        averageprice: amount / units,
                        amount: amount,
                    });

                }

                investid.totalinvestment += amount*1;            // updating totalinvestment value

            } else if (transactiontype === "sell") {
                const index = investid.holdings.findIndex(holding => holding.stockname === stockname);
                const units = amount / unitprice;

                if (index !== -1) {
                    if (investid.holdings[index].units < units) {
                        return res.status(400).json({
                            success: false,
                            message: "No. of units sold are greater than units bought initially in the stock."
                        })
                    } else if (investid.holdings[index].units === units) {
                        investid.totalinvestment -= investid.holdings[index].averageprice * units;
                        investid.holdings.splice(index, 1);
                        await investid.save();
                        console.log(investid);
                        // await investid.holdings.findByIdAndDelete(investid.holdings[index]._id);
                        return res.status(200).json({
                            success: true,
                            message: "All units of that stock sold.",
                        })
                    } else {
                        investid.holdings[index].units -= units;
                        investid.holdings[index].amount -= investid.holdings[index].averageprice * units;                   // to be confirmed later bcz value can get negative if this is done
                        investid.totalinvestment -= investid.holdings[index].averageprice * units;
                    }

                }      // else index === -1



            } else {

                return res.status(401).json({
                    success: false,
                    message: "Stock not found."
                })

            }

        } else {
            console.log("Error occured while finding investment db or user in investdb");
        }

        await investid.save();       // saving the stock in investmentmodel

        console.log(investid);


        res.status(200).json(             // send a json response and success flag
            {
                success: true,
                data: stockcreated,
                message: "Stocktransaction Created Successfully"
            }
        );
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "Internal server issue",
            message: err.message
        })
    }
}


exports.stocktransactionhistory = async (req, res) => {
    try {
        const username = req.body.username;
        console.log(username);
        const stocktransactionhistory = await stock.find({ username:username }).sort({ createdAt: -1 }).populate().exec();

        // console.log(stocktransactionhistory);

        // send a json response and success flag
        res.status(200).json(
            {
                success: true,
                data: stocktransactionhistory,
                message: "All investments fetched successfully."
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

exports.updatestocktransaction = async (req, res) => {            // expenses to be updated
    try {

        const { id } = req.params;
        const username = req.body.username;

        const updatetransaction = await stock.findById(id);
        const investid = await investment.findOne({ username: username }).populate().exec();


        if (updatetransaction) {
            if (transactiontype === "buy") {

                let index = investid.holdings.findIndex(holding => holding.stockname === stockname);
                let units = updatetransaction.amount / updatetransaction.unitprice;

                if (index !== -1) {                                         // if stock is already present then update the values
                    investid.holdings[index].units -= units;
                    investid.holdings[index].amount -= updatetransaction.amount;
                    investid.holdings[index].averageprice = (investid.holdings[index].amount) / investid.holdings[index].units;
                }

                investid.totalinvestment -= updatetransaction.amount;            // updating totalinvestment value

            } else if (transactiontype === "sell") {
                let index = investid.holdings.findIndex(holding => holding.stockname === stockname);
                let units = updatetransaction.amount / updatetransaction.unitprice;

                if (index !== -1) {

                    investid.holdings[index].units += units;
                    investid.holdings[index].amount += investid.holdings[index].averageprice * units;                   // to be confirmed later bcz value can get negative if this is done
                    investid.totalinvestment += investid.holdings[index].averageprice * units;


                } else {
                    investid.holdings.push({
                        stockname: stockname,
                        units: units,
                        averageprice: updatetransaction.amount / units,
                        amount: updatetransaction.amount,
                    });

                    investid.totalinvestment += updatetransaction.amount;
                }



            }

        } else {
            console.log("Error occured while finding investment db or user in investdb");
        }

        await investid.save();

        const { stockname, transactiontype, unitprice, amount } = req.body;
        updatetransaction = await stock.findByIdAndUpdate(id,{ stockname, transactiontype, unitprice, amount }, {new: true});

        if (investid) {
            if (transactiontype === "buy") {

                let index = investid.holdings.findIndex(holding => holding.stockname === stockname);
                let units = amount / unitprice;

                if (index !== -1) {                                         // if stock is already present then update the values
                    investid.holdings[index].units += units;
                    investid.holdings[index].averageprice = (investid.holdings[index].averageprice * (investid.holdings[index].units - units) + amount) / investid.holdings[index].units;
                    investid.holdings[index].amount += amount;
                } else {                                                   // stock not present then add it to holdings
                    investid.holdings.push({
                        stockname: stockname,
                        units: units,
                        averageprice: amount / units,
                        amount: amount,
                    });

                }

                investid.totalinvestment += amount;            // updating totalinvestment value

            } else if (transactiontype === "sell") {
                let index = investid.holdings.findIndex(holding => holding.stockname === stockname);
                let units = amount / unitprice;

                if (index !== -1) {
                    if (investid.holdings[index].units < units) {
                        return res.status(401).json({
                            success: false,
                            message: "No. of units sold are greater than units bought initially in the stock."
                        })
                    } else if (investid.holdings[index].units === units) {
                        investid.totalinvestment -= investid.holdings[index].averageprice * units;
                        investid.holdings.splice(index, 1);
                        await investid.holdings.findByIdAndDelete(investid.holdings[index]._id);
                        return res.status(200).json({
                            success: true,
                            message: "All units of that stock sold.",
                        })
                    } else {
                        investid.holdings[index].units -= units;
                        investid.holdings[index].amount -= investid.holdings[index].averageprice * units;                   // to be confirmed later bcz value can get negative if this is done
                        investid.totalinvestment -= investid.holdings[index].averageprice * units;
                    }

                }      // else index === -1



            } else {

                return res.status(401).json({
                    success: false,
                    message: "Stock not found."
                })

            }

        } else {
            console.log("Error occured while finding investment db or user in investdb");
        }



        await investid.save();       // saving the stock in investmentmodel



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


exports.deletestocktransaction = async (req, res) => {           
    try {

        const { id } = req.params;
        const username = req.body.username;

        let deletetransaction = await stock.findById(id).populate().exec();
        // const { stockname, transactiontype, unitprice, amount } = deletetransaction;
        const investid = await investment.findOne({ username: username }).populate().exec();


        if (deletetransaction) {
            if (deletetransaction.transactiontype === "buy") {

                let index = investid.holdings.findIndex(holding => holding.stockname === deletetransaction.stockname);
                let units = deletetransaction.amount / deletetransaction.unitprice;

                if (index !== -1) {                                         // if stock is already present then update the values
                    investid.holdings[index].units -= units;
                    investid.holdings[index].amount -= deletetransaction.amount;
                    investid.holdings[index].averageprice = (investid.holdings[index].amount) / investid.holdings[index].units;
                }

                investid.totalinvestment -= deletetransaction.amount;            // updating totalinvestment value

            } else if (deletetransaction.transactiontype === "sell") {
                let index = investid.holdings.findIndex(holding => holding.stockname === deletetransaction.stockname);
                let units = deletetransaction.amount / deletetransaction.unitprice;

                if (index !== -1) {

                    investid.holdings[index].units += units;
                    investid.holdings[index].amount += investid.holdings[index].averageprice * units;                   // to be confirmed later bcz value can get negative if this is done
                    investid.totalinvestment += investid.holdings[index].averageprice * units;


                } else {
                    investid.holdings.push({
                        stockname: deletetransaction.stockname,
                        units: units,
                        averageprice: deletetransaction.amount / units,
                        amount: deletetransaction.amount,
                    });

                    investid.totalinvestment += deletetransaction.amount;
                }



            }

        } else {
            console.log("Error occured while finding investment db or user in investdb");
        }

        await investid.save();

        deletetransaction = await stock.findByIdAndDelete(id);



        await investid.save();       // saving the stock in investmentmodel



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
