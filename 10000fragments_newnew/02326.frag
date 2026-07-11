uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.44;
	p = rot2(time * 1.05) * p;
	vec2 z = p;
	vec2 c = vec2(-0.15 + 0.13 * sin(time * 0.74), -0.57 + 0.09 * cos(time * 1.52));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 1.50);
	vec3 col = palette(v * 3.68 * 1.21 + time * 0.40, vec3(0.47, 0.55, 0.48), vec3(0.50, 0.50, 0.44), vec3(1.29, 0.98, 0.75), vec3(0.48, 0.54, 0.70));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
