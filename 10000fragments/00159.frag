uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	vec2 z = p;
	vec2 c = vec2(-0.02 + 0.18 * sin(time * 0.56), -0.56 + 0.26 * cos(time * 1.36));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.63);
	vec3 col = palette(v * 2.77 * 0.68 + time * 0.00, vec3(0.51, 0.60, 0.58), vec3(0.34, 0.36, 0.43), vec3(1.32, 1.11, 1.08), vec3(0.62, 0.74, 0.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
