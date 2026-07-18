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
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = p.yx;
	p.x = abs(p.x) - 0.40;
	p *= 2.74;
	p = rot2((time * 0.57) * -0.74) * p;
	vec2 gp = p * 6.98;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 24.90 - (time * 0.57) * 4.12 + rnd * 6.2831853);
	vec3 col = palette((v) * 1.09 + (time * 0.57) * 0.07, vec3(0.51, 0.43, 0.35), vec3(0.46, 0.37, 0.31), vec3(0.97, 0.96, 0.96), vec3(0.01, 0.11, 0.25));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.033, 1.013, 0.932);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
