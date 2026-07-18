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
	p = p.yx;
	p += vec2(sin((time * 0.72) * 0.33), cos((time * 0.72) * 0.70)) * 0.17;
	p *= 0.84;
	vec3 col = mix(vec3(0.073, 0.047, 0.038), vec3(0.050, 0.070, 0.032), clamp(0.5 + p.y * 0.05 + p.x * -0.17, 0.0, 1.0));
	for(int ri = 0; ri < 9; ri++){
		float fi = float(ri);
		float cyc = (time * 0.72) * 0.41 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.66;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.93) * 7.25) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(3.187, 4.177, 5.168) + fi * 1.29 + (time * 0.72) * 0.18)) * ring * 0.84;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.028, 0.966, 1.014);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
