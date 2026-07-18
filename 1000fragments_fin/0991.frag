uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.79;
	p = rot2((time * 0.90) * 1.33) * p;
	vec3 col = vec3(0.034, 0.008, 0.033);
	for(int li = 0; li < 15; li++){
		float fl = float(li);
		float fy = (fl / 15.0 - 0.5) * 2.08;
		float w = (vnoise2(vec2(p.x * 2.46 + fl * 7.3, (time * 0.90) * 0.72 + fl)) - 0.5) * 0.35;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(4.797, 5.585, 6.374) + fl * 0.44 + (time * 0.90) * 1.13)) * (0.0056 / (ld + 0.0065));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(0.990, 1.012, 0.933);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
