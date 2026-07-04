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
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.55;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * 0.49, time * -0.26)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.29 * sin(p.x * 2.94 + time * 1.21) * sin(p.y * 1.46 - time * 1.76);
	float lv = (h) * 12.5;
	float fc = fract(lv);
	float line = smoothstep(0.13, 0.0, min(fc, 1.0 - fc));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + (h * 2.0 - 1.0) * 4.56 + time * 0.21);
	col *= 1.0 - line * 0.70;
	col = clamp((col - 0.5) * 2.06 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
