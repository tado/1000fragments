uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.02;
	p = rot2(time * -1.53) * p;
	vec2 z = p;
	vec2 c = vec2(-0.25 + 0.28 * sin(time * 1.17), 0.41 + 0.27 * cos(time * 1.16));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.14, 0.04)));
	}
	float v = exp(-trap * 4.27);
	float cc = clamp(0.5 + 0.5 * v * 2.54, 0.0, 1.0);
	vec3 col = mix(vec3(0.12, 0.29, 0.27), vec3(0.81, 0.89, 0.52), cc);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
