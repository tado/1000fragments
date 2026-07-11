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
		float cyc = time * 0.56 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.62;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.00) * 18.70) * (1.0 - age) * exp(-dist * 0.77);
	}
	vec3 col = palette(acc * 0.83 + time * 0.40, vec3(0.41, 0.55, 0.54), vec3(0.35, 0.40, 0.48), vec3(1.36, 0.71, 1.31), vec3(0.88, 0.90, 0.92));
	col = mod(col * 1.62, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
