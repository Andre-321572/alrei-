<template>
    <section class="pr_detail">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    
                    <div class="row g-4">
                    
                        <div class="col-xl-5 col-lg-5">
                            <div class="woo-single-images">
                                <img :src="bookimageStyle" class="img-fluid rounded-4" alt="product-book-06">
                            </div>
                        </div>
                        
                        <div class="col-xl-7 col-lg-7">
                            <div class="woo_inner">
                                <div class="d-flex align-items-center mb-2"><span class="badge badge-green rounded-pill">New</span></div>
                                <h2 class="woo_product_title text-dark">
                                    {{ shop ? shop.title : "Python Essentials for Absolute Beginners" }}
                                </h2>
                                <div class="d-flex align-items-center gap-1 mb-3">
                                    <span class="star text-warning"><i class="bi bi-star-fill"></i></span>
                                    <span class="overall-rate text-dark fw-semibold fs-6">4.9</span>
                                    <span class="total-rating text-muted">(475 Reviews)</span>
                                </div>
                                <div class="woo_short_desc">
                                    <p>For many student teachers the prospect of facing their first classroom experience is overwhelming. This book presents a realistic view of what they will face in the classroom, but also provides them the skills they need to become reflective, professional teachers in their own right.</p>
                                </div>
                                <ul class="woo_info">
                                    <li><strong class="me-3">Category:</strong>Design</li>
                                    <li><strong class="me-3">SKU:</strong>#CDP0147</li>
                                </ul>
                                <div class="woo_price_rate mb-4">
                                    <div class="woo-price d-flex align-items-center gap-3">
                                        <h4 class="mb-0 text-muted-2 text-decoration-line-through">$199.00</h4>
                                        <h3 class="mb-0 text-main">$149.00</h3>
                                    </div>
                                </div>
                                
                                <div class="quantity-button-wrapper mb-4">
                                    <div class="addCart d-flex align-items-center flex-wrap gap-3">
                                        <input type="number" class="form-control qty" min="1" v-model="qty" title="Qty" placeholder="" inputmode="numeric">
                                        <button type="button" class="btn btn-main px-4" @click="addToCart">Add to cart</button>
                                        <a href="javascript:void(0)" class="fs-5" data-bs-toggle="tooltip" data-placement="top" title="Add To Wishlist"><i class="bi bi-suit-heart-fill"></i></a>
                                    </div>
                                </div>
                                
                                <div class="d-block detailed-wraps">
                                    <div class="property_block_wrap_header">
                                        <ul class="nav nav-tabs customize-tab tabs_creative" id="myTab" role="tablist">
                                            <li class="nav-item">
                                            <a class="nav-link active" id="general-tab" data-bs-toggle="tab" href="#general" role="tab" aria-controls="general" aria-selected="true">Description</a>
                                            </li>
                                            
                                            <li class="nav-item">
                                            <a class="nav-link" id="payment-tab" data-bs-toggle="tab" href="#payment" role="tab" aria-controls="payment" aria-selected="false">Custom Detail</a>
                                            </li>
                                            
                                            <li class="nav-item">
                                            <a class="nav-link" id="upgrade-tab" data-bs-toggle="tab" href="#upgrade" role="tab" aria-controls="upgrade" aria-selected="false">Reviews</a>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                    
                                    <div class="tab-content tabs_content_creative" id="myTabContent">
                                        
                                        <!-- general Query -->
                                        <div class="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
                                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. </p>
                                            <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>									
                                        </div>
                                        
                                        <!-- general Query -->
                                        <div class="tab-pane fade" id="payment" role="tabpanel" aria-labelledby="payment-tab">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">Product ID</th>
                                                            <td>#PRT123452</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Weight</th>
                                                            <td>125kg</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">SKU</th>
                                                            <td>SKL125002</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Color</th>
                                                            <td>Black</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>									
                                        </div>
                                        
                                        <!-- general Query -->
                                        <div class="tab-pane fade" id="upgrade" role="tabpanel" aria-labelledby="upgrade-tab">
                                            
                                            <div class="alert alert-success" role="alert">
                                                No any reviews yet
                                            </div>
                                            
                                        </div>
                                    
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

import { ref, computed } from 'vue'

// default image path
import book2 from "@/assets/img/book-2.jpg";

const { shop } = defineProps({ shop: Object })

const bookimageStyle = computed(() => {
  return shop?.image || book2
})

const qty = ref(1)

/* Handle Add to Cart */
const addToCart = () => {
  console.log('Added to cart with quantity:', qty.value)
}

</script>