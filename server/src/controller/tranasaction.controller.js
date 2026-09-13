import Transaction from "../models/transactionSchema.js";

export const createTransaction = async (req, res) => {
  try {
    const { account, amount, category, date, note, title, type } = req.body;

    // Basic validation
    if (!account || !amount || !category || !date || !title || !type) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction type",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    const transaction = await Transaction.create({
      userId: req.user.id,
      account,
      amount,
      category,
      date,
      note: note || "",
      title,
      type,
    });

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    console.error("Create transaction error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create transaction",
    });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      type,
      category,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {
      userId,
    };

    // Type filter
    if (type && type !== "all") {
      filter.type = type;
    }

    // Category filter
    if (category && category !== "all") {
      filter.category = category;
    }

    // Date filter
    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        filter.date.$lte = end;
      }
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [transactions, total] = await Promise.all([
      Transaction.find(filter)
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),

      Transaction.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      transactions,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Get transactions error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get transactions",
    });
  }
};
