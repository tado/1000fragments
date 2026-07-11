uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	vec2 z = p;
	vec2 c = vec2(-0.22 + 0.24 * sin(time * 0.52), 0.56 + 0.09 * cos(time * 1.27));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.19);
	float cc = clamp(0.5 + 0.5 * v * 2.61, 0.0, 1.0);
	vec3 col = mix(vec3(0.02, 0.24, 0.15), vec3(0.95, 0.83, 1.00), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
