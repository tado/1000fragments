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
	p *= 0.84;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.18;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * -0.42, time * 0.35)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.30 * sin(p.x * 1.63 + time * 1.33) * sin(p.y * 3.09 - time * 1.27);
	float lv = (h) * 17.9;
	float fc = fract(lv);
	float line = smoothstep(0.11, 0.0, min(fc, 1.0 - fc));
	vec3 col = hue((h * 2.0 - 1.0) * 0.53 + time * 0.40);
	col *= 1.0 - line * 0.61;
	col *= 0.88 + 0.20 * sin(gl_FragCoord.y * 2.07 + time * 13.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
