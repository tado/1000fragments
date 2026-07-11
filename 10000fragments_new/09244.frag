uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 2.79;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.24 - 0.15 * sin(time * 2.39 + rnd * 6.2831853)) * 20.34);
	vec3 col = palette(v * 0.56 + time * 0.09, vec3(0.59, 0.55, 0.42), vec3(0.46, 0.34, 0.41), vec3(1.05, 1.20, 1.27), vec3(0.77, 0.42, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
