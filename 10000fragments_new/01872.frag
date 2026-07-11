uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	vec2 z = p;
	vec2 c = vec2(-0.81 + 0.16 * sin(time * 1.99), 0.57 + 0.16 * cos(time * 1.10));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.20);
	vec3 col = vec3(0.5 + 0.5 * v * 2.83) * vec3(1.33, 0.80, 0.86) + vec3(0.13, 0.09, 0.21);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
