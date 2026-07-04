uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	p = rot2(time * -0.34) * p;
	vec2 z = p;
	vec2 c = vec2(-0.14 + 0.16 * sin(time * 1.05), 0.41 + 0.06 * cos(time * 1.30));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.86);
	vec3 col = palette(v * 2.52 * 0.66 + time * 0.23, vec3(0.41, 0.59, 0.41), vec3(0.46, 0.42, 0.31), vec3(1.33, 0.98, 0.97), vec3(0.23, 0.58, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
