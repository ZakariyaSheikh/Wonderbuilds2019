# == Schema Information
#
# Table name: parent_categories
#
#  id         :bigint(8)        not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ParentCategory < ApplicationRecord
  has_many :categories
end
