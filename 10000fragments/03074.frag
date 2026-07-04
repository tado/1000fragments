uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	vec2 z = p;
	vec2 c = vec2(-0.43 + 0.10 * sin(time * 1.22), -0.05 + 0.30 * cos(time * 1.35));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.39, -0.49)));
	}
	float v = exp(-trap * 5.20);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.33 * 4.52 + time * 0.29);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
