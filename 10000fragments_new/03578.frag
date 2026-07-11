uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.02;
	p = rot2(time * -1.48) * p;
	vec2 z = p;
	vec2 c = vec2(-0.79 + 0.26 * sin(time * 1.81), -0.29 + 0.10 * cos(time * 1.20));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.74);
	float cc = clamp(0.5 + 0.5 * v * 1.58, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.11, 0.42), vec3(0.82, 0.97, 0.48), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
