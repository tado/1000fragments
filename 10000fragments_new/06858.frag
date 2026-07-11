uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	vec2 z = p;
	vec2 c = vec2(0.03 + 0.24 * sin(time * 1.52), 0.15 + 0.30 * cos(time * 1.39));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 1.82);
	vec3 col = palette(v * 1.62 * 0.76 + time * 0.03, vec3(0.54, 0.56, 0.59), vec3(0.48, 0.50, 0.34), vec3(0.86, 1.20, 0.88), vec3(0.19, 0.31, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
