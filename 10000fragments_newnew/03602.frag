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
	p *= 1.33;
	float acc = 0.0;
	for(int ri = 0; ri < 11; ri++){
		float fi = float(ri);
		float cyc = time * 0.43 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.76;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.33) * 18.43) * (1.0 - age) * exp(-dist * 1.21);
	}
	vec3 col = palette(acc * 0.96 + time * 0.03, vec3(0.47, 0.56, 0.42), vec3(0.47, 0.46, 0.44), vec3(1.01, 0.82, 1.36), vec3(0.98, 0.23, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
