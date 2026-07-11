uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	vec2 z = p;
	vec2 c = vec2(0.15 + 0.21 * sin(time * 1.27), 0.01 + 0.07 * cos(time * 0.97));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.19, 0.31)));
	}
	float v = exp(-trap * 3.88);
	vec3 col = vec3(0.5 + 0.5 * v * 3.81) * vec3(0.96, 1.25, 0.81) + vec3(0.06, 0.18, 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
