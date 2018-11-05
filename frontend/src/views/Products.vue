<template>
  <div class="product-container">
    <h1>{{ $route.params.type }}</h1>
    <button class="button" @click="exportToCSV">Export to csv</button> | <button class="button" @click="refreshProducts">Refresh</button>
    <hr>
    <div v-for="product in products" v-bind:key="product._ID" class="product">
    {{ product.name }} ({{ product.price }} ) - {{ product.brand }}
   
     
    </div>


  </div>
</template>

<script>
import ProductsService from "@/services/ProductsService";

export default {
  data: () => ({
    products: [],
    errors: []
  }),

  // Fetches posts when the component is created.
  mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      this.products = "";
      const response = await ProductsService.fetchProducts({
        type: this.$route.params.type
      });
      this.products = response.data;
    },
    async refreshProducts() {
      this.products = "";
      const response = await ProductsService.refreshProducts({
        type: this.$route.params.type
      });
      
      this.getProducts()
    },
    exportToCSV() {
      //If this.products is not an object then JSON.parse will parse the JSON string in an Object
      var arrData =
        typeof this.products != "object"
          ? JSON.parse(this.products)
          : this.products;
      var CSV = "";
      //This condition will generate the Label/Header

      var row = "";

      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += '"' + index + '",';

        //row = row.slice(0, -1);
        //append Label row with line break
      }
      CSV += row + "\r\n";
      //1st loop is to extract each row
      for (var i = 0; i < arrData.length; i++) {
        row = "";
        //2nd loop will extract each column and convert it in string comma-seprated
        for (index in arrData[i]) {
          row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + "\r\n";
      }

      if (CSV == "") {
        alert("Invalid data");
        return;
      }

      //this trick will generate a temp "a" tag
      var link = document.createElement("a");
      link.id = "lnkDwnldLnk";

      //this part will append the anchor tag and remove it after automatic click
      document.body.appendChild(link);

      var csv = CSV;
      var blob = new Blob([csv], { type: "text/csv" });
      var csvUrl = window.URL.createObjectURL(blob);
      var filename = "ProductExport.csv";
      document.getElementById("lnkDwnldLnk").setAttribute("download", filename);
      document.getElementById("lnkDwnldLnk").setAttribute("href", csvUrl);

      document.getElementById("lnkDwnldLnk").click();
      document.body.removeChild(link);
    }
  }
};
</script>
<style scoped>

  button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    background-color: white; 
    color: black; 
    border: 2px solid #008CBA;
}
</style>
