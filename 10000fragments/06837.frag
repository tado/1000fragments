uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	vec2 z = p;
	vec2 c = vec2(-0.66 + 0.10 * sin(time * 1.27), -0.53 + 0.29 * cos(time * 1.59));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.06);
	vec3 col = palette(v * 3.43 * 0.66 + time * 0.06, vec3(0.48, 0.56, 0.46), vec3(0.34, 0.31, 0.37), vec3(0.93, 1.19, 1.30), vec3(0.90, 0.89, 0.04));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
