uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.80;
	vec2 z = p;
	vec2 c = vec2(-0.33 + 0.15 * sin(time * 0.72), -0.45 + 0.11 * cos(time * 0.59));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.86);
	vec3 col = vec3(0.65, 0.28, 0.49) * (0.21 / (abs(v * 2.90) + 0.06));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
