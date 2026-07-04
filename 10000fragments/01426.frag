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
	float acc = 0.0;
	for(int ri = 0; ri < 13; ri++){
		float fi = float(ri);
		float cyc = time * 0.51 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.82;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.78) * 10.11) * (1.0 - age) * exp(-dist * 1.12);
	}
	vec3 col = palette(acc * 1.38 + time * 0.17, vec3(0.57, 0.54, 0.41), vec3(0.43, 0.35, 0.34), vec3(1.00, 1.22, 0.90), vec3(0.55, 0.26, 0.92));
	col *= 0.80 + 0.16 * sin(gl_FragCoord.y * 2.18 + time * 6.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
