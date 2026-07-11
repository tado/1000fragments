uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	vec2 z = p;
	vec2 c = vec2(-0.69 + 0.18 * sin(time * 1.34), -0.42 + 0.26 * cos(time * 1.31));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.35, -0.27)));
	}
	float v = exp(-trap * 4.88);
	float cc = clamp(0.5 + 0.5 * v * 3.97, 0.0, 1.0);
	vec3 col = mix(vec3(0.38, 0.12, 0.47), vec3(0.93, 0.92, 0.76), cc);
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
