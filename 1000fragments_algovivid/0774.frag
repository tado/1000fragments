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
	p *= 0.95;
	float acc = 0.0;
	for(int ri = 0; ri < 13; ri++){
		float fi = float(ri);
		float cyc = (time * 0.76) * 0.83 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.89;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.04) * 19.21) * (1.0 - age) * exp(-dist * 1.37);
	}
	float cc = clamp(0.5 + 0.5 * (acc), 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.12, 0.08), vec3(0.78, 0.84, 0.78), cc);
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col = clamp(col, 0.0, 1.0) * vec3(1.048, 0.997, 0.927) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
