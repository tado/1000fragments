uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	p = rot2(time * -1.41) * p;
	vec2 z = p;
	vec2 c = vec2(-0.30 + 0.24 * sin(time * 1.68), 0.44 + 0.25 * cos(time * 1.32));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.45);
	vec3 col = palette(v * 2.38 * 0.92 + time * 0.06, vec3(0.56, 0.58, 0.59), vec3(0.37, 0.34, 0.45), vec3(0.76, 0.79, 1.09), vec3(0.96, 0.52, 0.65));
	col *= 0.86 + 0.11 * sin(gl_FragCoord.y * 2.17 + time * 5.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
