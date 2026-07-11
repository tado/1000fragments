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
	vec2 gp = p * 7.22;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.17 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 17.68 + rnd * 6.2831853 + time * 1.23);
	vec3 col = palette(v * 0.55 + time * 0.38, vec3(0.47, 0.51, 0.49), vec3(0.47, 0.38, 0.36), vec3(1.26, 1.15, 1.04), vec3(0.86, 1.00, 0.96));
	col *= 0.52 + 0.33 * hash21(id + 11.0);
	col = fract(col * 2.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
