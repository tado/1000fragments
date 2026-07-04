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
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.68;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * 0.30, time * -0.45)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 13.4;
	float fc = fract(lv);
	float line = smoothstep(0.14, 0.0, min(fc, 1.0 - fc));
	vec3 col = hue((h * 2.0 - 1.0) * 0.51 + time * 0.03);
	col *= 1.0 - line * 0.65;
	col *= 0.90 + 0.15 * sin(gl_FragCoord.y * 2.34 + time * 12.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
