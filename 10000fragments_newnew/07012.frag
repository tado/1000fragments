uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	vec2 z = p;
	vec2 c = vec2(-0.31 + 0.10 * sin(time * 1.40), 0.30 + 0.14 * cos(time * 0.67));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.39, 0.15)));
	}
	float v = exp(-trap * 5.44);
	vec3 col = palette(v * 1.71 * 0.64 + time * 0.19, vec3(0.52, 0.56, 0.48), vec3(0.35, 0.35, 0.48), vec3(0.76, 1.25, 1.13), vec3(0.49, 0.08, 0.81));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
