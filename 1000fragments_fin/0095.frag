uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	p.x += p.y * 0.25;
	vec2 gp = p * 7.23;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 26.35 - (time * 0.90) * 5.31 + rnd * 6.2831853);
	vec3 col = palette((v) * 0.67 + (time * 0.90) * 0.06, vec3(0.52, 0.43, 0.37), vec3(0.26, 0.26, 0.18), vec3(0.99, 1.01, 0.97), vec3(0.04, 0.08, 0.22));
	col *= 0.50 + 0.31 * hash21(id + 11.0);
	col *= 0.87 + 0.15 * sin(gl_FragCoord.y * 2.02 + (time * 0.90) * 11.34);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(1.026, 0.989, 0.937);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.53 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
