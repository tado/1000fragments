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
	p *= 1.18;
	p = rot2(time * -0.38) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.20;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * -0.29, time * -0.16)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.28 * sin(p.x * 3.27 + time * 0.75) * sin(p.y * 3.41 - time * 0.62);
	float lv = (h + time * 0.11) * 13.9;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.038, 0.000, 0.116) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + lv * 1.21 + time * 0.35)) * line;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
