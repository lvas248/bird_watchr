
User.create( username: 'Luis', password: '123')

user = User.first



Bird.create(
    name:'Eagle',
    description:'n general, an eagle is any bird of prey more powerful than a buteo. An eagle may resemble a vulture in build and flight characteristics but has a fully feathered (often crested) head and strong feet equipped with great curved talons. A further difference is in foraging habits: eagles subsist mainly on live prey.'
)

Bird.create(
    name:'Falcon',
    description:'
    A falcon is a large hunting bird. Falcons are strong, with long wingspans and very sharp eyesight — not to mention their very sharp beaks. Falcons use their powerful wings and vision to spot prey while flying and swoop down on it. They can fly rapidly and change direction very quickly.'
)

Bird.create(
    name:'Blue Jay',
    description:'This common, large songbird is familiar to many people, with its perky crest; blue, white, and black plumage; and noisy calls. Blue Jays are known for their intelligence and complex social systems with tight family bonds. Their fondness for acorns is credited with helping spread oak trees after the last glacial period.'
)

Bird.create(
    name:'Cardinal',
    description:'Male cardinals are brilliant red all over, with a reddish bill and black face immediately around the bill. Females are pale brown overall with warm reddish tinges in the wings, tail, and crest. They have the same black face and red-orange bill.'
)

Bird.create(
    name:'Pigeon',
    description:'Pigeons are gentle, plump, small-billed birds with a skin saddle (cere) between the bill and forehead. All pigeons strut about with a characteristic bobbing of the head. Because of their long wings and powerful flight muscles, they are strong, swift fliers.'
)

Bird.create(
    name:'Albatross',
    description:'These feathered giants have the longest wingspan of any bird—up to 11 feet! The wandering albatross is the biggest of some two dozen different species. Albatrosses use their formidable wingspans to ride the ocean winds and sometimes to glide for hours without rest or even a flap of their wings.'
)

Bird.create(
    name:'Hummingbird',
    description:'A hummingbird is a small bird with a long, slender bill. Many hummingbirds have brightly colored, glittery feathers. Often the males are more colorful than the females. The birds are named for the humming sound made by the rapid beating of their wings.'
)


post_one = Post.create({
    bird: Bird.find_by_name('Eagle'),
    # image_url: 'https://images.unsplash.com/photo-1531884070720-875c7622d4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZWFnbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=1296&q=60',
    caption: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.',
    user: User.last, 
    location: 'New York, NY'
}
)

post_one.create_image({
    url: 'http://res.cloudinary.com/dfbe9u9zm/image/upload/v1689541819/xgbipac8zs8e6dkt7dmv.avif',
    public_id: 'xgbipac8zs8e6dkt7dmv'
})



 post_two = Post.create({
    bird: Bird.find_by_name('Falcon'),
    # image_url: 'https://images.unsplash.com/photo-1524398039352-5905418087d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmFsY29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1296&q=60',
    caption: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.',
    user: User.last, 
    location: 'Tarrytown, NY'
}
)

post_two.create_image({
    url: 'http://res.cloudinary.com/dfbe9u9zm/image/upload/v1689542027/ikojdzl5esw53hlcosnc.avif',
    public_id: 'ikojdzl5esw53hlcosnc'
})



post_three = Post.create({
    bird: Bird.find_by_name('Cardinal'),
    # image_url: 'https://images.unsplash.com/photo-1480775292373-5175d0634811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyZGluYWx8ZW58MHx8MHx8&auto=format&fit=crop&w=1296&q=60',
    caption: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.',
    user: User.last, 
    location: 'St. Louis, Missouri'
}
)

post_three.create_image({
    url: 'http://res.cloudinary.com/dfbe9u9zm/image/upload/v1689542195/quusthieqf6pnixwlos5.avif',
    public_id: 'quusthieqf6pnixwlos5'
})

post_four = Post.create({
    bird: Bird.find_by_name('Blue Jay'),
    # image_url: 'https://images.unsplash.com/photo-1599607524581-8209e3c26cd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Ymx1ZSUyMGpheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1296&q=60',
    caption: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.',
    user: User.last, 
    location: 'St. Louis, Missouri'
}
)

post_four.create_image({
    url: 'http://res.cloudinary.com/dfbe9u9zm/image/upload/v1689542320/hz3p7gbolhce50ompyiy.avif',
    public_id: 'hz3p7gbolhce50ompyiy'
})


post_five = Post.create({
    bird: Bird.find_by_name('Cardinal'),
    # image_url: 'https://images.unsplash.com/photo-1621880030773-0defb869118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fENhcmRpbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1296&q=60',
    caption: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.',
    user: User.last, 
    location: 'St. Louis, Missouri'
}
)

post_five.create_image({
    url: 'http://res.cloudinary.com/dfbe9u9zm/image/upload/v1689542809/bjoh1hnezawuxjmfcthm.jpg',
    public_id: 'bjoh1hnezawuxjmfcthm'
})



