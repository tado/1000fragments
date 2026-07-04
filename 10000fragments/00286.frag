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
	p *= 1.99;
	float acc = 0.0;
	for(int ri = 0; ri < 6; ri++){
		float fi = float(ri);
		float cyc = time * 0.85 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.03;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.81) * 21.99) * (1.0 - age) * exp(-dist * 1.48);
	}
	float cc = clamp(0.5 + 0.5 * acc, 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.02, 0.24), vec3(0.58, 0.85, 0.98), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
