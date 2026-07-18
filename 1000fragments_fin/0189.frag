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
	p.y += sin(p.x * 1.29 + (time * 0.75) * 0.88) * 0.13;
	p.x += p.y * -0.49;
	p.x *= resolution.x / resolution.y;
	p *= 1.06;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.68;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.75) * 0.35, (time * 0.75) * -0.27)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.24 * sin(p.x * 3.87 + (time * 0.75) * 1.80) * sin(p.y * 2.78 - (time * 0.75) * 1.54);
	float lv = (h) * 17.9;
	float fc = fract(lv);
	float line = smoothstep(0.11, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(((h * 2.0 - 1.0)) * 0.52 + (time * 0.75) * 0.14, vec3(0.50, 0.38, 0.49), vec3(0.36, 0.29, 0.36), vec3(1.04, 0.99, 1.01), vec3(0.82, 0.94, 0.11));
	col *= 1.0 - line * 0.56;
	col *= 0.84 + 0.11 * sin(gl_FragCoord.y * 2.09 + (time * 0.75) * 16.13);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.022, 0.946, 0.996);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
