uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.64;
	p.x = abs(p.x) - 0.38;
	vec3 col = mix(vec3(0.059, 0.049, 0.059), vec3(0.039, 0.034, 0.035), clamp(0.5 + p.y * -0.13 + p.x * 0.18, 0.0, 1.0));
	for(int li = 0; li < 12; li++){
		float fl = float(li);
		float fy = (fl / 12.0 - 0.5) * 1.40;
		float w = (vnoise2(vec2(p.x * 3.34 + fl * 7.3, (time * 0.55) * 1.55 + fl)) - 0.5) * 0.25;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(5.981, 7.605, 9.230) + fl * 0.75 + (time * 0.55) * 0.73)) * (0.0041 / (ld + 0.0138));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.018, 0.947, 1.022);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
