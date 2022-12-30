# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

birds = ['Blue Jay', 'Wood Pecker', 'Rock Pigeon', 'Cardinal', 'Bald Eagle']

desc = ['The blue jay is between 9 and 12 inches in length. It is bright blue on top and white to gray on its throat, chest and belly. It has a gray-blue crest on its head and black and white bars on its wings and tail. Its bill, legs and feet are black.',
        'The woodpecker has a tough, pointed beak which it uses to chip on bark, drum on trees, and find insects. The tip of their bill is chisel-shaped and sharp from all the pecking on wood. The tongue of a woodpecker can span up to four inches long. On its tongue is a glue-like substance which helps in extracting insects.',
        'The rock pigeon is 11-13 inches in length with a wingspan of 20-26 inches. It is a plump bird with a rounded tail, pointed wings, and small red to pink to grayish-black legs and feet. It has round eyes surrounded by a rings of skin and a small bill with a cere or fleshy covering on the upper part of its bill.',
        'Male cardinals are brilliant red all over, with a reddish bill and black face immediately around the bill. Females are pale brown overall with warm reddish tinges in the wings, tail, and crest. They have the same black face and red-orange bill.',
        'Bald eagles are large, predatory raptors that are recognizable for their brown body and wings, white head and tail, and hooked yellow beak. Their feet, which are also yellow, are equipped with sharp black talons.']

images =  ['https://images.unsplash.com/photo-1636246441747-7d7f83f4629c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Qmx1ZSUyMEpheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            'https://plus.unsplash.com/premium_photo-1668208363051-1902b62a2345?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d29vZHBlY2tlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1594315589933-8711a23e5310?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Um9jayUyMFBpZ2VvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1520808663317-647b476a81b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Q2FyZGluYWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1575350126138-9259890f965a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8QmFsZCUyMEVhZ2xlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60']


i = 0
while i < birds.length do
    Bird.create(
        name: birds[i],
        description: desc[i],
        image_url: images[i]
    )
    i+=1
end

User.create(
    username: 'Admin',
    password: '123',
    password_confirmation: '123'
)

User.create(
    username: 'Luis',
    password: '123',
    password_confirmation: '123'
)

User.create(
    username: 'Viv',
    password: '123',
    password_confirmation: '123'
)

User.create(
    username: 'Sasha',
    password: '123',
    password_confirmation: '123'
)

User.create(
    username: 'Chimi',
    password: '123',
    password_confirmation: '123'
)

Post.create(
    user: User.first,
    bird: Bird.first,
    image_url: 'https://images.unsplash.com/photo-1636246441747-7d7f83f4629c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Qmx1ZSUyMEpheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    caption: "Cool Bird"
)
Post.create(
    user: User.second,
    bird: Bird.second,
    image_url: 'https://images.unsplash.com/photo-1655874184076-c75fce971b46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d29vZCUyMHBlY2tlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    caption: "Saw this guy while walking my dog in Ridgewood"
)
Post.create(
    user: User.third,
    bird: Bird.third,
    image_url: 'https://images.unsplash.com/photo-1617946547180-0f9c42b18313?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cm9jayUyMHBpZ2VvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    caption: "Woof, Woof, Woof 🐶"
)
Post.create(
    user: User.last,
    bird: Bird.last,
    image_url: 'https://images.unsplash.com/photo-1515865644861-8bedc4fb8344?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJhbGQlMjBlYWdsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    caption: "Yummmmmm 😈"
)


all = User.all
all.each do |user|

    if user.username == 'Admin'
        user.isAdmin = true
        user.save
    else
        user.isAdmin = false
        user.save
    end

end


