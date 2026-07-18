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
	p.x += p.y * -0.37;
	vec3 col = mix(vec3(0.059, 0.051, 0.079), vec3(0.083, 0.038, 0.103), clamp(0.5 + p.y * 0.56 + p.x * -0.04, 0.0, 1.0));
	for(int ri = 0; ri < 6; ri++){
		float fi = float(ri);
		float cyc = (time * 0.90) * 0.54 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.16;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.97) * 14.90) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(5.917, 6.843, 7.770) + fi * 1.10 + (time * 0.90) * 0.16)) * ring * 0.40;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.049, 0.998, 0.929);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.33 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
