# 函数组合

使用函数式编程很容易写出洋葱代码

比如: w(q(e(a)))


可以改造为


compose(f1, f2, f3)

composeRight(f3, f2, f1)

注意：这里composeRight函数式代码是从右到左执行的 从 f1执行到f3



 