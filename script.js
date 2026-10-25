/**
 * Lab Code Portal - Interactive Scripts
 * Handles S1 & S2 file switching, instant copying, search, and modular viewing.
 */

// Embedded strings ensure flawless operation under file:// protocol without CORS issues
const S1_RAW = `Gauss Seidel Method


import numpy as np
import matplotlib.pyplot as plt

# Coefficient matrix and constants
A = np.array([[8, -3, 2],
              [4, 11, -1],
              [6, 3, 12]], dtype=float)

B = np.array([20, 33, 36], dtype=float)

# Initial guess
x = np.zeros(3)
n = 10

iterations = []
x1_values = []
x2_values = []
x3_values = []

print("-" * 60)
print(f"{'k':<10}{'x[0]':<15}{'x[1]':<15}{'x[2]':<15}")
print("-" * 60)

# Gauss-Seidel iterations
for k in range(1, n + 1):
    x[0] = (B[0] - A[0, 1]*x[1] - A[0, 2]*x[2]) / A[0, 0]

    x[1] = (B[1] - A[1, 0]*x[0] - A[1, 2]*x[2]) / A[1, 1]

    x[2] = (B[2] - A[2, 0]*x[0] - A[2, 1]*x[1]) / A[2, 2]

    iterations.append(k)
    x1_values.append(x[0])
    x2_values.append(x[1])
    x3_values.append(x[2])

    print(f"{k:<10}{x[0]:<15.6f}{x[1]:<15.6f}{x[2]:<15.6f}")

print("-" * 60)
print("Gauss-Seidel Solution:")
print(x)

# Visualization
plt.figure(figsize=(8, 5))
plt.plot(iterations, x1_values, marker='o', label='x1')
plt.plot(iterations, x2_values, marker='s', label='x2')
plt.plot(iterations, x3_values, marker='^', label='x3')

plt.xlabel("Iteration")
plt.ylabel("Solution values")
plt.title("Convergence of Gauss-Seidel Method")
plt.xticks(iterations)
plt.grid(True)
plt.legend()
plt.show()


Exact


import sympy as sp
import numpy as np
import matplotlib.pyplot as plt

# Define variables
x, y = sp.symbols('x y')

# Define M and N
M = 2*x*y + 3*x**2
N = x**2 + 4*y

print("M dx + N dy = 0")
print("M =", M)
print("N =", N)

# Check exactness
My = sp.diff(M, y)
Nx = sp.diff(N, x)

print("dM/dy =", My)
print("dN/dx =", Nx)

if sp.simplify(My - Nx) == 0:
    print("The differential equation is EXACT.")

    # Integrate M with respect to x
    F = sp.integrate(M, x)

    # Find the remaining function of y
    fy = sp.simplify(N - sp.diff(F, y))
    f = sp.integrate(fy, y)

    # General solution
    F = sp.simplify(F + f)

    print("Solution:")
    print(F, "= C")

    # Visualization
    F_func = sp.lambdify((x, y), F, 'numpy')

    x_vals = np.linspace(-2, 2, 200)
    y_vals = np.linspace(-2, 2, 200)
    X, Y = np.meshgrid(x_vals, y_vals)
    Z = F_func(X, Y)

    C_values = [-3, -2, -1, 0, 1, 2, 3]

    contours = plt.contour(X, Y, Z, levels=C_values)
    plt.clabel(contours, inline=True, fontsize=10)

    plt.axhline(0, color='red')
    plt.axvline(0, color='blue')
    plt.xlabel("x")
    plt.ylabel("y")
    plt.title("Solution Curves of Exact Differential Equation")
    plt.grid(True)
    plt.show()

else:
    print("The differential equation is NON-EXACT.")


Newtons law of cooling


import numpy as np
import matplotlib.pyplot as plt

def cooling_constant(Ta, T0, t1, T1):
    k = -(1 / t1) * np.log((T1 - Ta) / (T0 - Ta))
    return k

def find_temperature(Ta, T0, k, t):
    T = Ta + (T0 - Ta) * np.exp(-k * t)
    return T

def find_time(Ta, T0, k, T):
    t = -(1 / k) * np.log((T - Ta) / (T0 - Ta))
    return t

# Input values
Ta = float(input("Enter surrounding temperature Ta = "))
T0 = float(input("Enter initial temperature T0 = "))
t1 = float(input("Enter known time t1 = "))
T1 = float(input("Enter temperature at t1 = "))

# Calculate cooling constant
k = cooling_constant(Ta, T0, t1, T1)
print("Cooling constant k =", k)

# Find T2 or t2
print("\\nFor T2 and t2:")
print("1. Find T2 for a given t2")
print("2. Find t2 for a given T2")
print("3. Skip T2 and t2")

choice2 = int(input("Enter your choice = "))
t2 = None
T2 = None

if choice2 == 1:
    t2 = float(input("Enter time t2 = "))
    T2 = find_temperature(Ta, T0, k, t2)
    print("Time t2 =", t2)
    print("Temperature T2 =", T2)

elif choice2 == 2:
    T2 = float(input("Enter required temperature T2 = "))
    t2 = find_time(Ta, T0, k, T2)
    print("Temperature T2 =", T2)
    print("Time t2 =", t2)

elif choice2 == 3:
    print("T2 and t2 calculation skipped.")

else:
    print("Invalid choice")

# Find T3 or t3
print("\\nFor T3 and t3:")
print("1. Find T3 for a given t3")
print("2. Find t3 for a given T3")
print("3. Skip T3 and t3")

choice3 = int(input("Enter your choice = "))
t3 = None
T3 = None

if choice3 == 1:
    t3 = float(input("Enter time t3 = "))
    T3 = find_temperature(Ta, T0, k, t3)
    print("Time t3 =", t3)
    print("Temperature T3 =", T3)

elif choice3 == 2:
    T3 = float(input("Enter required temperature T3 = "))
    t3 = find_time(Ta, T0, k, T3)
    print("Temperature T3 =", T3)
    print("Time t3 =", t3)

elif choice3 == 3:
    print("T3 and t3 calculation skipped.")

else:
    print("Invalid choice")

# Visualization
if choice2 in (1, 2) or choice3 in (1, 2):
    times = [0, t1]
    temperatures = [T0, T1]

    if t2 is not None and T2 is not None:
        times.append(t2)
        temperatures.append(T2)

    if t3 is not None and T3 is not None:
        times.append(t3)
        temperatures.append(T3)

    t_max = max(times)
    t = np.linspace(0, t_max, 100)
    T = Ta + (T0 - Ta) * np.exp(-k * t)

    plt.plot(t, T, label="Cooling curve")
    plt.axhline(Ta, linestyle="--", label="Surrounding temperature")
    plt.scatter(times, temperatures, label="Temperature points")

    plt.xlabel("Time")
    plt.ylabel("Temperature")
    plt.title("Newton's Law of Cooling")
    plt.grid(True)
    plt.legend()
    plt.show()


Non-Homogeneous


from sympy import *
import numpy as np
import matplotlib.pyplot as plt

# Define variables
x = symbols('x')
y = Function('y')

ode = Eq(
    diff(y(x), x, 2) + 5*diff(y(x), x) + 6*y(x),
    exp(x)
)


solution = dsolve(ode)

print("Solution of the differential equation:")
print(solution)


CF = exp(-2*x) + exp(-3*x)


PI = exp(x) / 12

#  C1 = C2 = 1
Y = CF + PI


X = np.linspace(0, 10, 100)

CF_value = lambdify(x, CF, 'numpy')(X)
PI_value = lambdify(x, PI, 'numpy')(X)
Y_value = lambdify(x, Y, 'numpy')(X)

#visulization
plt.plot(X, CF_value, label='CF')
plt.plot(X, PI_value, label='PI')
plt.plot(X, Y_value, label='General Solution (C1=C2=1)')

plt.xlabel('x')
plt.ylabel('y')
plt.title('Visualization of CF and PI')
plt.grid(True)
plt.legend()
plt.show()`;

const S2_RAW = `Gauss Seidel Method


import numpy as np
import matplotlib.pyplot as plt

# Coefficient matrix and constants
A = np.array([[8, -3, 2],
              [4, 11, -1],
              [6, 3, 12]], dtype=float)

B = np.array([20, 33, 36], dtype=float)

# Initial guess
x = np.zeros(3)
n = 10

iterations = []
x1_values = []
x2_values = []
x3_values = []

print("-" * 60)
print(f"{'k':<10}{'x[0]':<15}{'x[1]':<15}{'x[2]':<15}")
print("-" * 60)

# Gauss-Seidel iterations
for k in range(1, n + 1):
    x[0] = (B[0] - A[0, 1]*x[1] - A[0, 2]*x[2]) / A[0, 0]

    x[1] = (B[1] - A[1, 0]*x[0] - A[1, 2]*x[2]) / A[1, 1]

    x[2] = (B[2] - A[2, 0]*x[0] - A[2, 1]*x[1]) / A[2, 2]

    iterations.append(k)
    x1_values.append(x[0])
    x2_values.append(x[1])
    x3_values.append(x[2])

    print(f"{k:<10}{x[0]:<15.6f}{x[1]:<15.6f}{x[2]:<15.6f}")

print("-" * 60)
print("Gauss-Seidel Solution:")
print(x)

# Visualization
plt.figure(figsize=(8, 5))
plt.plot(iterations, x1_values, marker='o', label='x1')
plt.plot(iterations, x2_values, marker='s', label='x2')
plt.plot(iterations, x3_values, marker='^', label='x3')

plt.xlabel("Iteration")
plt.ylabel("Solution values")
plt.title("Convergence of Gauss-Seidel Method")
plt.xticks(iterations)
plt.grid(True)
plt.legend()
plt.show()


Non-Exact


import sympy as sp
import numpy as np
import matplotlib.pyplot as plt

# Define symbols
x, y = sp.symbols('x y')

# Given differential equation: M dx + N dy = 0
M = y**4 + 2*y
N = x*y**3 + 2*y**4 - 4*x

# Calculate partial derivatives
My = sp.diff(M, y)
Nx = sp.diff(N, x)

print("M =", M)
print("N =", N)
print("dM/dy =", My)
print("dN/dx =", Nx)

if sp.simplify(My - Nx) == 0:
    print("\\nThe differential equation is EXACT.")
    IF = 1

else:
    print("\\nThe differential equation is NOT EXACT.")

    # Calculate integrating factor
    IF = sp.simplify(
        sp.exp(sp.integrate((Nx - My)/M, y))
    )

    print("Integrating Factor =", IF)

# Apply integrating factor
M1 = sp.simplify(IF * M)
N1 = sp.simplify(IF * N)

# Find the potential function
F = sp.integrate(M1, x)
g_prime = sp.simplify(N1 - sp.diff(F, y))
g = sp.integrate(g_prime, y)

F = sp.simplify(F + g)

print("\\nSolution:")
print(F, "= C")

# Visualization of solution curves
F_func = sp.lambdify((x, y), F, 'numpy')

x_vals = np.linspace(-2, 2, 200)

# Avoid y = 0 because the integrating factor is undefined there
y_vals = np.concatenate((
    np.linspace(-2, -0.05, 150),
    np.linspace(0.05, 2, 150)
))

X, Y = np.meshgrid(x_vals, y_vals)
Z = F_func(X, Y)
Z = np.ma.masked_invalid(Z)

C_values = [-3, -2, -1, 0, 1, 2, 3]

plt.figure(figsize=(8, 6))
contours = plt.contour(X, Y, Z, levels=C_values)
plt.clabel(contours, inline=True, fontsize=9)

plt.axhline(0, color='red', linewidth=0.8)
plt.axvline(0, color='blue', linewidth=0.8)

plt.xlabel("x")
plt.ylabel("y")
plt.title("Solution Curves of the Differential Equation")
plt.grid(True)
plt.show()


Newtons law of growth


import numpy as np
import matplotlib.pyplot as plt

# Calculate growth/decay constant
def find_constant(P0, t1, P1):
    k = (1 / t1) * np.log(P1 / P0)
    return k

# Calculate quantity at a given time
def find_quantity(P0, k, t):
    P = P0 * np.exp(k * t)
    return P

# Calculate time for a given quantity
def find_time(P0, k, P):
    t = (1 / k) * np.log(P / P0)
    return t

# Input data
P0 = float(input("Enter initial quantity P0 = "))
t1 = float(input("Enter known time t1 = "))
P1 = float(input("Enter quantity at t1 = "))

# Calculate constant
k = find_constant(P0, t1, P1)
print("Growth/Decay constant k =", k)

# Check growth or decay
if k > 0:
    print("The quantity represents Natural Growth.")
elif k < 0:
    print("The quantity represents Natural Decay.")
else:
    print("The quantity remains constant.")

# Find P2 or t2
print("\\nFor P2 and t2:")
print("1. Find P2 for a given t2")
print("2. Find t2 for a given P2")
print("3. Skip P2 and t2")

choice = int(input("Enter your choice = "))

P2 = None
t2 = None

if choice == 1:
    t2 = float(input("Enter time t2 = "))
    P2 = find_quantity(P0, k, t2)
    print("Time t2 =", t2)
    print("Quantity P2 =", P2)

elif choice == 2:
    P2 = float(input("Enter required quantity P2 = "))
    if k == 0:
        print("Time cannot be calculated when k = 0.")
    else:
        t2 = find_time(P0, k, P2)
        print("Quantity P2 =", P2)
        print("Time t2 =", t2)

elif choice == 3:
    print("P2 and t2 calculation skipped.")

else:
    print("Invalid choice")

# Visualization
if choice in (1, 2) and t2 is not None:
    t = np.linspace(0, max(t1, t2) + 1, 100)
    P = P0 * np.exp(k * t)

    plt.plot(t, P, label="Growth/Decay curve")
    plt.scatter([0, t1], [P0, P1], label="Known points")

    if P2 is not None:
        plt.scatter([t2], [P2], label="Calculated point")

    plt.xlabel("Time")
    plt.ylabel("Quantity")
    plt.title("Law of Natural Growth and Decay")
    plt.grid(True)
    plt.legend()
    plt.show()



Homogeneous


from sympy import *
import numpy as np
import matplotlib.pyplot as plt

# Define variable and function
x = symbols('x')
y = Function('y')

# Define the differential equation
ode = Eq(
    diff(y(x), x, 3)
    - 6*diff(y(x), x, 2)
    + 11*diff(y(x), x)
    - 6*y(x),
    0
)

# Solve the differential equation
sol = dsolve(ode)

print("Solution of the differential equation:")
print(sol)

# Visualization for C1 = C2 = C3 = 1
y1 = (1 + exp(x) + exp(2*x)) * exp(x)

# Convert symbolic expression to numerical function
f = lambdify(x, y1, 'numpy')

# Generate values
X = np.linspace(0, 5, 200)
Y = f(X)

# Plot the solution
plt.plot(X, Y, label='C1 = C2 = C3 = 1')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Visualization of Complementary Function')
plt.grid(True)
plt.legend()
plt.show()`;

// App State
let currentFile = 's1';
let currentViewMode = 'full';
let searchKeyword = '';

// Structured program definitions for modular view and anchors
const FILES_DATA = {
  s1: {
    filename: 's1.txt',
    rawText: S1_RAW,
    modules: [
      {
        id: 's1-gauss',
        title: 'Gauss Seidel Method',
        code: `Gauss Seidel Method


import numpy as np
import matplotlib.pyplot as plt

# Coefficient matrix and constants
A = np.array([[8, -3, 2],
              [4, 11, -1],
              [6, 3, 12]], dtype=float)

B = np.array([20, 33, 36], dtype=float)

# Initial guess
x = np.zeros(3)
n = 10

iterations = []
x1_values = []
x2_values = []
x3_values = []

print("-" * 60)
print(f"{'k':<10}{'x[0]':<15}{'x[1]':<15}{'x[2]':<15}")
print("-" * 60)

# Gauss-Seidel iterations
for k in range(1, n + 1):
    x[0] = (B[0] - A[0, 1]*x[1] - A[0, 2]*x[2]) / A[0, 0]

    x[1] = (B[1] - A[1, 0]*x[0] - A[1, 2]*x[2]) / A[1, 1]

    x[2] = (B[2] - A[2, 0]*x[0] - A[2, 1]*x[1]) / A[2, 2]

    iterations.append(k)
    x1_values.append(x[0])
    x2_values.append(x[1])
    x3_values.append(x[2])

    print(f"{k:<10}{x[0]:<15.6f}{x[1]:<15.6f}{x[2]:<15.6f}")

print("-" * 60)
print("Gauss-Seidel Solution:")
print(x)

# Visualization
plt.figure(figsize=(8, 5))
plt.plot(iterations, x1_values, marker='o', label='x1')
plt.plot(iterations, x2_values, marker='s', label='x2')
plt.plot(iterations, x3_values, marker='^', label='x3')

plt.xlabel("Iteration")
plt.ylabel("Solution values")
plt.title("Convergence of Gauss-Seidel Method")
plt.xticks(iterations)
plt.grid(True)
plt.legend()
plt.show()`
      },
      {
        id: 's1-exact',
        title: 'Exact Differential Equation',
        code: `Exact


import sympy as sp
import numpy as np
import matplotlib.pyplot as plt

# Define variables
x, y = sp.symbols('x y')

# Define M and N
M = 2*x*y + 3*x**2
N = x**2 + 4*y

print("M dx + N dy = 0")
print("M =", M)
print("N =", N)

# Check exactness
My = sp.diff(M, y)
Nx = sp.diff(N, x)

print("dM/dy =", My)
print("dN/dx =", Nx)

if sp.simplify(My - Nx) == 0:
    print("The differential equation is EXACT.")

    # Integrate M with respect to x
    F = sp.integrate(M, x)

    # Find the remaining function of y
    fy = sp.simplify(N - sp.diff(F, y))
    f = sp.integrate(fy, y)

    # General solution
    F = sp.simplify(F + f)

    print("Solution:")
    print(F, "= C")

    # Visualization
    F_func = sp.lambdify((x, y), F, 'numpy')

    x_vals = np.linspace(-2, 2, 200)
    y_vals = np.linspace(-2, 2, 200)
    X, Y = np.meshgrid(x_vals, y_vals)
    Z = F_func(X, Y)

    C_values = [-3, -2, -1, 0, 1, 2, 3]

    contours = plt.contour(X, Y, Z, levels=C_values)
    plt.clabel(contours, inline=True, fontsize=10)

    plt.axhline(0, color='red')
    plt.axvline(0, color='blue')
    plt.xlabel("x")
    plt.ylabel("y")
    plt.title("Solution Curves of Exact Differential Equation")
    plt.grid(True)
    plt.show()

else:
    print("The differential equation is NON-EXACT.")`
      },
      {
        id: 's1-cooling',
        title: "Newton's Law of Cooling",
        code: `Newtons law of cooling


import numpy as np
import matplotlib.pyplot as plt

def cooling_constant(Ta, T0, t1, T1):
    k = -(1 / t1) * np.log((T1 - Ta) / (T0 - Ta))
    return k

def find_temperature(Ta, T0, k, t):
    T = Ta + (T0 - Ta) * np.exp(-k * t)
    return T

def find_time(Ta, T0, k, T):
    t = -(1 / k) * np.log((T - Ta) / (T0 - Ta))
    return t

# Input values
Ta = float(input("Enter surrounding temperature Ta = "))
T0 = float(input("Enter initial temperature T0 = "))
t1 = float(input("Enter known time t1 = "))
T1 = float(input("Enter temperature at t1 = "))

# Calculate cooling constant
k = cooling_constant(Ta, T0, t1, T1)
print("Cooling constant k =", k)

# Find T2 or t2
print("\\nFor T2 and t2:")
print("1. Find T2 for a given t2")
print("2. Find t2 for a given T2")
print("3. Skip T2 and t2")

choice2 = int(input("Enter your choice = "))
t2 = None
T2 = None

if choice2 == 1:
    t2 = float(input("Enter time t2 = "))
    T2 = find_temperature(Ta, T0, k, t2)
    print("Time t2 =", t2)
    print("Temperature T2 =", T2)

elif choice2 == 2:
    T2 = float(input("Enter required temperature T2 = "))
    t2 = find_time(Ta, T0, k, T2)
    print("Temperature T2 =", T2)
    print("Time t2 =", t2)

elif choice2 == 3:
    print("T2 and t2 calculation skipped.")

else:
    print("Invalid choice")

# Find T3 or t3
print("\\nFor T3 and t3:")
print("1. Find T3 for a given t3")
print("2. Find t3 for a given T3")
print("3. Skip T3 and t3")

choice3 = int(input("Enter your choice = "))
t3 = None
T3 = None

if choice3 == 1:
    t3 = float(input("Enter time t3 = "))
    T3 = find_temperature(Ta, T0, k, t3)
    print("Time t3 =", t3)
    print("Temperature T3 =", T3)

elif choice3 == 2:
    T3 = float(input("Enter required temperature T3 = "))
    t3 = find_time(Ta, T0, k, T3)
    print("Temperature T3 =", T3)
    print("Time t3 =", t3)

elif choice3 == 3:
    print("T3 and t3 calculation skipped.")

else:
    print("Invalid choice")

# Visualization
if choice2 in (1, 2) or choice3 in (1, 2):
    times = [0, t1]
    temperatures = [T0, T1]

    if t2 is not None and T2 is not None:
        times.append(t2)
        temperatures.append(T2)

    if t3 is not None and T3 is not None:
        times.append(t3)
        temperatures.append(T3)

    t_max = max(times)
    t = np.linspace(0, t_max, 100)
    T = Ta + (T0 - Ta) * np.exp(-k * t)

    plt.plot(t, T, label="Cooling curve")
    plt.axhline(Ta, linestyle="--", label="Surrounding temperature")
    plt.scatter(times, temperatures, label="Temperature points")

    plt.xlabel("Time")
    plt.ylabel("Temperature")
    plt.title("Newton's Law of Cooling")
    plt.grid(True)
    plt.legend()
    plt.show()`
      },
      {
        id: 's1-nonhomo',
        title: 'Non-Homogeneous ODE',
        code: `Non-Homogeneous


from sympy import *
import numpy as np
import matplotlib.pyplot as plt

# Define variables
x = symbols('x')
y = Function('y')

ode = Eq(
    diff(y(x), x, 2) + 5*diff(y(x), x) + 6*y(x),
    exp(x)
)


solution = dsolve(ode)

print("Solution of the differential equation:")
print(solution)


CF = exp(-2*x) + exp(-3*x)


PI = exp(x) / 12

#  C1 = C2 = 1
Y = CF + PI


X = np.linspace(0, 10, 100)

CF_value = lambdify(x, CF, 'numpy')(X)
PI_value = lambdify(x, PI, 'numpy')(X)
Y_value = lambdify(x, Y, 'numpy')(X)

#visulization
plt.plot(X, CF_value, label='CF')
plt.plot(X, PI_value, label='PI')
plt.plot(X, Y_value, label='General Solution (C1=C2=1)')

plt.xlabel('x')
plt.ylabel('y')
plt.title('Visualization of CF and PI')
plt.grid(True)
plt.legend()
plt.show()`
      }
    ]
  },
  s2: {
    filename: 's2.txt',
    rawText: S2_RAW,
    modules: [
      {
        id: 's2-gauss',
        title: 'Gauss Seidel Method',
        code: `Gauss Seidel Method


import numpy as np
import matplotlib.pyplot as plt

# Coefficient matrix and constants
A = np.array([[8, -3, 2],
              [4, 11, -1],
              [6, 3, 12]], dtype=float)

B = np.array([20, 33, 36], dtype=float)

# Initial guess
x = np.zeros(3)
n = 10

iterations = []
x1_values = []
x2_values = []
x3_values = []

print("-" * 60)
print(f"{'k':<10}{'x[0]':<15}{'x[1]':<15}{'x[2]':<15}")
print("-" * 60)

# Gauss-Seidel iterations
for k in range(1, n + 1):
    x[0] = (B[0] - A[0, 1]*x[1] - A[0, 2]*x[2]) / A[0, 0]

    x[1] = (B[1] - A[1, 0]*x[0] - A[1, 2]*x[2]) / A[1, 1]

    x[2] = (B[2] - A[2, 0]*x[0] - A[2, 1]*x[1]) / A[2, 2]

    iterations.append(k)
    x1_values.append(x[0])
    x2_values.append(x[1])
    x3_values.append(x[2])

    print(f"{k:<10}{x[0]:<15.6f}{x[1]:<15.6f}{x[2]:<15.6f}")

print("-" * 60)
print("Gauss-Seidel Solution:")
print(x)

# Visualization
plt.figure(figsize=(8, 5))
plt.plot(iterations, x1_values, marker='o', label='x1')
plt.plot(iterations, x2_values, marker='s', label='x2')
plt.plot(iterations, x3_values, marker='^', label='x3')

plt.xlabel("Iteration")
plt.ylabel("Solution values")
plt.title("Convergence of Gauss-Seidel Method")
plt.xticks(iterations)
plt.grid(True)
plt.legend()
plt.show()`
      },
      {
        id: 's2-nonexact',
        title: 'Non-Exact Differential Equation',
        code: `Non-Exact


import sympy as sp
import numpy as np
import matplotlib.pyplot as plt

# Define symbols
x, y = sp.symbols('x y')

# Given differential equation: M dx + N dy = 0
M = y**4 + 2*y
N = x*y**3 + 2*y**4 - 4*x

# Calculate partial derivatives
My = sp.diff(M, y)
Nx = sp.diff(N, x)

print("M =", M)
print("N =", N)
print("dM/dy =", My)
print("dN/dx =", Nx)

if sp.simplify(My - Nx) == 0:
    print("\\nThe differential equation is EXACT.")
    IF = 1

else:
    print("\\nThe differential equation is NOT EXACT.")

    # Calculate integrating factor
    IF = sp.simplify(
        sp.exp(sp.integrate((Nx - My)/M, y))
    )

    print("Integrating Factor =", IF)

# Apply integrating factor
M1 = sp.simplify(IF * M)
N1 = sp.simplify(IF * N)

# Find the potential function
F = sp.integrate(M1, x)
g_prime = sp.simplify(N1 - sp.diff(F, y))
g = sp.integrate(g_prime, y)

F = sp.simplify(F + g)

print("\\nSolution:")
print(F, "= C")

# Visualization of solution curves
F_func = sp.lambdify((x, y), F, 'numpy')

x_vals = np.linspace(-2, 2, 200)

# Avoid y = 0 because the integrating factor is undefined there
y_vals = np.concatenate((
    np.linspace(-2, -0.05, 150),
    np.linspace(0.05, 2, 150)
))

X, Y = np.meshgrid(x_vals, y_vals)
Z = F_func(X, Y)
Z = np.ma.masked_invalid(Z)

C_values = [-3, -2, -1, 0, 1, 2, 3]

plt.figure(figsize=(8, 6))
contours = plt.contour(X, Y, Z, levels=C_values)
plt.clabel(contours, inline=True, fontsize=9)

plt.axhline(0, color='red', linewidth=0.8)
plt.axvline(0, color='blue', linewidth=0.8)

plt.xlabel("x")
plt.ylabel("y")
plt.title("Solution Curves of the Differential Equation")
plt.grid(True)
plt.show()`
      },
      {
        id: 's2-growth',
        title: "Newton's Law of Growth",
        code: `Newtons law of growth


import numpy as np
import matplotlib.pyplot as plt

# Calculate growth/decay constant
def find_constant(P0, t1, P1):
    k = (1 / t1) * np.log(P1 / P0)
    return k

# Calculate quantity at a given time
def find_quantity(P0, k, t):
    P = P0 * np.exp(k * t)
    return P

# Calculate time for a given quantity
def find_time(P0, k, P):
    t = (1 / k) * np.log(P / P0)
    return t

# Input data
P0 = float(input("Enter initial quantity P0 = "))
t1 = float(input("Enter known time t1 = "))
P1 = float(input("Enter quantity at t1 = "))

# Calculate constant
k = find_constant(P0, t1, P1)
print("Growth/Decay constant k =", k)

# Check growth or decay
if k > 0:
    print("The quantity represents Natural Growth.")
elif k < 0:
    print("The quantity represents Natural Decay.")
else:
    print("The quantity remains constant.")

# Find P2 or t2
print("\\nFor P2 and t2:")
print("1. Find P2 for a given t2")
print("2. Find t2 for a given P2")
print("3. Skip P2 and t2")

choice = int(input("Enter your choice = "))

P2 = None
t2 = None

if choice == 1:
    t2 = float(input("Enter time t2 = "))
    P2 = find_quantity(P0, k, t2)
    print("Time t2 =", t2)
    print("Quantity P2 =", P2)

elif choice == 2:
    P2 = float(input("Enter required quantity P2 = "))
    if k == 0:
        print("Time cannot be calculated when k = 0.")
    else:
        t2 = find_time(P0, k, P2)
        print("Quantity P2 =", P2)
        print("Time t2 =", t2)

elif choice == 3:
    print("P2 and t2 calculation skipped.")

else:
    print("Invalid choice")

# Visualization
if choice in (1, 2) and t2 is not None:
    t = np.linspace(0, max(t1, t2) + 1, 100)
    P = P0 * np.exp(k * t)

    plt.plot(t, P, label="Growth/Decay curve")
    plt.scatter([0, t1], [P0, P1], label="Known points")

    if P2 is not None:
        plt.scatter([t2], [P2], label="Calculated point")

    plt.xlabel("Time")
    plt.ylabel("Quantity")
    plt.title("Law of Natural Growth and Decay")
    plt.grid(True)
    plt.legend()
    plt.show()`
      },
      {
        id: 's2-homo',
        title: 'Homogeneous ODE',
        code: `Homogeneous


from sympy import *
import numpy as np
import matplotlib.pyplot as plt

# Define variable and function
x = symbols('x')
y = Function('y')

# Define the differential equation
ode = Eq(
    diff(y(x), x, 3)
    - 6*diff(y(x), x, 2)
    + 11*diff(y(x), x)
    - 6*y(x),
    0
)

# Solve the differential equation
sol = dsolve(ode)

print("Solution of the differential equation:")
print(sol)

# Visualization for C1 = C2 = C3 = 1
y1 = (1 + exp(x) + exp(2*x)) * exp(x)

# Convert symbolic expression to numerical function
f = lambdify(x, y1, 'numpy')

# Generate values
X = np.linspace(0, 5, 200)
Y = f(X)

# Plot the solution
plt.plot(X, Y, label='C1 = C2 = C3 = 1')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Visualization of Complementary Function')
plt.grid(True)
plt.legend()
plt.show()`
      }
    ]
  }
};

/**
 * Initialize on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
  renderActiveFile();
  setupKeyboardShortcuts();
  setupScrollListener();
});

/**
 * Switch Active File (S1 or S2)
 */
function selectFile(fileKey, event) {
  if (event) {
    event.stopPropagation();
  }
  
  if (currentFile === fileKey) {
    // If already active, smoothly scroll viewer into view
    scrollToViewer();
    return;
  }

  currentFile = fileKey;

  // Update card UI active classes
  document.querySelectorAll('.file-card').forEach(card => card.classList.remove('active'));
  const activeCard = document.getElementById(`card-${fileKey}`);
  if (activeCard) {
    activeCard.classList.add('active');
  }

  // Clear search on switch
  clearSearch(false);

  // Render content
  renderActiveFile();
  scrollToViewer();
}

/**
 * Smoothly scroll to viewer section
 */
function scrollToViewer() {
  const viewer = document.getElementById('viewer-container');
  if (viewer) {
    viewer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Render the currently selected file into UI
 */
function renderActiveFile() {
  const fileData = FILES_DATA[currentFile];
  if (!fileData) return;

  // Update Toolbar Metadata
  document.getElementById('active-filename').textContent = fileData.filename;
  document.getElementById('floating-filename').textContent = fileData.filename;
  document.getElementById('btn-raw-link').setAttribute('href', fileData.filename);

  const lines = fileData.rawText.split('\n');
  document.getElementById('active-line-count').textContent = `${lines.length} lines`;

  // Render Line Numbers
  const lineCol = document.getElementById('line-numbers-col');
  lineCol.innerHTML = lines.map((_, idx) => `<div>${idx + 1}</div>`).join('');

  // Render Highlighted Code
  renderCodeContent(fileData.rawText);

  // Render Anchors Navigation Bar
  renderAnchors(fileData.modules);

  // Render Modular Program Cards
  renderModules(fileData.modules);
}

/**
 * Format and highlight Python code safely
 */
function renderCodeContent(raw) {
  const codeBlock = document.getElementById('code-content-block');
  
  // Syntax highlight logic
  const highlighted = highlightPython(raw, searchKeyword);
  codeBlock.innerHTML = highlighted;
}

/**
 * Lightweight fast syntax highlighter for Python
 */
function highlightPython(code, keyword = '') {
  // Escape HTML characters
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Split into lines for contextual formatting
  const lines = escaped.split('\n');
  const processed = lines.map(line => {
    // Header detection (e.g. "Gauss Seidel Method", "Exact", "Newtons law of cooling")
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('import') && !trimmed.startsWith('from') && !trimmed.includes('=') && !trimmed.includes('(') && !trimmed.includes(':') && trimmed.length < 40) {
      return `<span class="hl-header">${line}</span>`;
    }

    // Comment line
    if (trimmed.startsWith('#')) {
      return `<span class="hl-comment">${line}</span>`;
    }

    // Inline comments
    let formatted = line;
    const commentIdx = formatted.indexOf('#');
    let inlineComment = '';
    if (commentIdx !== -1) {
      inlineComment = formatted.substring(commentIdx);
      formatted = formatted.substring(0, commentIdx);
    }

    // Strings (single & double quoted)
    formatted = formatted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="hl-string">$&</span>');

    // Python Keywords
    const keywords = ['import', 'from', 'as', 'def', 'return', 'if', 'elif', 'else', 'for', 'in', 'while', 'print', 'range', 'len'];
    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    formatted = formatted.replace(kwRegex, '<span class="hl-keyword">$1</span>');

    // Builtins / Libraries
    const builtins = ['np', 'sp', 'plt', 'symbols', 'Function', 'Eq', 'diff', 'dsolve', 'exp', 'lambdify', 'linspace', 'meshgrid', 'array', 'zeros', 'log', 'float', 'int', 'input'];
    const builtinRegex = new RegExp(`\\b(${builtins.join('|')})\\b`, 'g');
    formatted = formatted.replace(builtinRegex, '<span class="hl-built-in">$1</span>');

    // Numbers
    formatted = formatted.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="hl-number">$1</span>');

    if (inlineComment) {
      formatted += `<span class="hl-comment">${inlineComment}</span>`;
    }

    return formatted;
  });

  let result = processed.join('\n');

  // Highlight search keyword matches
  if (keyword && keyword.trim().length > 0) {
    const escapedKw = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const searchRegex = new RegExp(`(${escapedKw})`, 'gi');
    result = result.replace(searchRegex, '<mark class="hl-search-match">$1</mark>');
  }

  return result;
}

/**
 * Render Quick Jump Anchors
 */
function renderAnchors(modules) {
  const container = document.getElementById('anchors-container');
  container.innerHTML = modules.map((m, idx) => `
    <button class="anchor-chip" onclick="jumpToModule('${m.id}')" title="Jump to ${m.title}">
      <span>#${idx + 1}</span> ${m.title}
    </button>
  `).join('');
}

/**
 * Jump to specific section or module
 */
function jumpToModule(modId) {
  if (currentViewMode !== 'modules') {
    setViewMode('modules');
  }
  
  setTimeout(() => {
    const el = document.getElementById(modId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.borderColor = 'rgba(99, 102, 241, 0.9)';
      setTimeout(() => {
        el.style.borderColor = '';
      }, 1500);
    }
  }, 100);
}

/**
 * Render Modular program cards
 */
function renderModules(modules) {
  const container = document.getElementById('modules-container');
  container.innerHTML = modules.map((m, idx) => `
    <article class="program-card" id="${m.id}">
      <div class="program-card-header">
        <div style="display:flex; align-items:center;">
          <span class="prog-num-badge">PART ${idx + 1}</span>
          <h3 class="program-card-title">${m.title}</h3>
        </div>
        <div class="program-card-actions">
          <button class="btn btn-secondary btn-prog-copy" onclick="copyProgramSnippet('${m.id}', event)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy Snippet</span>
          </button>
        </div>
      </div>
      <pre class="program-card-pre"><code>${escapeHtml(m.code)}</code></pre>
    </article>
  `).join('');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Switch View Mode: Full File vs Modules
 */
function setViewMode(mode) {
  currentViewMode = mode;
  const fullContainer = document.getElementById('full-code-container');
  const modulesContainer = document.getElementById('modules-container');
  const tabFull = document.getElementById('tab-full');
  const tabModules = document.getElementById('tab-modules');

  if (mode === 'full') {
    fullContainer.style.display = 'block';
    modulesContainer.style.display = 'none';
    tabFull.classList.add('active');
    tabFull.setAttribute('aria-selected', 'true');
    tabModules.classList.remove('active');
    tabModules.setAttribute('aria-selected', 'false');
  } else {
    fullContainer.style.display = 'none';
    modulesContainer.style.display = 'flex';
    tabFull.classList.remove('active');
    tabFull.setAttribute('aria-selected', 'false');
    tabModules.classList.add('active');
    tabModules.setAttribute('aria-selected', 'true');
  }
}

/**
 * Search Keyword filter
 */
function handleSearch(val) {
  searchKeyword = val.trim();
  const clearBtn = document.getElementById('clear-search-btn');
  clearBtn.style.display = searchKeyword.length > 0 ? 'block' : 'none';

  const fileData = FILES_DATA[currentFile];
  renderCodeContent(fileData.rawText);

  // If in modules mode, filter cards
  if (currentViewMode === 'modules') {
    fileData.modules.forEach(m => {
      const card = document.getElementById(m.id);
      if (card) {
        if (!searchKeyword || m.title.toLowerCase().includes(searchKeyword.toLowerCase()) || m.code.toLowerCase().includes(searchKeyword.toLowerCase())) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      }
    });
  }
}

function clearSearch(refocus = true) {
  searchKeyword = '';
  const input = document.getElementById('code-search-input');
  if (input) input.value = '';
  const clearBtn = document.getElementById('clear-search-btn');
  if (clearBtn) clearBtn.style.display = 'none';

  const fileData = FILES_DATA[currentFile];
  if (fileData) renderCodeContent(fileData.rawText);

  // Reset modules
  document.querySelectorAll('.program-card').forEach(c => c.style.display = 'block');

  if (refocus && input) input.focus();
}

/**
 * Universal Clipboard Copy Helper
 */
async function copyToClipboard(text, successTitle, successDesc) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for non-https or local file protocol
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    showToast(successTitle, successDesc);
    triggerButtonSuccessVisuals();
  } catch (err) {
    console.error('Copy failed:', err);
    showToast('Copy Failed', 'Please select text manually or use raw link.');
  }
}

/**
 * Copy entire currently active file
 */
function copyCurrentFile() {
  const fileData = FILES_DATA[currentFile];
  const lines = fileData.rawText.split('\n').length;
  copyToClipboard(
    fileData.rawText,
    `Copied ${fileData.filename}!`,
    `All ${lines} lines have been copied to clipboard.`
  );
}

/**
 * Direct copy from file card without switching
 */
function copyEntireFileDirect(fileKey, event) {
  if (event) event.stopPropagation();
  const fileData = FILES_DATA[fileKey];
  const lines = fileData.rawText.split('\n').length;
  copyToClipboard(
    fileData.rawText,
    `Copied ${fileData.filename}!`,
    `All ${lines} lines have been copied to clipboard.`
  );
}

/**
 * Copy individual program snippet from modular view
 */
function copyProgramSnippet(modId, event) {
  if (event) event.stopPropagation();
  const fileData = FILES_DATA[currentFile];
  const found = fileData.modules.find(m => m.id === modId);
  if (found) {
    copyToClipboard(
      found.code,
      `Copied ${found.title}!`,
      'Program snippet ready to paste.'
    );

    const btn = event.currentTarget;
    if (btn) {
      const origText = btn.innerHTML;
      btn.innerHTML = `<span>Copied!</span>`;
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = origText;
        btn.classList.remove('copied');
      }, 1800);
    }
  }
}

/**
 * Button Success Animation on the main copy button
 */
function triggerButtonSuccessVisuals() {
  const heroBtn = document.getElementById('btn-copy-active');
  const btnText = document.getElementById('copy-btn-text');
  if (heroBtn && btnText) {
    heroBtn.classList.add('copied');
    const oldText = btnText.textContent;
    btnText.textContent = 'Copied!';
    setTimeout(() => {
      heroBtn.classList.remove('copied');
      btnText.textContent = oldText;
    }, 2000);
  }
}

/**
 * Show Toast Notification
 */
let toastTimeout = null;
function showToast(title, desc) {
  const toast = document.getElementById('copy-toast');
  const tTitle = document.getElementById('toast-title');
  const tDesc = document.getElementById('toast-desc');

  tTitle.textContent = title;
  tDesc.textContent = desc;

  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/**
 * Download file directly as .txt
 */
function downloadCurrentFile() {
  const fileData = FILES_DATA[currentFile];
  const blob = new Blob([fileData.rawText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileData.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Downloading ${fileData.filename}`, 'File saved to your downloads.');
}

/**
 * Keyboard Shortcuts:
 * '1' -> Select S1
 * '2' -> Select S2
 * 'c' / 'C' -> Copy active file
 * '/' -> Focus search input
 */
function setupKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Don't trigger if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      if (e.key === 'Escape') {
        clearSearch();
        e.target.blur();
      }
      return;
    }

    if (e.key === '1') {
      selectFile('s1');
    } else if (e.key === '2') {
      selectFile('s2');
    } else if (e.key === 'c' || e.key === 'C') {
      // If Ctrl+C or Cmd+C, copy is handled natively unless nothing is selected
      const selection = window.getSelection().toString();
      if (!selection) {
        e.preventDefault();
        copyCurrentFile();
      }
    } else if (e.key === '/') {
      e.preventDefault();
      const input = document.getElementById('code-search-input');
      if (input) input.focus();
    }
  });
}

/**
 * Sticky Floating bar visibility on scroll
 */
function setupScrollListener() {
  const bar = document.getElementById('floating-copy-bar');
  const viewer = document.getElementById('viewer-container');

  window.addEventListener('scroll', () => {
    if (!viewer || !bar) return;
    const rect = viewer.getBoundingClientRect();
    // Show bar when scrolled past the top of the viewer but before bottom
    if (rect.top < -50 && rect.bottom > 200) {
      bar.classList.add('visible');
    } else {
      bar.classList.remove('visible');
    }
  }, { passive: true });
}
