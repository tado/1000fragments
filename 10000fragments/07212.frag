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
	p *= 1.23;
	float acc = 0.0;
	for(int ri = 0; ri < 11; ri++){
		float fi = float(ri);
		float cyc = time * 0.32 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.62;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.02) * 8.48) * (1.0 - age) * exp(-dist * 1.48);
	}
	vec3 col = palette(acc * 1.36 + time * 0.37, vec3(0.51, 0.47, 0.44), vec3(0.42, 0.35, 0.35), vec3(1.08, 0.76, 1.39), vec3(0.69, 0.40, 0.41));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
