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
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.10;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.68) * 0.39, (time * 0.68) * -0.23)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.11 * sin(p.x * 2.67 + (time * 0.68) * 0.82) * sin(p.y * 2.76 - (time * 0.68) * 1.81);
	float lv = (h + (time * 0.68) * -0.13) * 8.0;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.077, 0.084, 0.032) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 1.09, 2.18) + lv * 1.37 + (time * 0.68) * 0.94)) * line;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col = clamp(col, 0.0, 1.0) * vec3(0.969, 1.007, 0.927) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
