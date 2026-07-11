uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	p = rot2(time * -1.23) * p;
	vec2 z = p;
	vec2 c = vec2(-0.87 + 0.06 * sin(time * 1.14), 0.43 + 0.23 * cos(time * 0.81));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.04, -0.22)));
	}
	float v = exp(-trap * 2.91);
	vec3 col = palette(v * 1.63 * 0.61 + time * 0.28, vec3(0.59, 0.55, 0.59), vec3(0.37, 0.45, 0.36), vec3(0.85, 0.95, 1.22), vec3(0.34, 0.31, 0.28));
	col = fract(col * 1.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
