---
Title: Using Desmos and Geogebra
---

Desmos ( https://www.desmos.com/calculator ) is a powerful tool that can visualize just about anything we discuss.

A more complete guide can be found here: https://mathvault.ca/desmos-guide/

The following guides correspond to chapters in Calculus (Stewart 8th edition). Links to specific Desmos visualizations are (c) their respective creators.


Chapter 1

**Piecewise functions**: Enter `y = {condition1 : definition1, condition2 : definition2, ...}` For instance, `y = {x<0: 1-x, x>0: x^2-1}`

Chapter 2

**Derivative**: Define a function like `f(x) = x^2`. Then in another row, type `f'(x)` to see its derivative. Desmos also recognizes `d/dx (f(x))`.

**Derivative intuition**: https://www.desmos.com/calculator/fzjicbxmtr

**Implicit curves**: In any row, enter any equation in x and y and watch the fireworks. Examples to try: 

`1 = (x^2-1)(y^2-2)(x^2-3)(y^2-4)`

`sin(x) + sin(y) = sin(xy)`

Chapter 4

**Riemann Sums**: https://www.desmos.com/calculator/cxsfmpvf69 
(Set c = 1/2 for a midpoint estimate!)

**Integral**: Define a function like `f(x) = x^2`. Then in another row, type `int` to create the integral symbol. Use the arrow keys to select the lower endpoint. Type 0 there. Use the arrow keys to select the upper endpoint. Type x there. Use the arrow keys to put the cursor just to the right of the integral sign, and type ` f(t) dt `. Recall that the indefinite integral is not unique, but requires an arbitrary constant C. Type +C at the end and create a slider for C when prompted, and you can browse the family of indefinite integrals for the function.

Chapter 5

**Solids of revolution about x-axis**: https://www.desmos.com/calculator/ay2hke1x9c

**Solids of revolution about y-axis**: https://www.desmos.com/calculator/uxuttnonb1

Chapter 9

**Slope field generator**: https://www.desmos.com/calculator/tmi3vk4r84

Chapter 10

**Parametric curves**: Enter x(t) and y(t) as an ordered pair. For instance, to graph x(t) = sin(4t) and y(t) = cos(5t), enter in a row `(sin(4t), cos(5t))`. Choose endpoints for t to see more of the graph.

**Parametric trace**: To see a point trace out the parametric curve mentioned above, enter:

`f(t) = sin(4t)`

`g(t) = cos(5t)`

`(f(t), g(t))` displays the whole curve.

`(f(T), g(T))` plots a point. Create a slider for T when prompted. Drag the slider for T to move the point along the curve.

**Polar point**: Desmos always plots ordered pairs as (x,y) Cartesian. To plot a polar point (r, theta), first enter `R = 0` and `T = 0` and create sliders when prompted. Then enter `(R cos T, R sin T)` to plot the polar point.

**Polar curves**: Desmos has a built-in ability to plot polar curves of the form r = f(theta). Just enter something like `r = theta/4`.

**Polar graph trace**: Follow the instructions for polar point and polar curves, except define R in terms of T according to the curve. For instance, instead of `R = 0`, enter `R = T/4`. Move the slider for T to trace the point along the polar curve.

Chapter 11

**Sequences**: Ordinary sequence notation looks like a_n, but Desmos doesn't recognize this as a sequence. Type, for instance, `a(n) = 1/n` (All sequences are just a special kind of function.) On another row enter `N = [1,2,...,40]`. On another row enter `(N, a(N))`. You can compare this with another sequence, for instance, `b(n) = 1/sqrt(n)` and then `(N,b(N))`.

**Series**: Follow the instructions for sequences above. Then enter `c(m) = sum` to create a Sigma. Enter 1 in the lower bound. Select the upper bound and type `m`. To the right of the Sigma, enter `a(n)`. On a new row type `(N, c(N))`. Change a(n) to compare various sequences to their summations.

Chapter 12

Desmos doesn't yet have a 3d graphing suite, but Geogebra does. https://www.geogebra.org/3d

**Point**: Enter as an ordered triple. (1,2,3)

**Line**: (Ordered triple) + (Ordered triple) t. For instance, `(1,2,3) + (4,5,6)t`

**Line**: An ordered triple made of functions of t: (f(t), g(t), h(t)). For instance, `(1+t, -2t, 3)`.

**Line**: Symmetric equations in x,y,z. For instance, `(x-1)/5 = (y+2)/4 = z/3`

**Vector**: Vector(point as ordered triple). For instance, `Vector((1,2,3))`

**Plane**: Linear equation in x,y,z. For instance, `5x-4y+3z=2`

