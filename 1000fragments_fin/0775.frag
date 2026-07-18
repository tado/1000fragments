uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x -= max(0.0, resolution.x / resolution.y - 1.8) * 0.5;
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p = p.yx;
	vec3 col = mix(vec3(0.056, 0.045, 0.069), vec3(0.063, 0.037, 0.048), clamp(0.5 + p.y * -0.35 + p.x * 0.28, 0.0, 1.0));
	for(int ri = 0; ri < 13; ri++){
		float fi = float(ri);
		float cyc = (time * 0.76) * 0.36 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.30;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.17) * 11.90) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(1.798, 3.188, 4.578) + fi * 1.06 + (time * 0.76) * 0.23)) * ring * 0.43;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(0.981, 1.016, 0.932);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
