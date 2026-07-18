uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y) - 0.25;
	p.y += sin(p.x * 1.29 + (time * 0.77) * 0.53) * 0.15;
	p.x *= resolution.x / resolution.y;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.42;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.77) * 0.49, (time * 0.77) * -0.29)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h = 1.0 - abs(h * 2.0 - 1.0);
	float lv = (h) * 9.9;
	float fc = fract(lv);
	float line = smoothstep(0.08, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 9.9 + (time * 0.77) * 0.28, vec3(0.52, 0.52, 0.49), vec3(0.50, 0.51, 0.52), vec3(0.96, 1.02, 0.99), vec3(0.01, 0.34, 0.67)) * (1.0 - line * 0.61);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.58));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.04);
	col *= vec3(1.037, 1.014, 0.935);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
