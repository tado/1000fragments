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
	for(int ri = 0; ri < 8; ri++){
		float fi = float(ri);
		float cyc = time * 0.75 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.61;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.06) * 17.27) * (1.0 - age) * exp(-dist * 0.94);
	}
	vec3 col = palette(acc * 1.50 + time * 0.18, vec3(0.43, 0.54, 0.44), vec3(0.43, 0.44, 0.43), vec3(1.33, 0.79, 1.07), vec3(0.20, 0.19, 0.56));
	col *= 0.85 + 0.17 * sin(gl_FragCoord.y * 2.44 + time * 4.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
