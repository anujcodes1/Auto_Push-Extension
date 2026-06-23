# ===================================================
# Problem  : First Unique Character in a String
# Platform : Leetcode
# Link     : https://leetcode.com/problems/first-unique-character-in-a-string/
# Difficulty: Easy
# Language : Python3
# Runtime  : 83 ms
# Memory   : 19.8 MB
# Date     : June 23, 2026
# ===================================================class Solution:
    def firstUniqChar(self, s: str) -> int:
          frequency = [0] * 26  # Assuming only lowercase letters

        # Step 1: Count the frequency of each character
          for char in s:
            frequency[ord(char) - ord('a')] += 1  # Map 'a' to 0, 'b' to 1, ..., 'z' to 25

        # Step 2: Find the first character with a frequency of 1
          for index, char in enumerate(s):
            if frequency[ord(char) - ord('a')] == 1:
                return index  # Return the index of the first unique character

        # Step 3: If no unique character is found, return -1
          return -1
        