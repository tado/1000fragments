uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.02;
	vec2 z = p;
	vec2 c = vec2(-0.25 + 0.12 * sin(time * 1.65), 0.46 + 0.22 * cos(time * 1.15));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.43, 0.10)));
	}
	float v = exp(-trap * 4.71);
	vec3 col = vec3(0.60, 0.50, 0.67) * (0.06 / (abs(v * 1.88) + 0.06));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
