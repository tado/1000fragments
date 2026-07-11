uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.58;
	p = rot2(time * 0.75) * p;
	vec2 z = p;
	vec2 c = vec2(-0.42 + 0.22 * sin(time * 1.01), 0.46 + 0.18 * cos(time * 0.48));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.20);
	vec3 col = palette(v * 3.63 * 1.47 + time * 0.04, vec3(0.55, 0.53, 0.46), vec3(0.34, 0.44, 0.32), vec3(1.30, 1.07, 0.93), vec3(0.52, 0.92, 0.55));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
