require "faker"

Thing.destroy_all
5.times do |i|
  Thing.create(name: Faker::Name.name)
end

Cat.destroy_all
100.times do
  name = Faker::Creature::Cat.name
  breed = Faker::Creature::Cat.breed
  registry = Faker::Creature::Cat.registry
  avatar = Faker::Avatar.image(slug: name, size: "100x400", format: "png", set: "set4")

  Cat.create(name: name, breed: breed, registry: registry, avatar: avatar)
end

puts "seeded"
puts Cat.all.length  #failed
