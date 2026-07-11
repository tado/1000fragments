uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	p = rot2(time * 1.34) * p;
	vec2 z = p;
	vec2 c = vec2(-0.67 + 0.19 * sin(time * 1.11), -0.25 + 0.08 * cos(time * 0.90));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.50);
	vec3 col = palette(v * 3.81 * 0.43 + time * 0.09, vec3(0.57, 0.55, 0.59), vec3(0.35, 0.45, 0.32), vec3(1.04, 0.97, 1.21), vec3(1.00, 0.23, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
