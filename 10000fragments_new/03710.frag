uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	vec2 z = p;
	vec2 c = vec2(-0.66 + 0.10 * sin(time * 1.22), 0.30 + 0.29 * cos(time * 1.41));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.15, 0.30)));
	}
	float v = exp(-trap * 1.83);
	vec3 col = vec3(0.5 + 0.5 * v * 1.62) * vec3(1.23, 0.82, 0.98) + vec3(0.18, 0.23, 0.12);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
