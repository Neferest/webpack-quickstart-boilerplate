module.exports = env => {
    return {
        module: {
            rules: [
                // CSS & SASS files
                {
                    test: /\.(css|scss)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
            ]
        }
    }
}