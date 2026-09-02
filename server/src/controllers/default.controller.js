export const defaultController = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: '✔️ app is working'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `❌ Internal server error`,
            error: error.message
        })
    }
}