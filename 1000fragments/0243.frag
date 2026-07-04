uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.02;
	p = rot2(time * -0.64) * p;
	vec2 z = p;
	vec2 c = vec2(-0.87 + 0.30 * sin(time * 0.60), 0.58 + 0.13 * cos(time * 1.31));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.60);
	vec3 col = palette(v * 2.93 * 1.15 + time * 0.24, vec3(0.60, 0.50, 0.44), vec3(0.45, 0.34, 0.31), vec3(1.25, 0.73, 0.79), vec3(0.06, 0.69, 0.72));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.40 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
