uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.x += p.y * 0.27;
	vec3 col = mix(vec3(0.014, 0.053, 0.071), vec3(0.031, 0.064, 0.089), clamp(0.5 + p.y * 0.55 + p.x * 0.10, 0.0, 1.0));
	for(int ri = 0; ri < 12; ri++){
		float fi = float(ri);
		float cyc = (time * 0.87) * 0.81 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.77;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.19) * 9.53) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(2.571, 4.362, 6.152) + fi * 1.32 + (time * 0.87) * 0.47)) * ring * 0.48;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.22 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(1.044, 0.987, 0.922);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
