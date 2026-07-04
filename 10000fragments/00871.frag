uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	vec2 z = p;
	vec2 c = vec2(-0.79 + 0.23 * sin(time * 0.86), -0.21 + 0.06 * cos(time * 1.36));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.09, -0.16)));
	}
	float v = exp(-trap * 1.67);
	vec3 col = vec3(0.25, 0.49, 0.41) * (0.20 / (abs(v * 1.67) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
