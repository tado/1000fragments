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
	p = rot2((time * 0.63) * 1.51) * p;
	vec3 col = mix(vec3(0.008, 0.030, 0.045), vec3(0.017, 0.018, 0.077), clamp(0.5 + p.y * 0.38 + p.x * -0.10, 0.0, 1.0));
	for(int li = 0; li < 22; li++){
		float fl = float(li);
		float fy = (fl / 22.0 - 0.5) * 1.87;
		float w = (vnoise2(vec2(p.x * 3.07 + fl * 7.3, (time * 0.63) * 1.95 + fl)) - 0.5) * 0.41;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.731, 2.750, 4.769) + fl * 0.77 + (time * 0.63) * 0.99)) * (0.0075 / (ld + 0.0127));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.009, 0.994, 1.004);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
