uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	p = rot2(time * -0.95) * p;
	vec2 z = p;
	vec2 c = vec2(0.05 + 0.06 * sin(time * 1.27), 0.45 + 0.09 * cos(time * 0.81));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.56);
	vec3 col = palette(v * 2.88 * 1.36 + time * 0.14, vec3(0.47, 0.42, 0.52), vec3(0.30, 0.39, 0.47), vec3(1.20, 1.09, 1.27), vec3(0.47, 0.05, 0.05));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
