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
	p *= 2.40;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.69;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.84) * 0.30, (time * 0.84) * -0.19)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 14.2;
	float fc = fract(lv);
	float line = smoothstep(0.12, 0.0, min(fc, 1.0 - fc));
	float cc = clamp(0.5 + 0.5 * ((h * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.001, 0.071, 0.113), vec3(0.150, 0.577, 0.497), smoothstep(0.0, 0.52, cc)), vec3(0.964, 0.960, 0.904), smoothstep(0.52, 1.0, cc));
	col *= 1.0 - line * 0.64;
	col *= 0.81 + 0.18 * sin(gl_FragCoord.y * 2.43 + (time * 0.84) * 7.71);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(1.002, 0.972, 0.995);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
