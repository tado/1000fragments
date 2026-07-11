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
	p *= 1.02;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.76;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * 0.16, time * -0.37)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h + time * -0.06) * 16.0;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.77, 0.59, 0.41) * (0.08 / (abs((h * 2.0 - 1.0)) + 0.08));
	col = col / (1.0 + col);
	col *= 1.0 - line * 0.51;
	col *= 0.87 + 0.17 * sin(gl_FragCoord.y * 1.74 + time * 14.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
