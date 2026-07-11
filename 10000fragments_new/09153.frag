uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	vec2 z = p;
	vec2 c = vec2(-0.11 + 0.18 * sin(time * 0.53), -0.29 + 0.24 * cos(time * 1.16));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.12);
	float cc = clamp(0.5 + 0.5 * v * 2.97, 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.35, 0.33), vec3(0.74, 0.65, 0.97), cc);
	col = fract(col * 1.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
