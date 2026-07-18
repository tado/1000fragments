uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.41;
	p = p.yx;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	float acc = 0.0;
	for(int ri = 0; ri < 6; ri++){
		float fi = float(ri);
		float cyc = (time * 0.64) * 0.66 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.33;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.75) * 17.45) * (1.0 - age) * exp(-dist * 0.91);
	}
	vec3 col = vec3(0.5 + 0.5 * (acc)) * vec3(0.51, 0.61, 0.52) + vec3(0.03, 0.10, 0.08);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(1.009, 0.996, 1.004);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
