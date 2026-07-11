uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.26;
	vec2 z = p;
	vec2 c = vec2(0.08 + 0.15 * sin((time * 0.69) * 1.57), 0.25 + 0.10 * cos((time * 0.69) * 0.51));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.72);
	float cc = clamp(0.5 + 0.5 * (v * 2.49), 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.09, 0.15), vec3(0.56, 0.68, 0.69), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.62 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(1.024, 0.954, 0.997) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
