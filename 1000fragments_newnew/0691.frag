uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	vec2 z = p;
	vec2 c = vec2(-0.22 + 0.22 * sin((time * 0.53) * 1.76), -0.23 + 0.20 * cos((time * 0.53) * 1.41));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.32);
	float cc = clamp(0.5 + 0.5 * (v * 3.61), 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.20, 0.15), vec3(0.36, 0.48, 0.51), smoothstep(0.0, 1.0, cc));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.33));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.968, 1.023, 0.958) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
