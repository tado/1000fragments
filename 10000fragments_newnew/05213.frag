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


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.30;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.73;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * 0.16, time * -0.48)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.25 * sin(p.x * 1.53 + time * 1.62) * sin(p.y * 2.20 - time * 1.58);
	float lv = (h + time * -0.12) * 13.8;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + (h * 2.0 - 1.0) * 2.56 + time * 0.15);
	col *= 1.0 - line * 0.70;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
