uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.78;
	p = rot2(time * -0.58) * p;
	vec2 z = p;
	vec2 c = vec2(-0.35 + 0.13 * sin(time * 1.27), -0.45 + 0.29 * cos(time * 1.30));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 1.81);
	vec3 col = vec3(0.71, 0.54, 0.85) * (0.25 / (abs(v * 2.91) + 0.06));
	col = col / (1.0 + col);
	col = mod(col * 2.05, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
