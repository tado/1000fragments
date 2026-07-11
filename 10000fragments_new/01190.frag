uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	p = rot2(time * 1.21) * p;
	vec2 z = p;
	vec2 c = vec2(-0.15 + 0.20 * sin(time * 1.16), 0.18 + 0.22 * cos(time * 1.53));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.45, 0.47)));
	}
	float v = exp(-trap * 5.43);
	vec3 col = palette(v * 1.94 * 0.64 + time * 0.06, vec3(0.52, 0.54, 0.45), vec3(0.42, 0.30, 0.40), vec3(1.06, 1.19, 0.86), vec3(0.08, 0.93, 0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
