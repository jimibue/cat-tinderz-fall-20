# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  # liked cats is stored as text in our database
  # here we are converting that text to an array
  # we can't store arrays in our db
  # this is something shoulbn't be done all the, if you are doing this
  # you should probable creat a new model,
  # cat model
  # userlike table, id of cat and id of user
  serialize :liked_cats, Array #[1,2,3,9]

  # how do you define class in js `static` before th function

  # this is grabing  cats that users has liked
  def self.liked(ids)
    ids = ids.empty? ? [0] : ids
    Cat.where("id IN (?)", ids)
  end

  # this is grabing random cats that users has not liked
  # enhanced cat.all
  def self.random_cats(ids)
    ids = ids.empty? ? [0] : ids
    Cat.where("id NOT IN (?)", ids).order("RANDOM()")
  end
end
