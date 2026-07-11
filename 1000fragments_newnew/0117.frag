uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	vec2 z = p;
	vec2 c = vec2(-0.53 + 0.19 * sin((time * 0.74) * 0.81), -0.53 + 0.12 * cos((time * 0.74) * 1.29));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.37);
	float cc = clamp(0.5 + 0.5 * (v * 1.75), 0.0, 1.0);
	vec3 col = mix(vec3(0.05, 0.11, 0.13), vec3(0.77, 0.66, 0.73), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.24));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(1.007, 1.000, 0.981) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
