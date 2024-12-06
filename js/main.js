var order = new Vue({
    el: '#order',
    data: {
        toppingPizzas: [
            {
                id: 1,
                name: "Avocado",
                price: 1
            },
            {
                id: 2,
                name: "Broccoli",
                price: 1
            },
            {
                id: 3,
                name: "Onions",
                price: 1
            },
            {
                id: 4,
                name: "Zucchini",
                price: 1
            },
            {
                id: 5,
                name: "Lobster",
                price: 2
            },
            {
                id: 6,
                name: "Oyster",
                price: 2
            },
            {
                id: 7,
                name: "Salmon",
                price: 2
            },
            {
                id: 8,
                name: "Tuna",
                price: 2
            },
            {
                id: 9,
                name: "Bacon",
                price: 3
            },
            {
                id: 10,
                name: "Duck",
                price: 3
            },
            {
                id: 11,
                name: "Ham",
                price: 3
            },
            {
                id: 12,
                name: "Sausage",
                price: 3
            }
        ],
        sizes: [
            {
                id: 1,
                name: "Small",
                extra_price: 0
            },
            {
                id: 2,
                name: "Medium",
                extra_price: 5
            },
            {
                id: 3,
                name: "Large",
                extra_price: 7
            }
        ],
        pizzas: [
            {
                id: 1,
                name: "Cheese Pizza",
                image: "../assets/pizza/Cheese_Pizza.png",
                price: 8,
                discount: {
                    is_active: false,
                    final_price: 8
                },
                toppings: [1,2,3,4,8,11]
            },
            {
                id: 2,
                name: "Veggie Pizza",
                image: "../assets/pizza/Veggie_Pizza.png",
                price: 10,
                discount: {
                    is_active: true,
                    final_price: 8.5
                },
                toppings: [2,3,4,5,6,7,9,11]
            },
            {
                id: 3,
                name: "Classical Pizza",
                image: "../assets/pizza/Classical_Pizza.png",
                price: 12,
                discount: {
                    is_active: false,
                    final_price: 12
                },
                toppings: [2,3,4,8,9,10,11,12]
            }
        ],
        selectedPizza: null,
        selectedToppings: [],
        selectedSize: '',
    },
    methods: {
        selectPizza(pizzas) {
            this.selectedPizza = pizzas;
            this.selectedToppings = [];
            this.selectedSize = this.sizes[0].name;
        },
        isToppingAvailable(toppingId) {
            return this.selectedPizza && this.selectedPizza.toppings.includes(toppingId);
        },
        resetOrder() {
            this.selectedPizza = null;
            this.selectedToppings = [];
            this.selectedSize = '';
        },

        order() {
            if (this.isOrderValid) {
                this.resetOrder();
            } else {
                alert("Please complete your order selection!");
            }
        }
    },
    computed: {
        isOrderValid() {
            return this.selectedPizza && this.selectedSize && this.selectedToppings.length > 0;
        },
        availableToppings() {
            if (!this.selectedPizza) return [];
            return this.toppingPizzas.filter(topping => this.selectedPizza.toppings.includes(topping.id));
        },
        basePrice() {
            if (!this.selectedPizza) return 0;
            return this.selectedPizza.discount.is_active
                ? this.selectedPizza.discount.final_price
                : this.selectedPizza.price;
        },
        sizePrice() {
            const size = this.sizes.find(size => size.name === this.selectedSize);
            return size ? size.extra_price : 0;
        },
        toppingsPrice() {
            return this.selectedToppings.reduce((total, toppingId) => {
                const topping = this.toppingPizzas.find(t => t.id === toppingId);
                return total + (topping ? topping.price : 0);
            }, 0);
        },
        totalPrice() {
            return this.basePrice + this.sizePrice + this.toppingsPrice;
        }
    }
});