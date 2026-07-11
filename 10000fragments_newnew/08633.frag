uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.72) * p;
	vec2 gp = p * 2.70;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 0.98 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 10.23 + rnd * 6.2831853 + time * 2.93);
	vec3 col = palette(v * 0.45 + time * 0.20, vec3(0.41, 0.42, 0.60), vec3(0.49, 0.31, 0.39), vec3(0.73, 1.22, 1.03), vec3(0.77, 0.34, 0.67));
	col *= 0.57 + 0.41 * hash21(id + 11.0);
	col *= 0.82 + 0.18 * sin(gl_FragCoord.y * 2.41 + time * 7.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
