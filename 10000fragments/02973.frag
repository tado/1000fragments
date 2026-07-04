uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	vec2 z = p;
	vec2 c = vec2(-0.81 + 0.12 * sin(time * 1.40), -0.18 + 0.09 * cos(time * 1.42));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.19);
	vec3 col = vec3(0.32, 0.90, 0.57) * (0.09 / (abs(v * 2.62) + 0.03));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
