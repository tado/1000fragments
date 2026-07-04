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
	for(int ri = 0; ri < 7; ri++){
		float fi = float(ri);
		float cyc = time * 0.79 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.71;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.18) * 23.62) * (1.0 - age) * exp(-dist * 0.88);
	}
	vec3 col = palette(acc * 1.43 + time * 0.01, vec3(0.43, 0.50, 0.42), vec3(0.38, 0.41, 0.35), vec3(0.85, 1.38, 0.82), vec3(0.12, 0.92, 0.51));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
