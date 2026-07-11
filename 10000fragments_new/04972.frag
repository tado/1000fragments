uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	p = rot2(time * 0.52) * p;
	vec2 z = p;
	vec2 c = vec2(-0.86 + 0.16 * sin(time * 0.84), -0.47 + 0.09 * cos(time * 1.06));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.14);
	vec3 col = vec3(0.35, 0.44, 1.00) * (0.22 / (abs(v * 3.22) + 0.09));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
