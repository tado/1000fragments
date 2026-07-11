uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.90;
	vec2 z = p;
	vec2 c = vec2(0.05 + 0.14 * sin(time * 0.76), 0.58 + 0.21 * cos(time * 1.30));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 1.63);
	float cc = clamp(0.5 + 0.5 * v * 2.18, 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.32, 0.32), vec3(0.71, 0.80, 0.95), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
