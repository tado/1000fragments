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
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.36;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.18;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * -0.16, time * -0.44)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 15.6;
	float fc = fract(lv);
	float line = smoothstep(0.13, 0.0, min(fc, 1.0 - fc));
	float cc = clamp(0.5 + 0.5 * (h * 2.0 - 1.0), 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.36, 0.01), vec3(0.68, 0.96, 0.79), cc);
	col *= 1.0 - line * 0.59;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.24 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
