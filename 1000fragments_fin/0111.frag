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
	p += vec2(sin((time * 0.87) * 0.47), cos((time * 0.87) * 0.32)) * 0.23;
	p.y += sin(p.x * 1.30 + (time * 0.87) * 1.20) * 0.07;
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	vec2 gp = p * 4.13;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 9.42 + rnd * 6.2831853 + (time * 0.87) * 6.44);
	vec3 col = palette((v) * 0.86 + (time * 0.87) * 0.06, vec3(0.30, 0.25, 0.41), vec3(0.43, 0.37, 0.50), vec3(1.02, 0.96, 0.99), vec3(0.57, 0.77, 0.13));
	col = clamp((col - 0.5) * 1.92 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(0.934, 0.979, 1.060);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
