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
	for(int ri = 0; ri < 6; ri++){
		float fi = float(ri);
		float cyc = time * 0.55 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.01;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.26) * 20.83) * (1.0 - age) * exp(-dist * 1.41);
	}
	vec3 col = vec3(0.81, 0.31, 0.62) * (0.14 / (abs(acc) + 0.10));
	col = col / (1.0 + col);
	col = mod(col * 2.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
