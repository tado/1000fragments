uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 1.06 + (time * 0.59) * 1.12) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.02;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.59) * -0.39, (time * 0.59) * -0.33)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h + (time * 0.59) * 0.22) * 6.1;
	float fc = fract(lv);
	float line = smoothstep(0.06, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 6.1 + (time * 0.59) * 0.21, vec3(0.24, 0.26, 0.33), vec3(0.15, 0.20, 0.14), vec3(0.89, 0.78, 0.51), vec3(0.79, 0.23, 0.99)) * (1.0 - line * 0.70);
	col *= 0.87 + 0.15 * sin(gl_FragCoord.y * 1.35 + (time * 0.59) * 11.11);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(1.024, 0.978, 0.941) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
