uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	p = rot2(time * -1.44) * p;
	vec2 z = p;
	vec2 c = vec2(-0.15 + 0.30 * sin(time * 1.65), -0.57 + 0.06 * cos(time * 1.52));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.86);
	float cc = clamp(0.5 + 0.5 * v * 2.55, 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.22, 0.11), vec3(0.96, 0.76, 0.83), cc);
	col = mod(col * 2.01, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
