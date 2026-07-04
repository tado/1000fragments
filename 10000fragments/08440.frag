uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.60;
	p = rot2(time * -1.47) * p;
	vec2 z = p;
	vec2 c = vec2(-0.66 + 0.24 * sin(time * 0.68), -0.33 + 0.18 * cos(time * 1.18));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.77);
	vec3 col = palette(v * 1.68 * 1.41 + time * 0.35, vec3(0.45, 0.44, 0.46), vec3(0.49, 0.42, 0.49), vec3(1.28, 1.27, 1.03), vec3(0.87, 0.95, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
