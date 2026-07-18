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
	p = p.yx;
	p.x *= resolution.x / resolution.y;
	p *= 1.72;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.60;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.89) * -0.14, (time * 0.89) * -0.22)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.24 * sin(p.x * 3.03 + (time * 0.89) * 0.78) * sin(p.y * 3.07 - (time * 0.89) * 1.60);
	float lv = (h + (time * 0.89) * 0.19) * 17.1;
	float fc = fract(lv);
	float line = smoothstep(0.08, 0.0, min(fc, 1.0 - fc));
	float cc = clamp(0.5 + 0.5 * ((h * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.144, 0.070, 0.146), vec3(0.696, 0.962, 0.829), cc);
	col *= 1.0 - line * 0.79;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.62));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(0.983, 1.017, 0.930);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
