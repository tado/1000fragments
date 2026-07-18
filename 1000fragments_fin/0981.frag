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
	p += vec2(sin((time * 0.86) * 0.71), cos((time * 0.86) * 0.77)) * 0.24;
	p.x += p.y * -0.67;
	p = rot2((time * 0.86) * -1.20) * p;
	vec3 col = mix(vec3(0.027, 0.065, 0.045), vec3(0.050, 0.063, 0.066), clamp(0.5 + p.y * 0.55 + p.x * 0.23, 0.0, 1.0));
	for(int li = 0; li < 10; li++){
		float fl = float(li);
		float fy = (fl / 10.0 - 0.5) * 1.54;
		float w = (vnoise2(vec2(p.x * 4.79 + fl * 7.3, (time * 0.86) * 0.94 + fl)) - 0.5) * 0.17;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(4.329, 6.032, 7.735) + fl * 0.74 + (time * 0.86) * 0.98)) * (0.0038 / (ld + 0.0134));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.018, 0.950, 1.025);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
