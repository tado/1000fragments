uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.27;
	float acc = 0.0;
	for(int ri = 0; ri < 8; ri++){
		float fi = float(ri);
		float cyc = (time * 0.81) * 0.67 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.60;
		float dist = length(p - dp);
		acc += sin((dist - age * 0.85) * 12.10) * (1.0 - age) * exp(-dist * 0.80);
	}
	vec3 col = vec3(0.5 + 0.5 * (acc)) * vec3(0.60, 0.65, 0.69) + vec3(0.06, 0.07, 0.13);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(0.985, 1.009, 0.956) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
