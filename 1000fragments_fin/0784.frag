uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 1.46 + (time * 0.72) * 0.91) * 0.20;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	p *= 1.53;
	vec3 col = vec3(0.017, 0.039, 0.031);
	for(int ri = 0; ri < 14; ri++){
		float fi = float(ri);
		float cyc = (time * 0.72) * 0.82 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.86;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.89) * 10.09) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(2.774, 4.450, 6.127) + fi * 0.49 + (time * 0.72) * 0.53)) * ring * 0.87;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.004, 0.962, 1.021);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
