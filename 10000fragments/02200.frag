uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float acc = 0.0;
	for(int ri = 0; ri < 10; ri++){
		float fi = float(ri);
		float cyc = time * 0.53 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.18;
		float dist = length(p - dp);
		acc += sin((dist - age * 0.96) * 12.20) * (1.0 - age) * exp(-dist * 0.99);
	}
	vec3 col = hue(acc * 0.94 + time * 0.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
