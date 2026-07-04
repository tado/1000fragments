uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	p = rot2(time * 1.07) * p;
	vec2 z = p;
	vec2 c = vec2(-0.06 + 0.19 * sin(time * 1.13), 0.51 + 0.12 * cos(time * 0.72));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.05);
	float cc = clamp(0.5 + 0.5 * v * 1.50, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.39, 0.08), vec3(0.75, 0.90, 0.76), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
