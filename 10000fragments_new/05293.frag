uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.63;
	p = rot2(time * 0.97) * p;
	vec2 z = p;
	vec2 c = vec2(-0.23 + 0.22 * sin(time * 0.78), 0.35 + 0.08 * cos(time * 0.56));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.22);
	vec3 col = palette(v * 3.02 * 0.95 + time * 0.20, vec3(0.53, 0.52, 0.50), vec3(0.34, 0.36, 0.31), vec3(1.29, 1.38, 0.76), vec3(0.64, 0.72, 0.51));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
