uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.67;
	p = rot2(time * 1.48) * p;
	vec2 gp = p * 7.38;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.66 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 21.63 + rnd * 6.2831853 + time * 3.25);
	vec3 col = palette(v * 1.03 + time * 0.02, vec3(0.40, 0.45, 0.50), vec3(0.42, 0.33, 0.37), vec3(0.71, 0.85, 1.22), vec3(0.81, 0.44, 0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
