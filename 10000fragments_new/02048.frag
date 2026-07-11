uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	vec2 z = p;
	vec2 c = vec2(-0.76 + 0.09 * sin(time * 0.62), 0.02 + 0.19 * cos(time * 1.14));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.39, -0.09)));
	}
	float v = exp(-trap * 2.60);
	vec3 col = vec3(0.50, 0.90, 0.26) * (0.20 / (abs(v * 2.64) + 0.02));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
