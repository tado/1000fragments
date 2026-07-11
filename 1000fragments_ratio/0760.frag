uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p += vec2(sin((time * 0.66) * 0.62), cos((time * 0.66) * 0.90)) * 0.11;
	p.x *= resolution.x / resolution.y;
	float acc = 0.0;
	for(int ri = 0; ri < 10; ri++){
		float fi = float(ri);
		float cyc = (time * 0.66) * 0.46 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.93;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.79) * 22.52) * (1.0 - age) * exp(-dist * 1.17);
	}
	vec3 col = palette((acc) * 0.53 + (time * 0.66) * 0.23, vec3(0.38, 0.38, 0.30), vec3(0.18, 0.17, 0.19), vec3(0.75, 0.82, 0.66), vec3(0.27, 0.29, 0.77));
	col *= 0.90 + 0.11 * sin(gl_FragCoord.y * 2.11 + (time * 0.66) * 4.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col = clamp(col, 0.0, 1.0) * vec3(0.998, 0.960, 1.014) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
