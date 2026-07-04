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
	p *= 2.59;
	float acc = 0.0;
	for(int ri = 0; ri < 8; ri++){
		float fi = float(ri);
		float cyc = time * 0.52 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.30;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.79) * 9.60) * (1.0 - age) * exp(-dist * 1.20);
	}
	vec3 col = palette(acc * 1.26 + time * 0.20, vec3(0.57, 0.57, 0.55), vec3(0.50, 0.31, 0.46), vec3(0.85, 1.04, 1.40), vec3(0.65, 0.89, 0.66));
	col = mod(col * 2.37, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
