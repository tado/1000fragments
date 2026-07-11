uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	p = rot2(time * -0.62) * p;
	vec2 z = p;
	vec2 c = vec2(-0.13 + 0.18 * sin(time * 1.18), -0.03 + 0.08 * cos(time * 0.88));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.57);
	vec3 col = palette(v * 3.48 * 0.44 + time * 0.04, vec3(0.49, 0.60, 0.53), vec3(0.41, 0.49, 0.38), vec3(0.84, 0.97, 0.86), vec3(0.55, 0.25, 0.26));
	col = clamp((col - 0.5) * 1.32 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
