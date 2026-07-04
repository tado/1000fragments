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
	p *= 1.35;
	vec2 gp = p * 5.58;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 0.73 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 22.89 + rnd * 6.2831853 + time * 2.08);
	vec3 col = palette(v * 1.17 + time * 0.05, vec3(0.50, 0.52, 0.45), vec3(0.35, 0.35, 0.49), vec3(0.85, 0.89, 0.95), vec3(0.52, 0.08, 0.76));
	col *= 0.51 + 0.41 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 1.37 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
