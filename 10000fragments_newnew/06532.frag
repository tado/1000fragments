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
	for(int ri = 0; ri < 10; ri++){
		float fi = float(ri);
		float cyc = time * 0.78 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.33;
		float dist = length(p - dp);
		acc += sin((dist - age * 0.97) * 15.17) * (1.0 - age) * exp(-dist * 1.42);
	}
	vec3 col = palette(acc * 1.24 + time * 0.27, vec3(0.41, 0.55, 0.41), vec3(0.31, 0.35, 0.40), vec3(0.81, 1.34, 0.75), vec3(0.28, 0.65, 0.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
