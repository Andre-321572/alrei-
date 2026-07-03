<template>
    <section class="bg-gredient page-title">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="pageTitle-wrap text-center">
                        <h1 class="text-light">
                            {{ blog ? blog.title : "The Best Platforms for Learning Programming Online" }}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-12 col-sm-12 col-12">
                    <div class="article_detail_wrapss single_article_wrap format-standard">
                        <div class="article_body_wrap">
                        
                            <div class="article_featured_image">
                                <img class="img-fluid" :src="imageStyle" alt="">
                            </div>
                            
                            <div class="article_top_info">
                                <ul class="article_middle_info">
                                    <li><a href="#"><span class="icons"><i class="ti-user"></i></span>by Rosalina Doe</a></li>
                                    <li><a href="#"><span class="icons"><i class="ti-comment-alt"></i></span>45 Comments</a></li>
                                </ul>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem. <br><br> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.</p>
                            <blockquote>
                                <span class="icon"><i class="fas fa-quote-left"></i></span>
                                <p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tem
                                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ullamco laboris nisi ut aliquip ex ea commodo onsequat.</p>
                                <h5 class="name">- Rosalina Pong</h5>
                            </blockquote>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
                                voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                                inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                                magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                                dolorem. <br><br>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis
                                iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                                explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                                sed quia consequuntur magni dolores eos qui ratione voluptatem.</p>
                            
                        </div>
                    </div>
                    
                    <!-- Author Detail -->
                    <div class="article_detail_wrapss single_article_wrap format-standard">
                        
                        <div class="article_posts_thumb">
                            <span class="img"><img class="img-fluid" :src=user1 alt=""></span>
                            <h3 class="pa-name">Rosalina William</h3>
                            <ul class="social-links">
                                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fab fa-behance"></i></a></li>
                                <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                                <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                            </ul>
                            <p class="pa-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                        </div>
                        
                    </div>
                    
                    <!-- Blog Comment -->
                    <div class="article_detail_wrapss single_article_wrap format-standard">
                        
                        <div class="comment-area">
                            <div class="all-comments">
                                <h3 class="comments-title">05 Comments</h3>
                                <div class="comment-list">
                                    <ul>
                                        <li class="article_comments_wrap">
                                            <article>
                                                <div class="article_comments_thumb">
                                                    <img :src=user1 alt="">
                                                </div>
                                                <div class="comment-details">
                                                    <div class="comment-meta">
                                                        <div class="comment-left-meta">
                                                            <h4 class="author-name">Rosalina Kelian <span class="selected"><i class="fas fa-bookmark"></i></span></h4>
                                                            <div class="comment-date">19th May 2027</div>
                                                        </div>
                                                        <div class="comment-reply">
                                                            <a href="#" class="reply"><span class="icona"><i class="ti-back-left"></i></span> Reply</a>
                                                        </div>
                                                    </div>
                                                    <div class="comment-text">
                                                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim laborumab.
                                                            perspiciatis unde omnis iste natus error.</p>
                                                    </div>
                                                </div>
                                            </article>
                                            <ul class="children">
                                                <li class="article_comments_wrap">
                                                    <article>
                                                        <div class="article_comments_thumb">
                                                            <img :src="user2" alt="">
                                                        </div>
                                                        <div class="comment-details">
                                                            <div class="comment-meta">
                                                                <div class="comment-left-meta">
                                                                    <h4 class="author-name">Rosalina Kelian</h4>
                                                                    <div class="comment-date">19th May 2027</div>
                                                                </div>
                                                                <div class="comment-reply">
                                                                    <a href="#" class="reply"><span class="icons"><i class="ti-back-left"></i></span> Reply</a>
                                                                </div>
                                                            </div>
                                                            <div class="comment-text">
                                                                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim laborumab.
                                                                    perspiciatis unde omnis iste natus error.</p>
                                                            </div>
                                                        </div>
                                                    </article>
                                                    <ul class="children">
                                                        <li class="article_comments_wrap">
                                                            <article>
                                                                <div class="article_comments_thumb">
                                                                    <img :src="user4" alt="">
                                                                </div>
                                                                <div class="comment-details">
                                                                    <div class="comment-meta">
                                                                        <div class="comment-left-meta">
                                                                            <h4 class="author-name">Rosalina Kelian</h4>
                                                                            <div class="comment-date">19th May 2027</div>
                                                                        </div>
                                                                        <div class="comment-reply">
                                                                            <a href="#" class="reply"><span class="icons"><i class="ti-back-left"></i></span> Reply</a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="comment-text">
                                                                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim laborumab.
                                                                            perspiciatis unde omnis iste natus error.</p>
                                                                    </div>
                                                                </div>
                                                            </article>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="article_comments_wrap">
                                            <article>
                                                <div class="article_comments_thumb">
                                                    <img :src="user5" alt="">
                                                </div>
                                                <div class="comment-details">
                                                    <div class="comment-meta">
                                                        <div class="comment-left-meta">
                                                            <h4 class="author-name">Rosalina Kelian</h4>
                                                            <div class="comment-date">19th May 2027</div>
                                                        </div>
                                                        <div class="comment-reply">
                                                            <a href="#" class="reply"><span class="icons"><i class="ti-back-left"></i></span> Reply</a>
                                                        </div>
                                                    </div>
                                                    <div class="comment-text">
                                                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim laborumab.
                                                            perspiciatis unde omnis iste natus error.</p>
                                                    </div>
                                                </div>
                                            </article>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="comment-box">
                                <h3 class="reply-title">Post Comment</h3>
                                <div class="comment-forms">
                                    <form action="#">
                                        <div class="row g-4">
                                            <div class="col-lg-6 col-md-6 col-sm-12">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" placeholder="Your Name">
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" placeholder="Your Email">
                                                </div>
                                            </div>
                                            <div class="col-lg-12 col-md-12 col-sm-12">
                                                <div class="form-group">
                                                    <textarea name="comment" class="form-control" cols="30" rows="6" placeholder="Type your comments...."></textarea>
                                                </div>
                                            </div>
                                            <div class="col-lg-12 col-md-12 col-sm-12">
                                                <div class="form-group">
                                                    <a href="#" class="btn btn-main px-5">Submit Now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                <!-- Single blog Grid -->
                <div class="col-lg-4 col-md-12 col-sm-12 col-12">
                    
                    <!-- Searchbard -->
                    <div class="single_widgets widget_search">
                        <h4 class="title">Search</h4>
                        <form action="#" class="sidebar-search-form">
                            <input type="search" name="search" placeholder="Search..">
                            <button type="submit"><i class="ti-search"></i></button>
                        </form>
                    </div>

                    <!-- Categories -->
                    <div class="single_widgets widget_category">
                        <h4 class="title">Categories</h4>
                        <ul>

                            <li v-for="(item, index) in blogCat" :key="index">
                                <a href="#">{{item.title}} <span>{{item.value}}</span></a>
                            </li>
                            
                        </ul>
                    </div>
                    
                    <!-- Trending Posts -->
                    <div class="single_widgets widget_thumb_post">
                        <h4 class="title">Trending Posts</h4>
                        <ul>

                            <li v-for="(item, index) in trandingPost" :key="index">
                                <span class="left">
                                    <img :src="item.image" alt="" class="img-fluid">
                                </span>
                                <span class="right">
                                    <a class="feed-title" href="#">{{item.title}}</a> 
                                    <span class="post-date"><i class="ti-calendar"></i>{{item.time}}</span>
                                </span>
                            </li>
                            
                        </ul>
                    </div>
                    
                    <!-- Tags Cloud -->
                    <div class="single_widgets widget_tags">
                        <h4 class="title">Tags Cloud</h4>
                        <ul>

                            <li v-for="(item, index) in blogTag" :key="index" class="me-2">
                                <a href="#">{{item}}</a>
                            </li>
                            
                        </ul>
                    </div>
                    
                </div>
                
            </div>
        </div>
    </section>
</template>

<script setup>

import user1 from "@/assets/img/user-1.jpg";
import user2 from "@/assets/img/user-2.jpg";
import user4 from "@/assets/img/user-4.jpg";
import user5 from "@/assets/img/user-5.jpg";


import { blogCat, trandingPost, blogTag } from '@/data/data.js'

// default image path
import blog3 from "@/assets/img/blog-3.jpg";

const { blog } = defineProps({ blog: Object })

const imageStyle = computed(() => {
  return blog?.image || blog3
})

</script>