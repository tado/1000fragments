uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	vec2 z = p;
	vec2 c = vec2(-0.76 + 0.28 * sin(time * 1.01), -0.25 + 0.22 * cos(time * 1.56));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.12, -0.39)));
	}
	float v = exp(-trap * 1.96);
	vec3 col = vec3(0.5 + 0.5 * v * 1.77) * vec3(1.50, 1.32, 1.10) + vec3(0.01, 0.15, 0.21);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
