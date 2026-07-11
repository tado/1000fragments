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
	p *= 1.79;
	vec2 gp = p * 2.75;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.82 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 15.96 + rnd * 6.2831853 + time * 1.45);
	vec3 col = palette(v * 0.48 + time * 0.32, vec3(0.53, 0.41, 0.58), vec3(0.44, 0.48, 0.47), vec3(0.87, 0.91, 1.21), vec3(0.35, 0.15, 0.76));
	col *= 0.83 + 0.15 * sin(gl_FragCoord.y * 2.18 + time * 9.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
