uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.12;
	p = rot2(time * -1.41) * p;
	vec2 z = p;
	vec2 c = vec2(-0.54 + 0.13 * sin(time * 1.73), 0.53 + 0.20 * cos(time * 0.46));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.20, -0.11)));
	}
	float v = exp(-trap * 5.15);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.53 * 3.58 + time * 0.34);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
