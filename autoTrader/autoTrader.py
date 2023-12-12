import alpaca_trade_api as tradeapi

# Your API key and secret
API_KEY = 'your_api_key'
API_SECRET = 'your_api_secret'
BASE_URL = 'https://paper-api.alpaca.markets' # Use the paper trading URL

# Initialize the API
api = tradeapi.REST(API_KEY, API_SECRET, BASE_URL, api_version='v2')

# Function to get asset price
def get_asset_price(symbol):
    barset = api.get_barset(symbol, 'minute', 1)
    bars = barset[symbol]
    return bars[0].c  # Return the closing price of the last bar

# Function to execute a trade
def execute_trade(symbol, qty, trade_type):
    if trade_type == 'buy':
        api.submit_order(
            symbol=symbol,
            qty=qty,
            side='buy',
            type='market',
            time_in_force='gtc'
        )
    elif trade_type == 'sell':
        api.submit_order(
            symbol=symbol,
            qty=qty,
            side='sell',
            type='market',
            time_in_force='gtc'
        )

# Example usage
print(get_asset_price('AAPL'))  # Get the current price of Apple
execute_trade('AAPL', 1, 'buy')  # Buy 1 share of Apple