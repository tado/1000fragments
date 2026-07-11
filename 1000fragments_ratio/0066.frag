uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.16;
	p = rot2((time * 0.65) * 0.40) * p;
	vec2 gp = p * 6.11;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 15.28 + rnd * 6.2831853 + (time * 0.65) * 4.97);
	vec3 col = vec3(0.65, 0.60, 0.59) * (0.05 / (abs((v)) + 0.08));
	col = col / (1.0 + col);
	col *= 0.66 + 0.33 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.77));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col = clamp(col, 0.0, 1.0) * vec3(0.922, 0.989, 1.039) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
