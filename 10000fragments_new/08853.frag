uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	p = rot2(time * 0.49) * p;
	vec2 z = p;
	vec2 c = vec2(-0.29 + 0.15 * sin(time * 1.96), -0.54 + 0.29 * cos(time * 1.32));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.34);
	vec3 col = palette(v * 3.00 * 1.22 + time * 0.06, vec3(0.49, 0.51, 0.55), vec3(0.32, 0.48, 0.46), vec3(0.99, 0.93, 0.74), vec3(0.75, 0.84, 0.51));
	col = clamp((col - 0.5) * 1.43 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
