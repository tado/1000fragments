uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	vec2 z = p;
	vec2 c = vec2(-0.21 + 0.06 * sin(time * 1.89), 0.33 + 0.07 * cos(time * 1.40));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.26, 0.25)));
	}
	float v = exp(-trap * 4.66);
	vec3 col = palette(v * 1.89 * 0.69 + time * 0.21, vec3(0.54, 0.60, 0.44), vec3(0.31, 0.45, 0.36), vec3(1.07, 1.28, 1.29), vec3(0.95, 1.00, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
