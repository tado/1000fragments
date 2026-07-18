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
	p.x = abs(p.x);
	p.x += p.y * -0.45;
	vec3 col = mix(vec3(0.030, 0.066, 0.054), vec3(0.038, 0.088, 0.029), clamp(0.5 + p.y * -0.34 + p.x * 0.03, 0.0, 1.0));
	for(int ri = 0; ri < 11; ri++){
		float fi = float(ri);
		float cyc = (time * 0.74) * 0.48 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.09;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.07) * 7.20) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(3.468, 4.390, 5.312) + fi * 1.06 + (time * 0.74) * 0.24)) * ring * 0.90;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.60 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.931, 0.981, 1.041);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
