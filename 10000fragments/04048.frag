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
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.52;
	p = rot2(length(p) * 3.28 + time * 0.56) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.68;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * 0.27, time * 0.24)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h + time * -0.15) * 8.0;
	float fc = fract(lv);
	float line = smoothstep(0.12, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.090, 0.079, 0.084) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + lv * 1.90 + time * 0.71)) * line;
	col = mod(col * 2.92, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
