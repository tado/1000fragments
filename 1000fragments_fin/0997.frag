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
	p.x = abs(p.x);
	vec3 col = mix(vec3(0.066, 0.050, 0.045), vec3(0.042, 0.067, 0.063), clamp(0.5 + p.y * -0.11 + p.x * 0.03, 0.0, 1.0));
	for(int li = 0; li < 16; li++){
		float fl = float(li);
		float fy = (fl / 16.0 - 0.5) * 1.63;
		float w = (vnoise2(vec2(p.x * 4.26 + fl * 7.3, (time * 0.87) * 1.28 + fl)) - 0.5) * 0.40;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(6.160, 7.174, 8.187) + fl * 0.54 + (time * 0.87) * 0.36)) * (0.0034 / (ld + 0.0149));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(0.922, 0.973, 1.047);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.22 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
