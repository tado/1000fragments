uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	vec2 z = p;
	vec2 c = vec2(0.24 + 0.06 * sin(time * 1.91), -0.14 + 0.19 * cos(time * 1.35));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.02);
	float cc = clamp(0.5 + 0.5 * v * 3.37, 0.0, 1.0);
	vec3 col = mix(vec3(0.39, 0.30, 0.32), vec3(0.97, 0.89, 0.57), cc);
	col = clamp((col - 0.5) * 1.57 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
