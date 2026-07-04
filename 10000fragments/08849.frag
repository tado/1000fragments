uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.90;
	vec2 z = p;
	vec2 c = vec2(-0.37 + 0.08 * sin(time * 1.25), 0.05 + 0.11 * cos(time * 0.85));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.18, 0.05)));
	}
	float v = exp(-trap * 4.83);
	vec3 col = palette(v * 2.58 * 1.34 + time * 0.19, vec3(0.45, 0.50, 0.52), vec3(0.48, 0.32, 0.30), vec3(0.76, 0.75, 1.28), vec3(0.07, 0.02, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
