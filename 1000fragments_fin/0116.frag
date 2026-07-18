uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 0.94;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	vec2 gp = p * 4.47;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + (time * 0.72) * 1.93 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 15.92 + rnd * 6.2831853 + (time * 0.72) * 3.16);
	vec3 col = palette((v) * 0.46 + (time * 0.72) * 0.15, vec3(0.71, 0.61, 0.67), vec3(0.24, 0.21, 0.18), vec3(1.04, 1.04, 1.01), vec3(0.89, 0.07, 0.09));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(0.928, 0.975, 1.033);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
