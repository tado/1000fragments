uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.84;
	vec2 z = p;
	vec2 c = vec2(-0.08 + 0.16 * sin(time * 0.57), 0.21 + 0.14 * cos(time * 0.62));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.30);
	vec3 col = palette(v * 1.98 * 0.67 + time * 0.32, vec3(0.45, 0.47, 0.43), vec3(0.34, 0.39, 0.47), vec3(1.15, 0.94, 1.05), vec3(0.87, 0.21, 0.27));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
