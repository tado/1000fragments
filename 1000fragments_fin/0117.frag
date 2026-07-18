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
	p += vec2(sin((time * 0.85) * 0.43), cos((time * 0.85) * 0.40)) * 0.08;
	p.x *= resolution.x / resolution.y;
	vec2 gp = p * 7.53;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.16 - 0.18 * sin((time * 0.85) * 4.23 + rnd * 6.2831853)) * 16.47);
	vec3 col = palette((v) * 0.49 + (time * 0.85) * 0.12, vec3(0.28, 0.25, 0.41), vec3(0.42, 0.40, 0.46), vec3(1.05, 1.01, 1.02), vec3(0.58, 0.78, 0.07));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.66));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.007, 1.011, 1.001);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
