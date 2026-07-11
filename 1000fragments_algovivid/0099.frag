uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.52) * 1.00), cos((time * 0.52) * 1.03)) * 0.25;
	p.x += p.y * -0.30;
	p.x *= resolution.x / resolution.y;
	p *= 2.24;
	vec2 gp = p * 5.96;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.25 - 0.09 * sin((time * 0.52) * 5.26 + rnd * 6.2831853)) * 21.23);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.14, 0.16), vec3(0.56, 0.57, 0.68), cc);
	col *= 0.62 + 0.36 * hash21(id + 11.0);
	col *= 0.86 + 0.11 * sin(gl_FragCoord.y * 2.38 + (time * 0.52) * 5.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col = clamp(col, 0.0, 1.0) * vec3(0.980, 0.990, 0.924) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
