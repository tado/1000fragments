uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.59) * 0.77), cos((time * 0.59) * 0.66)) * 0.11;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	float acc = 0.0;
	for(int ri = 0; ri < 12; ri++){
		float fi = float(ri);
		float cyc = (time * 0.59) * 0.65 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.66;
		float dist = length(p - dp);
		acc += sin((dist - age * 0.85) * 10.01) * (1.0 - age) * exp(-dist * 0.76);
	}
	vec3 col = palette((acc) * 0.42 + (time * 0.59) * 0.24, vec3(0.32, 0.40, 0.27), vec3(0.24, 0.26, 0.16), vec3(1.03, 0.97, 1.00), vec3(0.08, 0.20, 0.06));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(0.983, 1.017, 0.937);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
