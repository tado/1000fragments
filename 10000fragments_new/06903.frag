uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	p = rot2(time * 0.52) * p;
	vec2 z = p;
	vec2 c = vec2(-0.70 + 0.16 * sin(time * 1.85), 0.48 + 0.16 * cos(time * 0.42));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.48);
	vec3 col = palette(v * 1.75 * 1.40 + time * 0.16, vec3(0.54, 0.56, 0.54), vec3(0.34, 0.50, 0.35), vec3(1.14, 0.87, 1.29), vec3(0.10, 0.52, 0.36));
	col *= 0.80 + 0.19 * sin(gl_FragCoord.y * 0.87 + time * 14.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
