uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	vec2 z = p;
	vec2 c = vec2(-0.89 + 0.24 * sin(time * 1.51), -0.44 + 0.28 * cos(time * 1.05));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 1.66);
	vec3 col = palette(v * 3.45 * 0.78 + time * 0.19, vec3(0.50, 0.45, 0.50), vec3(0.48, 0.47, 0.42), vec3(0.99, 0.97, 0.82), vec3(0.08, 0.59, 0.71));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.02 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
