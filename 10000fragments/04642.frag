uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	p = rot2(time * -1.33) * p;
	vec2 z = p;
	vec2 c = vec2(-0.11 + 0.09 * sin(time * 0.83), -0.52 + 0.09 * cos(time * 1.18));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.90);
	vec3 col = palette(v * 2.96 * 0.87 + time * 0.01, vec3(0.46, 0.54, 0.59), vec3(0.44, 0.44, 0.44), vec3(0.95, 0.78, 0.93), vec3(0.04, 0.40, 1.00));
	col = clamp((col - 0.5) * 1.79 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
