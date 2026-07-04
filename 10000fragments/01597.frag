uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	vec2 z = p;
	vec2 c = vec2(-0.06 + 0.13 * sin(time * 1.72), 0.49 + 0.12 * cos(time * 0.94));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.11, -0.42)));
	}
	float v = exp(-trap * 1.97);
	vec3 col = palette(v * 3.74 * 0.47 + time * 0.12, vec3(0.44, 0.52, 0.48), vec3(0.44, 0.30, 0.42), vec3(1.00, 1.32, 1.08), vec3(0.50, 0.70, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
