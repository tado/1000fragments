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
	p = rot2(time * -0.84) * p;
	vec2 z = p;
	vec2 c = vec2(-0.43 + 0.08 * sin(time * 0.81), -0.07 + 0.06 * cos(time * 0.81));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.59);
	vec3 col = palette(v * 1.71 * 0.95 + time * 0.17, vec3(0.46, 0.57, 0.50), vec3(0.49, 0.47, 0.31), vec3(0.76, 0.78, 1.00), vec3(0.03, 0.51, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
