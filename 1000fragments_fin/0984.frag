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
	p.y += sin(p.x * 2.01 + (time * 0.58) * 0.66) * 0.17;
	vec3 col = mix(vec3(0.051, 0.035, 0.082), vec3(0.051, 0.042, 0.129), clamp(0.5 + p.y * -0.61 + p.x * 0.06, 0.0, 1.0));
	for(int li = 0; li < 15; li++){
		float fl = float(li);
		float fy = (fl / 15.0 - 0.5) * 1.95;
		float w = (vnoise2(vec2(p.x * 3.01 + fl * 7.3, (time * 0.58) * 1.14 + fl)) - 0.5) * 0.39;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(1.183, 3.002, 4.821) + fl * 0.32 + (time * 0.58) * 1.19)) * (0.0029 / (ld + 0.0093));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.028, 0.963, 1.021);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
