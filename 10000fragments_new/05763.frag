uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.09;
	p = rot2(time * 0.38) * p;
	vec2 z = p;
	vec2 c = vec2(-0.87 + 0.22 * sin(time * 1.91), -0.31 + 0.22 * cos(time * 1.17));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.57);
	vec3 col = palette(v * 2.43 * 0.76 + time * 0.31, vec3(0.45, 0.52, 0.58), vec3(0.31, 0.39, 0.45), vec3(1.31, 1.10, 0.98), vec3(0.27, 0.11, 0.80));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
