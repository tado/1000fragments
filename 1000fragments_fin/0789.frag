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
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	vec3 col = mix(vec3(0.019, 0.042, 0.083), vec3(0.025, 0.051, 0.053), clamp(0.5 + p.y * 0.05 + p.x * 0.27, 0.0, 1.0));
	for(int ri = 0; ri < 10; ri++){
		float fi = float(ri);
		float cyc = (time * 0.75) * 0.77 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.59;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 0.91) * 16.26) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(5.281, 6.389, 7.497) + fi * 1.27 + (time * 0.75) * 0.25)) * ring * 0.41;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.04);
	col *= vec3(1.031, 1.012, 0.938);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.58 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
