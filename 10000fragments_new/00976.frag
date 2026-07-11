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
	p *= 1.30;
	vec2 gp = p * 7.45;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.00 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 23.16 + rnd * 6.2831853 + time * 1.45);
	vec3 col = palette(v * 1.18 + time * 0.22, vec3(0.56, 0.52, 0.59), vec3(0.37, 0.38, 0.42), vec3(1.29, 1.11, 0.77), vec3(0.00, 0.68, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
