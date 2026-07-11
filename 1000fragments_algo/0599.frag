uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.97;
	vec2 z = p;
	vec2 c = vec2(-0.48 + 0.28 * sin((time * 0.67) * 1.88), 0.45 + 0.13 * cos((time * 0.67) * 0.81));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 1.77);
	float cc = clamp(0.5 + 0.5 * (v * 3.12), 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.30, 0.11), vec3(0.59, 0.60, 0.52), smoothstep(0.0, 1.0, cc));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.917, 0.994, 1.044) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
