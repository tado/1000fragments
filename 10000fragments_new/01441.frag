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
	p *= 0.95;
	p = rot2(time * 1.03) * p;
	vec2 gp = p * 3.98;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.82 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 10.51 + rnd * 6.2831853 + time * 3.20);
	vec3 col = palette(v * 1.48 + time * 0.19, vec3(0.44, 0.44, 0.55), vec3(0.36, 0.43, 0.36), vec3(0.85, 0.92, 1.30), vec3(0.46, 0.50, 0.83));
	col *= 0.70 + 0.40 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 1.54 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
