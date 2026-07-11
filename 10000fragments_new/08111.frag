uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	p = rot2(time * 0.65) * p;
	vec2 z = p;
	vec2 c = vec2(-0.41 + 0.30 * sin(time * 1.29), 0.44 + 0.18 * cos(time * 1.42));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.66);
	vec3 col = palette(v * 1.87 * 0.43 + time * 0.38, vec3(0.54, 0.42, 0.44), vec3(0.31, 0.39, 0.43), vec3(0.73, 0.74, 1.36), vec3(0.24, 0.22, 0.52));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.60 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
