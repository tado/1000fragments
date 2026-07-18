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
	p.x += p.y * 0.69;
	p.y += sin(p.x * 2.35 + (time * 0.72) * 1.36) * 0.06;
	vec3 col = mix(vec3(0.078, 0.062, 0.035), vec3(0.087, 0.071, 0.057), clamp(0.5 + p.y * -0.46 + p.x * -0.03, 0.0, 1.0));
	for(int li = 0; li < 20; li++){
		float fl = float(li);
		float fy = (fl / 20.0 - 0.5) * 2.16;
		float w = (vnoise2(vec2(p.x * 4.50 + fl * 7.3, (time * 0.72) * 1.82 + fl)) - 0.5) * 0.25;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(6.230, 8.129, 10.028) + fl * 1.01 + (time * 0.72) * 0.21)) * (0.0049 / (ld + 0.0053));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.006, 0.963, 1.017);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
