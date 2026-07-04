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
	p = rot2(time * 0.72) * p;
	vec2 z = p;
	vec2 c = vec2(-0.25 + 0.28 * sin(time * 0.57), -0.11 + 0.12 * cos(time * 0.64));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.08);
	vec3 col = palette(v * 3.43 * 0.60 + time * 0.06, vec3(0.52, 0.52, 0.52), vec3(0.47, 0.45, 0.43), vec3(1.13, 1.02, 1.07), vec3(0.70, 0.15, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
