uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	p = rot2(time * 0.44) * p;
	vec2 z = p;
	vec2 c = vec2(0.27 + 0.06 * sin(time * 1.48), -0.33 + 0.16 * cos(time * 1.21));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.92);
	vec3 col = palette(v * 1.56 * 1.01 + time * 0.00, vec3(0.41, 0.50, 0.43), vec3(0.39, 0.50, 0.38), vec3(1.02, 1.07, 1.14), vec3(0.86, 0.10, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
