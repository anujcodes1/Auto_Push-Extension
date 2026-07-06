# ===================================================
# Problem  : Convert the Temperature
# Platform : Leetcode
# Link     : https://leetcode.com/problems/convert-the-temperature/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.4 MB
# Date     : July 6, 2026
# ===================================================class Solution:
    def convertTemperature(self, celsius: float) -> List[float]:
       
        Kelvin = celsius + 273.15
        fahrenheit = celsius * 1.8 + 32.0
        ans = [Kelvin , fahrenheit]

        return ans
         