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
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.37;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * -0.47, time * 0.36)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.12 * sin(p.x * 3.13 + time * 1.01) * sin(p.y * 3.57 - time * 0.83);
	float lv = (h + time * 0.16) * 6.2;
	float fc = fract(lv);
	float line = smoothstep(0.10, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 6.2 + time * 0.16, vec3(0.45, 0.59, 0.44), vec3(0.32, 0.42, 0.36), vec3(1.36, 0.78, 0.70), vec3(0.01, 0.79, 0.69)) * (1.0 - line * 0.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
