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
	p *= 2.43;
	float acc = 0.0;
	for(int ri = 0; ri < 14; ri++){
		float fi = float(ri);
		float cyc = time * 0.56 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.95;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.82) * 23.81) * (1.0 - age) * exp(-dist * 1.27);
	}
	vec3 col = palette(acc * 0.44 + time * 0.18, vec3(0.56, 0.47, 0.57), vec3(0.32, 0.37, 0.35), vec3(1.38, 0.72, 1.13), vec3(0.44, 0.33, 0.33));
	col *= 0.82 + 0.17 * sin(gl_FragCoord.y * 2.08 + time * 5.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
