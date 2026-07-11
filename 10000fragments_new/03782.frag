uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	vec2 z = p;
	vec2 c = vec2(-0.10 + 0.06 * sin(time * 1.43), -0.03 + 0.12 * cos(time * 1.23));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.53);
	vec3 col = palette(v * 2.39 * 0.91 + time * 0.20, vec3(0.46, 0.48, 0.42), vec3(0.41, 0.40, 0.44), vec3(1.40, 0.90, 1.20), vec3(0.91, 0.77, 0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
