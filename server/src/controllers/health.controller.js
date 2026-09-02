export const healthController = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: '✔️ app is healthy'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `❌ Internal server error`,
            error: error.message
        })
    }
}