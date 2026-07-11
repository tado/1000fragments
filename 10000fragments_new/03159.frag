uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	vec2 z = p;
	vec2 c = vec2(-0.56 + 0.15 * sin(time * 1.28), -0.54 + 0.13 * cos(time * 1.41));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.60);
	vec3 col = palette(v * 3.90 * 0.75 + time * 0.18, vec3(0.40, 0.54, 0.50), vec3(0.38, 0.41, 0.34), vec3(1.40, 1.20, 0.93), vec3(0.56, 0.15, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
