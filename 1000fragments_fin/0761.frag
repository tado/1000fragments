uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y) - 0.52;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	vec3 col = mix(vec3(0.036, 0.041, 0.080), vec3(0.043, 0.047, 0.054), clamp(0.5 + p.y * 0.54 + p.x * -0.06, 0.0, 1.0));
	for(int ri = 0; ri < 12; ri++){
		float fi = float(ri);
		float cyc = (time * 0.65) * 0.40 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.62;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 0.87) * 10.86) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(1.263, 2.243, 3.222) + fi * 0.52 + (time * 0.65) * 0.74)) * ring * 0.81;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(1.031, 1.012, 0.936);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
