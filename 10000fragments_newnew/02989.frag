uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.33;
	float acc = 0.0;
	for(int ri = 0; ri < 10; ri++){
		float fi = float(ri);
		float cyc = time * 0.81 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.28;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.94) * 12.83) * (1.0 - age) * exp(-dist * 0.86);
	}
	vec3 col = palette(acc * 1.10 + time * 0.01, vec3(0.45, 0.50, 0.42), vec3(0.43, 0.50, 0.42), vec3(1.27, 0.84, 1.02), vec3(0.72, 0.75, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
