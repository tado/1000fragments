uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	vec2 z = p;
	vec2 c = vec2(-0.49 + 0.07 * sin(time * 1.09), 0.40 + 0.21 * cos(time * 1.53));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.88);
	float cc = clamp(0.5 + 0.5 * v * 1.58, 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.25, 0.28), vec3(0.90, 0.60, 0.92), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
