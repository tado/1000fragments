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
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.91;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.83) * -0.35, (time * 0.83) * -0.30)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.23 * sin(p.x * 1.22 + (time * 0.83) * 1.70) * sin(p.y * 2.26 - (time * 0.83) * 0.76);
	float lv = (h + (time * 0.83) * -0.08) * 17.4;
	float fc = fract(lv);
	float line = smoothstep(0.14, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 17.4 + (time * 0.83) * 0.02, vec3(0.47, 0.54, 0.46), vec3(0.12, 0.09, 0.14), vec3(0.58, 0.48, 0.72), vec3(0.57, 0.32, 0.97)) * (1.0 - line * 0.84);
	col *= 0.90 + 0.18 * sin(gl_FragCoord.y * 1.33 + (time * 0.83) * 13.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(1.024, 1.002, 0.917) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
