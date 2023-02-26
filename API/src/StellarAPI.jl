module StellarAPI

using Oxygen
using HTTP
using StructTypes

include("Stars.jl")

# Only need this if returning any Star structs
StructTypes.StructType(::Type{Stars.Star}) = StructTypes.Struct()

# All the stars in a vector
stars = Stars.get_stars()

@post "/stars" function(req::HTTP.Request)
    return Stars.get_star_coordinates(stars)
end

# start the web server
serve()

end # end module