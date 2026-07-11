uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.42;
	p = p.yx;
	p *= 1.11;
	vec2 z = p;
	vec2 c = vec2(-0.14 + 0.23 * sin((time * 0.52) * 1.97), 0.37 + 0.13 * cos((time * 0.52) * 1.46));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.18);
	vec3 col = vec3(0.5 + 0.5 * (v * 1.93)) * vec3(0.53, 0.57, 0.63) + vec3(0.04, 0.03, 0.08);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.56));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(0.965, 1.018, 0.958) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
