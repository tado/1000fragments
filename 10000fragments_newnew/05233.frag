uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	p = rot2(time * -0.96) * p;
	vec2 z = p;
	vec2 c = vec2(-0.46 + 0.26 * sin(time * 1.30), -0.08 + 0.28 * cos(time * 1.04));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.29);
	vec3 col = vec3(0.75, 0.53, 0.42) * (0.10 / (abs(v * 1.81) + 0.06));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
