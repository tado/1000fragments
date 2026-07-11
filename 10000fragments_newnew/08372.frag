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
	float acc = 0.0;
	for(int ri = 0; ri < 6; ri++){
		float fi = float(ri);
		float cyc = time * 0.35 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.63;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.34) * 9.39) * (1.0 - age) * exp(-dist * 0.74);
	}
	vec3 col = palette(acc * 0.50 + time * 0.26, vec3(0.49, 0.46, 0.59), vec3(0.41, 0.43, 0.38), vec3(1.21, 0.96, 1.10), vec3(0.90, 0.00, 0.01));
	col *= 0.90 + 0.11 * sin(gl_FragCoord.y * 1.63 + time * 17.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
