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
	p *= 1.74;
	p = rot2(time * 0.62) * p;
	vec2 gp = p * 3.58;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 0.63 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 17.90 + rnd * 6.2831853 + time * 3.34);
	vec3 col = palette(v * 0.48 + time * 0.31, vec3(0.47, 0.43, 0.50), vec3(0.45, 0.37, 0.34), vec3(1.18, 1.03, 1.37), vec3(0.88, 0.37, 0.74));
	col *= 0.62 + 0.43 * hash21(id + 11.0);
	col *= 0.83 + 0.19 * sin(gl_FragCoord.y * 2.04 + time * 15.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
