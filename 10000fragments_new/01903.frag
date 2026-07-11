uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	p = rot2(time * -0.72) * p;
	vec2 z = p;
	vec2 c = vec2(-0.27 + 0.24 * sin(time * 0.59), 0.37 + 0.23 * cos(time * 1.30));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.45, 0.38)));
	}
	float v = exp(-trap * 4.51);
	vec3 col = palette(v * 3.45 * 1.41 + time * 0.14, vec3(0.58, 0.51, 0.55), vec3(0.34, 0.42, 0.42), vec3(0.72, 0.98, 0.80), vec3(0.21, 0.07, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
