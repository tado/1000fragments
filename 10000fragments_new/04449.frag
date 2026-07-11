uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	vec2 z = p;
	vec2 c = vec2(-0.43 + 0.06 * sin(time * 1.43), -0.48 + 0.07 * cos(time * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.52);
	vec3 col = palette(v * 3.94 * 0.84 + time * 0.37, vec3(0.55, 0.45, 0.44), vec3(0.34, 0.45, 0.34), vec3(0.80, 0.71, 1.01), vec3(0.90, 0.54, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
