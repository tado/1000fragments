uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	vec2 z = p;
	vec2 c = vec2(-0.07 + 0.18 * sin((time * 0.66) * 0.86), 0.22 + 0.20 * cos((time * 0.66) * 1.32));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.56);
	vec3 col = vec3(0.5 + 0.5 * (v * 3.07)) * vec3(0.72, 0.56, 0.59) + vec3(0.08, 0.06, 0.06);
	col = clamp((col - 0.5) * 1.85 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(0.986, 1.020, 0.954) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
