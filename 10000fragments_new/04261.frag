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
	p = rot2(time * 1.01) * p;
	vec2 gp = p * 6.23;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.95 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 18.99 + rnd * 6.2831853 + time * 1.68);
	vec3 col = palette(v * 1.26 + time * 0.17, vec3(0.43, 0.41, 0.46), vec3(0.49, 0.45, 0.49), vec3(1.32, 0.94, 1.38), vec3(0.11, 0.26, 0.47));
	col *= 0.90 + 0.13 * sin(gl_FragCoord.y * 2.86 + time * 9.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
