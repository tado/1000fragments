uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	p = rot2(time * -0.37) * p;
	vec2 z = p;
	vec2 c = vec2(-0.65 + 0.21 * sin(time * 0.57), -0.24 + 0.08 * cos(time * 0.74));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.36);
	vec3 col = palette(v * 1.66 * 0.90 + time * 0.24, vec3(0.60, 0.55, 0.46), vec3(0.42, 0.45, 0.45), vec3(0.99, 0.80, 0.96), vec3(0.35, 0.53, 0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
