uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	vec2 gp = p * 6.03;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.30 - 0.15 * sin((time * 0.82) * 4.88 + rnd * 6.2831853)) * 14.01);
	vec3 col = palette((v) * 1.20 + (time * 0.82) * 0.02, vec3(0.48, 0.40, 0.36), vec3(0.41, 0.37, 0.31), vec3(1.02, 1.04, 1.04), vec3(0.07, 0.34, 0.56));
	col *= 0.69 + 0.49 * hash21(id + 11.0);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.025, 0.959, 0.997);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
