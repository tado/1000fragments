uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.42;
	p.x = abs(p.x) - 0.25;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	p *= 0.99;
	vec3 col = mix(vec3(0.013, 0.059, 0.076), vec3(0.036, 0.029, 0.057), clamp(0.5 + p.y * 0.30 + p.x * 0.04, 0.0, 1.0));
	for(int ri = 0; ri < 7; ri++){
		float fi = float(ri);
		float cyc = (time * 0.91) * 0.31 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.13;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.25) * 14.27) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(2.238, 3.567, 4.895) + fi * 1.28 + (time * 0.91) * 0.16)) * ring * 0.41;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.032, 0.986, 0.937);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
