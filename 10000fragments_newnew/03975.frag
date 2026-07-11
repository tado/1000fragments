uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	p = rot2(time * -0.74) * p;
	vec2 z = p;
	vec2 c = vec2(-0.38 + 0.07 * sin(time * 1.45), -0.25 + 0.10 * cos(time * 0.81));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.77);
	vec3 col = palette(v * 3.98 * 0.70 + time * 0.06, vec3(0.57, 0.58, 0.52), vec3(0.49, 0.34, 0.47), vec3(1.32, 1.31, 1.19), vec3(0.06, 0.85, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
