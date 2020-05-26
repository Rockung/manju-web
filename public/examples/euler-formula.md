## 欧拉公式

欧拉公式$e^{i\pi}+1=0$ 被誉为数学中最美的公式，然而看起来深奥的背后，其实证明并不复杂！只需要大家学习过泰勒公式和高中虚数($i^2=-1$)，就可以证明。接下来让我们看看：

### 泰勒公式

$$
sinx=\sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{(2n+1)!}=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\frac{x^7}{7!}+...+(-1)^n \frac{x^{2n+1}}{(2n+1)!}
$$

$$
cosx = \sum_{n=0}^{\infty}(-1)^n\frac{x^{2n}}{(2n)!}=1-\frac{x^2}{2!}+\frac{x^4}{4!}-\frac{x^6}{6!}+...+(-1)^n\frac{x^{2n}}{(2n)!}
$$

### 高中虚数

$$
i^0=1; i^1=i; i^2=-1; i^3=-i
$$

所以我们有：
$$
cosx = 1 + \frac{(ix)^2}{2!} + \frac{(ix)^4}{4!} + \frac{(ix)^6}{6!} + ...
$$

$$
isinx = ix+\frac{(ix)^3}{3!}+\frac{(ix)^5}{5!}+\frac{(ix)^7}{7!} + ...
$$

$$
cosx+isinx = \sum_{n=0}^{\infty}\frac{(ix)^n}{n!}=e^{ix}
$$

即： $e^{i\theta}=cos{\theta}+isin{\theta}$

我们把$\theta=\pi$代入得到欧拉公式：**$e^{i\pi}+1=0$**
