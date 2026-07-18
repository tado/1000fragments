uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * 0.78;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	vec2 gp = p * 6.34;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + (time * 0.75) * 1.79 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 21.67 + rnd * 6.2831853 + (time * 0.75) * 2.62);
	vec3 col = palette((v) * 1.10 + (time * 0.75) * 0.02, vec3(0.49, 0.38, 0.45), vec3(0.36, 0.31, 0.34), vec3(1.02, 1.04, 1.04), vec3(0.80, 0.97, 0.15));
	col *= 0.53 + 0.31 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.014, 0.956, 1.000);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
