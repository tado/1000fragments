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
	vec2 c = vec2(-0.34 + 0.13 * sin(time * 1.54), -0.09 + 0.26 * cos(time * 1.40));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.35, -0.08)));
	}
	float v = exp(-trap * 2.45);
	vec3 col = palette(v * 3.15 * 0.52 + time * 0.16, vec3(0.42, 0.42, 0.55), vec3(0.40, 0.47, 0.43), vec3(1.37, 1.00, 1.21), vec3(0.32, 0.71, 0.04));
	col = fract(col * 1.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
