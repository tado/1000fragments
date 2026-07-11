uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.03;
	p = rot2(time * 1.28) * p;
	vec2 z = p;
	vec2 c = vec2(-0.56 + 0.19 * sin(time * 0.54), 0.43 + 0.26 * cos(time * 0.91));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.87);
	vec3 col = palette(v * 2.96 * 0.67 + time * 0.26, vec3(0.42, 0.55, 0.49), vec3(0.41, 0.48, 0.48), vec3(1.14, 1.01, 0.93), vec3(1.00, 0.14, 0.68));
	col *= 0.84 + 0.20 * sin(gl_FragCoord.y * 0.90 + time * 15.81);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
