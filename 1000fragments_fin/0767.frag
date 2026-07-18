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
	p *= 2.32;
	vec3 col = mix(vec3(0.031, 0.050, 0.094), vec3(0.056, 0.060, 0.122), clamp(0.5 + p.y * 0.05 + p.x * 0.24, 0.0, 1.0));
	for(int ri = 0; ri < 6; ri++){
		float fi = float(ri);
		float cyc = (time * 0.70) * 0.47 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.66;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.86) * 17.46) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(4.736, 6.286, 7.837) + fi * 0.58 + (time * 0.70) * 0.69)) * ring * 0.55;
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.12 * sin(gl_FragCoord.y * 2.99 + (time * 0.70) * 7.10);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(0.992, 0.997, 0.990);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
