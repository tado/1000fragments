uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	vec2 z = p;
	vec2 c = vec2(0.02 + 0.22 * sin(time * 1.28), 0.12 + 0.09 * cos(time * 0.64));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.06, 0.27)));
	}
	float v = exp(-trap * 5.45);
	vec3 col = vec3(0.55, 0.28, 0.26) * (0.22 / (abs(v * 2.62) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
