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
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y = abs(p.y);
	p *= 1.94;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.99;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.53) * -0.36, (time * 0.53) * 0.36)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.23 * sin(p.x * 2.20 + (time * 0.53) * 1.12) * sin(p.y * 1.94 - (time * 0.53) * 1.49);
	float lv = (h + (time * 0.53) * 0.15) * 16.2;
	float fc = fract(lv);
	float line = smoothstep(0.15, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(((h * 2.0 - 1.0)) * 0.41 + (time * 0.53) * 0.11, vec3(0.27, 0.25, 0.34), vec3(0.23, 0.19, 0.20), vec3(0.66, 0.69, 0.42), vec3(0.48, 0.07, 0.87));
	col *= 1.0 - line * 0.67;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.68 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col = clamp(col, 0.0, 1.0) * vec3(0.929, 0.986, 1.029) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
