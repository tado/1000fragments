uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.40;
	vec2 z = p;
	vec2 c = vec2(-0.43 + 0.06 * sin(time * 1.54), -0.36 + 0.22 * cos(time * 1.45));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.00);
	vec3 col = vec3(0.40, 0.97, 0.55) * (0.13 / (abs(v * 3.07) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
