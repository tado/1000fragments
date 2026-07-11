uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	vec2 z = p;
	vec2 c = vec2(0.25 + 0.16 * sin(time * 0.56), -0.55 + 0.16 * cos(time * 1.54));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.11);
	vec3 col = palette(v * 3.90 * 0.83 + time * 0.34, vec3(0.51, 0.48, 0.54), vec3(0.37, 0.48, 0.39), vec3(0.97, 1.28, 0.85), vec3(0.14, 1.00, 0.07));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.20 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
