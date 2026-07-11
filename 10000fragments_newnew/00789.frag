uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	vec2 z = p;
	vec2 c = vec2(0.28 + 0.15 * sin(time * 1.39), 0.51 + 0.21 * cos(time * 1.10));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.40, -0.38)));
	}
	float v = exp(-trap * 1.69);
	vec3 col = palette(v * 2.61 * 1.26 + time * 0.22, vec3(0.45, 0.54, 0.52), vec3(0.49, 0.31, 0.36), vec3(0.90, 0.71, 1.16), vec3(0.99, 0.35, 0.50));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.88 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
