uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	p = rot2(time * -1.20) * p;
	vec2 z = p;
	vec2 c = vec2(-0.48 + 0.25 * sin(time * 0.80), 0.09 + 0.18 * cos(time * 1.23));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.85);
	float cc = clamp(0.5 + 0.5 * v * 1.57, 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.32, 0.08), vec3(0.84, 0.95, 0.91), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
