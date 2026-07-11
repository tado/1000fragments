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
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.46;
	float acc = 0.0;
	for(int ri = 0; ri < 8; ri++){
		float fi = float(ri);
		float cyc = time * 0.53 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.69;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.10) * 10.60) * (1.0 - age) * exp(-dist * 0.91);
	}
	vec3 col = palette(acc * 1.47 + time * 0.25, vec3(0.45, 0.43, 0.54), vec3(0.43, 0.44, 0.33), vec3(0.80, 1.26, 1.18), vec3(0.52, 0.63, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
