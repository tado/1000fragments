uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	p = rot2(time * 0.35) * p;
	vec2 z = p;
	vec2 c = vec2(-0.47 + 0.20 * sin(time * 1.07), 0.22 + 0.25 * cos(time * 1.10));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.25, 0.22)));
	}
	float v = exp(-trap * 5.50);
	vec3 col = vec3(0.5 + 0.5 * v * 2.24) * vec3(0.52, 0.69, 0.87) + vec3(0.18, 0.20, 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
