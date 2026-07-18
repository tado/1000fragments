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
	p.y = abs(p.y);
	p *= 2.42;
	vec3 col = mix(vec3(0.020, 0.032, 0.048), vec3(0.029, 0.052, 0.039), clamp(0.5 + p.y * -0.58 + p.x * -0.04, 0.0, 1.0));
	for(int ri = 0; ri < 13; ri++){
		float fi = float(ri);
		float cyc = (time * 0.72) * 0.28 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.70;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.59) * 19.25) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(2.430, 3.448, 4.467) + fi * 1.24 + (time * 0.72) * 0.22)) * ring * 0.85;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.09 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.024, 0.969, 0.997);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
