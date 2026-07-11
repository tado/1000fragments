uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	vec2 z = p;
	vec2 c = vec2(0.06 + 0.25 * sin(time * 1.48), 0.48 + 0.27 * cos(time * 1.00));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.03, -0.49)));
	}
	float v = exp(-trap * 2.01);
	vec3 col = palette(v * 1.82 * 0.99 + time * 0.11, vec3(0.43, 0.45, 0.40), vec3(0.34, 0.37, 0.48), vec3(0.79, 0.89, 1.11), vec3(0.08, 0.17, 0.81));
	col = fract(col * 1.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
