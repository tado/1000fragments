uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.90;
	vec2 z = p;
	vec2 c = vec2(0.04 + 0.13 * sin(time * 1.22), -0.49 + 0.06 * cos(time * 0.66));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.16, -0.35)));
	}
	float v = exp(-trap * 5.47);
	vec3 col = vec3(0.66, 0.70, 0.59) * (0.08 / (abs(v * 1.51) + 0.03));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.51 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
