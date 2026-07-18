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
	p += vec2(sin((time * 0.77) * 0.93), cos((time * 0.77) * 0.65)) * 0.14;
	vec3 col = mix(vec3(0.015, 0.036, 0.054), vec3(0.038, 0.028, 0.046), clamp(0.5 + p.y * -0.39 + p.x * 0.22, 0.0, 1.0));
	for(int li = 0; li < 18; li++){
		float fl = float(li);
		float fy = (fl / 18.0 - 0.5) * 1.45;
		float w = (vnoise2(vec2(p.x * 4.77 + fl * 7.3, (time * 0.77) * 0.66 + fl)) - 0.5) * 0.20;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(4.786, 5.620, 6.454) + fl * 0.29 + (time * 0.77) * 1.05)) * (0.0028 / (ld + 0.0136));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.048, 0.999, 0.925);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
