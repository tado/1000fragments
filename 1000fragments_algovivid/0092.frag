uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.29;
	p.y += sin(p.x * 2.56 + (time * 0.75) * 1.29) * 0.18;
	p *= 2.06;
	vec2 gp = p * 2.04;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.19 - 0.18 * sin((time * 0.75) * 4.21 + rnd * 6.2831853)) * 12.78);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.55, 0.65, 0.65) + vec3(0.04, 0.02, 0.04);
	col *= 0.63 + 0.45 * hash21(id + 11.0);
	col *= 0.82 + 0.12 * sin(gl_FragCoord.y * 2.49 + (time * 0.75) * 15.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col = clamp(col, 0.0, 1.0) * vec3(1.049, 1.001, 0.911) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
