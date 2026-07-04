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
	float acc = 0.0;
	for(int ri = 0; ri < 14; ri++){
		float fi = float(ri);
		float cyc = time * 0.74 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.49;
		float dist = length(p - dp);
		acc += sin((dist - age * 0.95) * 23.74) * (1.0 - age) * exp(-dist * 1.00);
	}
	vec3 col = vec3(0.5 + 0.5 * acc) * vec3(0.50, 0.69, 1.13) + vec3(0.02, 0.03, 0.20);
	col = fract(col * 2.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
