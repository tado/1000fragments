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
	p *= 1.64;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.08;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.77) * -0.37, (time * 0.77) * -0.22)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h + (time * 0.77) * -0.22) * 6.4;
	float fc = fract(lv);
	float line = smoothstep(0.11, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(((h * 2.0 - 1.0)) * 1.12 + (time * 0.77) * 0.13, vec3(0.44, 0.37, 0.37), vec3(0.13, 0.15, 0.16), vec3(0.71, 0.50, 0.45), vec3(0.98, 0.03, 0.31));
	col *= 1.0 - line * 0.50;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.77)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(0.994, 0.984, 1.004) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
