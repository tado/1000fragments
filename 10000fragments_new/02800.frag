uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.12;
	p = rot2(time * -0.71) * p;
	vec2 z = p;
	vec2 c = vec2(-0.86 + 0.15 * sin(time * 0.95), -0.36 + 0.08 * cos(time * 1.31));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.21, -0.43)));
	}
	float v = exp(-trap * 2.33);
	vec3 col = palette(v * 3.18 * 1.45 + time * 0.30, vec3(0.53, 0.48, 0.45), vec3(0.40, 0.40, 0.37), vec3(1.04, 1.02, 1.07), vec3(0.48, 0.68, 0.21));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
