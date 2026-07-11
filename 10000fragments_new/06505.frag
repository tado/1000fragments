uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	p = rot2(time * -0.85) * p;
	vec2 z = p;
	vec2 c = vec2(-0.87 + 0.24 * sin(time * 0.57), 0.04 + 0.20 * cos(time * 1.36));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.38, -0.30)));
	}
	float v = exp(-trap * 5.96);
	float cc = clamp(0.5 + 0.5 * v * 3.74, 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.36, 0.32), vec3(0.85, 0.55, 0.85), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
