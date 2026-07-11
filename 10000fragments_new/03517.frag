uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	vec2 z = p;
	vec2 c = vec2(-0.82 + 0.27 * sin(time * 1.97), 0.59 + 0.13 * cos(time * 0.53));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.24, -0.43)));
	}
	float v = exp(-trap * 3.11);
	vec3 col = vec3(0.67, 0.51, 0.75) * (0.21 / (abs(v * 3.67) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
