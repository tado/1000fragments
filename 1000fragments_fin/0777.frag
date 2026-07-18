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
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x -= max(0.0, resolution.x / resolution.y - 1.8) * 0.5;
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p *= 1.05;
	p.y = abs(p.y);
	float acc = 0.0;
	for(int ri = 0; ri < 10; ri++){
		float fi = float(ri);
		float cyc = (time * 0.75) * 0.60 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.79;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.49) * 13.95) * (1.0 - age) * exp(-dist * 1.12);
	}
	vec3 col = palette((acc) * 1.15 + (time * 0.75) * 0.22, vec3(0.46, 0.42, 0.36), vec3(0.27, 0.27, 0.27), vec3(0.99, 1.04, 0.67), vec3(0.04, 0.22, 0.36));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(0.963, 1.022, 0.936);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
