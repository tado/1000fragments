uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	p = rot2(time * 1.02) * p;
	vec2 z = p;
	vec2 c = vec2(-0.56 + 0.06 * sin(time * 0.75), -0.56 + 0.29 * cos(time * 0.71));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.37);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.64 * 2.10 + time * 0.40);
	col *= 0.85 + 0.13 * sin(gl_FragCoord.y * 2.18 + time * 6.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
