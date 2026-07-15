# ===================================================
# Problem  : Maximum Depth of Binary Tree
# Platform : Leetcode
# Link     : https://leetcode.com/problems/maximum-depth-of-binary-tree/
# Difficulty: Easy
# Language : Python3
# Runtime  : 2 ms
# Memory   : 23.4 MB
# Date     : July 15, 2026
# ===================================================# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        def dfs(root, depth):
            if not root: return depth
            return max(dfs(root.left, depth + 1), dfs(root.right, depth + 1))
                       
        return dfs(root, 0)
        