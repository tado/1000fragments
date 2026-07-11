uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	vec2 z = p;
	vec2 c = vec2(-0.61 + 0.22 * sin(time * 0.84), -0.50 + 0.29 * cos(time * 0.92));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.07);
	vec3 col = palette(v * 2.69 * 0.76 + time * 0.33, vec3(0.50, 0.56, 0.52), vec3(0.45, 0.35, 0.31), vec3(1.28, 1.02, 0.98), vec3(0.27, 0.54, 0.40));
	col = fract(col * 2.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
