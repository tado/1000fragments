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
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.94;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.20;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * 0.23, time * 0.35)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h + time * -0.07) * 14.4;
	float fc = fract(lv);
	float line = smoothstep(0.07, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 14.4 + time * 0.15, vec3(0.54, 0.54, 0.40), vec3(0.42, 0.45, 0.33), vec3(0.91, 0.73, 1.02), vec3(0.64, 0.37, 0.93)) * (1.0 - line * 0.69);
	col *= 0.83 + 0.15 * sin(gl_FragCoord.y * 2.67 + time * 11.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
