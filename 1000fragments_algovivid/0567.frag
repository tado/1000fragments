uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.94 + (time * 0.51) * 0.88) * 0.16;
	p += vec2(sin((time * 0.51) * 0.41), cos((time * 0.51) * 1.01)) * 0.24;
	p *= 1.38;
	vec2 z = p;
	vec2 c = vec2(-0.19 + 0.18 * sin((time * 0.51) * 0.96), 0.58 + 0.19 * cos((time * 0.51) * 0.46));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.65);
	float cc = clamp(0.5 + 0.5 * (v * 1.71), 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.33, 0.36), vec3(0.57, 0.43, 0.51), smoothstep(0.0, 1.0, cc));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.40));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col = clamp(col, 0.0, 1.0) * vec3(0.966, 1.013, 0.927) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
