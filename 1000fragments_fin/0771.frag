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
	p.x += p.y * -0.54;
	p *= 1.44;
	float acc = 0.0;
	for(int ri = 0; ri < 13; ri++){
		float fi = float(ri);
		float cyc = (time * 0.62) * 0.57 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.38;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.92) * 16.00) * (1.0 - age) * exp(-dist * 1.49);
	}
	vec3 col = palette((acc) * 1.12 + (time * 0.62) * 0.03, vec3(0.50, 0.40, 0.36), vec3(0.39, 0.35, 0.32), vec3(1.04, 0.99, 0.98), vec3(0.04, 0.33, 0.51));
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(0.948, 0.973, 1.036);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
