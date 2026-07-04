uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.29;
	vec2 gp = p * 6.03;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.65 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 15.49 + rnd * 6.2831853 + time * 2.87);
	vec3 col = palette(v * 1.04 + time * 0.40, vec3(0.47, 0.51, 0.59), vec3(0.35, 0.45, 0.50), vec3(0.92, 1.21, 1.32), vec3(0.46, 0.18, 0.74));
	col *= 0.66 + 0.37 * hash21(id + 11.0);
	col *= 0.85 + 0.13 * sin(gl_FragCoord.y * 1.44 + time * 8.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
