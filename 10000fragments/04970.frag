uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.80;
	p = rot2(time * -1.26) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.80;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * -0.48, time * -0.35)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 16.8;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	float cc = clamp(0.5 + 0.5 * (h * 2.0 - 1.0), 0.0, 1.0);
	vec3 col = mix(vec3(0.19, 0.17, 0.37), vec3(0.92, 0.63, 0.70), cc);
	col *= 1.0 - line * 0.84;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
