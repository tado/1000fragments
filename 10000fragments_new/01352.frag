uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	vec2 z = p;
	vec2 c = vec2(-0.26 + 0.07 * sin(time * 1.73), 0.42 + 0.19 * cos(time * 0.75));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 1.78);
	vec3 col = palette(v * 2.82 * 0.78 + time * 0.07, vec3(0.41, 0.49, 0.58), vec3(0.50, 0.37, 0.38), vec3(0.93, 1.16, 1.36), vec3(0.03, 0.66, 0.75));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.85 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
