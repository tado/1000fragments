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
	p.y = abs(p.y) - 0.47;
	p *= 0.89;
	vec3 col = mix(vec3(0.024, 0.069, 0.040), vec3(0.030, 0.057, 0.070), clamp(0.5 + p.y * -0.07 + p.x * -0.28, 0.0, 1.0));
	for(int li = 0; li < 16; li++){
		float fl = float(li);
		float fy = (fl / 16.0 - 0.5) * 1.56;
		float w = (vnoise2(vec2(p.x * 4.45 + fl * 7.3, (time * 0.72) * 0.90 + fl)) - 0.5) * 0.37;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(3.738, 4.700, 5.661) + fl * 1.06 + (time * 0.72) * 0.24)) * (0.0033 / (ld + 0.0074));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.43 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.005, 0.991, 0.947);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
