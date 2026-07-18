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
	p *= 2.31;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.81;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.91) * -0.48, (time * 0.91) * -0.28)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h + (time * 0.91) * 0.06) * 15.5;
	float fc = fract(lv);
	float line = smoothstep(0.06, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.014, 0.039, 0.019) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(2.582, 3.713, 4.844) + lv * 0.93 + (time * 0.91) * 0.57)) * line;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.001, 0.972, 1.014);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
