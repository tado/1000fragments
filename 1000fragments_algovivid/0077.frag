uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.16;
	p.x = abs(p.x) - 0.48;
	vec2 gp = p * 3.90;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.25 - 0.19 * sin((time * 0.67) * 2.18 + rnd * 6.2831853)) * 15.08);
	vec3 col = vec3(0.61, 0.50, 0.57) * (0.05 / (abs((v)) + 0.03));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col = clamp(col, 0.0, 1.0) * vec3(0.963, 1.001, 0.931) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
