uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.25;
	vec2 z = p;
	vec2 c = vec2(-0.17 + 0.18 * sin(time * 1.00), -0.34 + 0.09 * cos(time * 0.50));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.48, 0.45)));
	}
	float v = exp(-trap * 4.37);
	vec3 col = palette(v * 1.91 * 1.46 + time * 0.18, vec3(0.42, 0.53, 0.58), vec3(0.50, 0.33, 0.49), vec3(1.15, 1.00, 0.75), vec3(0.45, 0.32, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
