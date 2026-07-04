uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	p = rot2(time * 0.43) * p;
	vec2 z = p;
	vec2 c = vec2(-0.07 + 0.07 * sin(time * 1.85), -0.54 + 0.27 * cos(time * 0.97));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.12, 0.30)));
	}
	float v = exp(-trap * 5.72);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.64 * 4.50 + time * 0.27);
	col = clamp((col - 0.5) * 1.91 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
