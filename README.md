# subscribe-platform

This problem involves calculating the sales tax and import duty for a list of purchased items and generating a receipt that includes the total cost of the items, total amount of sales taxes paid, and the individual prices of each item (including taxes). The sales tax rate is 10%, except for exempt items like books, food, and medical products. Additionally, all imported goods are subject to a 5% import duty. The sales tax should be rounded up to the nearest 0.05 based on the shelf price and tax rate. A solution needs to be implemented that takes inputs, processes the calculations and generates a receipt that matches the given requirements, and provides sufficient evidence that it works correctly with the given test data.

- The application is available on
- https://h4liss0n.github.io/subscribe-platform/

# Installation

## Install the dependencies and start the server.

```sh
npm install
npm rum build
npm run server
open the url: http://127.0.0.1:8080/
```

![subscribe-platform](https://github.com/h4liss0n/subscribe-platform/blob/master/doc/print.png)

# Cases

#### Input 1:

```
2 book at 12.49
1 music CD at 14.99
1 chocolate bar at 0.85
```

### Output

```
2 book: 24.98
1 music CD: 16.49
1 chocolate bar: 0.85
Sales Taxes: 1.50
Total: 42.32
```

#### Input 2:

```
1 imported box of chocolates at 10.00
1 imported bottle of perfume at 47.50
```

#### Output 2:

```
1 imported box of chocolates: 10.50
1 imported bottle of perfume: 54.65
Sales Taxes: 7.65
Total: 65.15
```

#### Input 3:

```
1 imported bottle of perfume at 27.99
1 bottle of perfume at 18.99
1 packet of headache pills at 9.75
3 imported boxes of chocolates at 11.25
```

#### Output 3:

```
1 imported bottle of perfume: 32.19
1 bottle of perfume: 20.89
1 packet of headache pills: 9.75
3 imported box of chocolates: 35.55
Sales Taxes: 7.90
Total: 98.38
```
