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
	vec2 c = vec2(-0.09 + 0.07 * sin(time * 1.50), -0.19 + 0.14 * cos(time * 0.56));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.25);
	vec3 col = palette(v * 1.85 * 1.01 + time * 0.05, vec3(0.59, 0.53, 0.57), vec3(0.43, 0.45, 0.45), vec3(0.92, 0.98, 1.26), vec3(0.78, 0.97, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
