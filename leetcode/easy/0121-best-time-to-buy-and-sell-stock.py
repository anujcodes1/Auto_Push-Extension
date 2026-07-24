# ===================================================
# Problem  : Best Time to Buy and Sell Stock
# Platform : Leetcode
# Link     : https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
# Difficulty: Easy
# Language : Python3
# Runtime  : 67 ms
# Memory   : 28.5 MB
# Date     : July 24, 2026
# ===================================================class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        max_profit = 0
        min_price = float("inf")

        for i in range(0,n):
            min_price = min(min_price,prices[i])
            max_profit= max(max_profit, prices[i]-min_price)

        return max_profit
        