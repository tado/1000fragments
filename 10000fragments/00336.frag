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
	p *= 0.88;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.99;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * 0.25, time * -0.46)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.19 * sin(p.x * 2.59 + time * 1.12) * sin(p.y * 2.11 - time * 1.19);
	float lv = (h) * 16.7;
	float fc = fract(lv);
	float line = smoothstep(0.13, 0.0, min(fc, 1.0 - fc));
	float cc = clamp(0.5 + 0.5 * (h * 2.0 - 1.0), 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.12, 0.09), vec3(0.79, 0.65, 0.44), cc);
	col *= 1.0 - line * 0.74;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
