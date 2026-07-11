uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	p = rot2(time * -1.39) * p;
	vec2 z = p;
	vec2 c = vec2(-0.85 + 0.08 * sin(time * 1.43), 0.44 + 0.09 * cos(time * 1.39));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.49);
	float cc = clamp(0.5 + 0.5 * v * 2.45, 0.0, 1.0);
	vec3 col = mix(vec3(0.05, 0.05, 0.52), vec3(0.94, 0.73, 0.51), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
