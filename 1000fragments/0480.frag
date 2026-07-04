uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	vec2 z = p;
	vec2 c = vec2(0.20 + 0.23 * sin(time * 1.91), -0.52 + 0.09 * cos(time * 1.18));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.82);
	vec3 col = palette(v * 3.22 * 0.99 + time * 0.02, vec3(0.54, 0.49, 0.42), vec3(0.36, 0.33, 0.45), vec3(0.81, 1.37, 1.00), vec3(0.22, 0.30, 0.44));
	col = mod(col * 2.67, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
