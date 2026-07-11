uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	p = rot2(time * -1.58) * p;
	vec2 z = p;
	vec2 c = vec2(-0.86 + 0.18 * sin(time * 1.18), -0.03 + 0.06 * cos(time * 1.34));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.48, -0.07)));
	}
	float v = exp(-trap * 1.61);
	vec3 col = vec3(0.23, 0.99, 0.38) * (0.14 / (abs(v * 2.88) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
