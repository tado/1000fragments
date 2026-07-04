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
	p = rot2(time * -1.34) * p;
	vec2 z = p;
	vec2 c = vec2(-0.43 + 0.11 * sin(time * 0.94), -0.52 + 0.30 * cos(time * 0.87));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.73);
	vec3 col = palette(v * 1.86 * 0.98 + time * 0.11, vec3(0.41, 0.53, 0.48), vec3(0.45, 0.48, 0.43), vec3(1.16, 0.84, 1.01), vec3(0.11, 0.27, 0.64));
	col *= 0.81 + 0.17 * sin(gl_FragCoord.y * 1.01 + time * 15.78);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
