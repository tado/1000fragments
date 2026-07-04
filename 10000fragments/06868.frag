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
	p *= 1.64;
	vec2 gp = p * 7.82;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 2.45 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 16.97 + rnd * 6.2831853 + time * 3.80);
	vec3 col = palette(v * 1.34 + time * 0.30, vec3(0.52, 0.49, 0.55), vec3(0.38, 0.45, 0.31), vec3(0.81, 1.39, 1.36), vec3(0.20, 0.55, 0.69));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.16 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
