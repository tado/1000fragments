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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.81;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * -0.34, time * 0.48)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.24 * sin(p.x * 2.17 + time * 1.24) * sin(p.y * 2.98 - time * 1.14);
	float lv = (h + time * -0.15) * 14.1;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	vec3 col = hue((h * 2.0 - 1.0) * 0.83 + time * 0.09);
	col *= 1.0 - line * 0.76;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
