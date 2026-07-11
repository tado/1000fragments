uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.25;
	p = rot2(time * 1.38) * p;
	vec2 z = p;
	vec2 c = vec2(-0.39 + 0.24 * sin(time * 1.45), -0.51 + 0.24 * cos(time * 0.72));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.21, -0.42)));
	}
	float v = exp(-trap * 5.34);
	vec3 col = palette(v * 1.78 * 1.34 + time * 0.39, vec3(0.44, 0.57, 0.43), vec3(0.42, 0.48, 0.47), vec3(1.19, 1.35, 1.29), vec3(0.69, 0.24, 0.90));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
