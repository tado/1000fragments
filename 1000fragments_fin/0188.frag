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
	p *= 0.94;
	p.x = abs(p.x);
	p.x *= resolution.x / resolution.y;
	p *= 2.43;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.36;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.81) * 0.42, (time * 0.81) * 0.29)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.15 * sin(p.x * 2.67 + (time * 0.81) * 1.30) * sin(p.y * 2.31 - (time * 0.81) * 1.07);
	float lv = (h + (time * 0.81) * 0.05) * 16.6;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	float cc = clamp(0.5 + 0.5 * ((h * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.152, 0.082, 0.139), vec3(0.690, 0.945, 0.834), smoothstep(0.0, 1.0, cc));
	col *= 1.0 - line * 0.89;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(0.993, 1.000, 1.008);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
