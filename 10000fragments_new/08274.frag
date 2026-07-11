uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	vec2 z = p;
	vec2 c = vec2(-0.62 + 0.20 * sin(time * 0.89), 0.48 + 0.18 * cos(time * 0.56));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.38, -0.16)));
	}
	float v = exp(-trap * 2.81);
	float cc = clamp(0.5 + 0.5 * v * 1.89, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.14, 0.29), vec3(0.84, 0.76, 0.43), cc);
	col = mod(col * 2.09, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
