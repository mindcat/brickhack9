module StellarAPI

using Oxygen
using HTTP
using StructTypes

include("Stars.jl")

StructTypes.StructType(::Type{Stars.Star}) = StructTypes.Struct()

# All the stars in a vector
stars = Stars.read_data("$(@__DIR__)/data/stars.csv")

@post "/stars" function(req::HTTP.Request)
    return stars
end

# start the web server
serve()

end # end module