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
	p *= 1.45;
	p.x *= resolution.x / resolution.y;
	p *= 2.52;
	p = rot2((time * 0.86) * -0.63) * p;
	vec2 gp = p * 7.47;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 19.71 - (time * 0.86) * 5.48 + rnd * 6.2831853);
	vec3 col = palette((v) * 0.86 + (time * 0.86) * 0.01, vec3(0.47, 0.40, 0.38), vec3(0.29, 0.30, 0.27), vec3(1.04, 0.99, 0.68), vec3(-0.03, 0.22, 0.38));
	col *= 0.90 + 0.17 * sin(gl_FragCoord.y * 2.34 + (time * 0.86) * 13.29);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(0.983, 0.995, 0.936);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
