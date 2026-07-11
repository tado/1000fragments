uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	vec2 z = p;
	vec2 c = vec2(-0.40 + 0.15 * sin(time * 1.81), -0.35 + 0.13 * cos(time * 0.59));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.41, -0.33)));
	}
	float v = exp(-trap * 4.81);
	vec3 col = vec3(0.44, 0.57, 0.48) * (0.22 / (abs(v * 3.01) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
