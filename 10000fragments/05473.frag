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
	p *= 2.45;
	float acc = 0.0;
	for(int ri = 0; ri < 13; ri++){
		float fi = float(ri);
		float cyc = time * 0.60 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.96;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.49) * 17.59) * (1.0 - age) * exp(-dist * 0.57);
	}
	float cc = clamp(0.5 + 0.5 * acc, 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.29, 0.17), vec3(0.64, 0.68, 0.53), cc);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
