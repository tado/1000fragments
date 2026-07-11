uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.41;
	p = rot2(time * -1.40) * p;
	vec2 z = p;
	vec2 c = vec2(-0.69 + 0.16 * sin(time * 1.76), -0.13 + 0.05 * cos(time * 0.66));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.16);
	float cc = clamp(0.5 + 0.5 * v * 2.30, 0.0, 1.0);
	vec3 col = mix(vec3(0.34, 0.06, 0.23), vec3(0.56, 0.69, 0.46), cc);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
