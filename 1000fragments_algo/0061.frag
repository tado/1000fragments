uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2((time * 0.53) * 0.93) * p;
	vec2 gp = p * 5.01;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 21.66 - (time * 0.53) * 7.51 + rnd * 6.2831853);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.17, 0.06), vec3(0.77, 0.78, 0.75), cc);
	col *= 0.67 + 0.35 * hash21(id + 11.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(0.982, 1.022, 0.930) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
