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
	p.x = abs(p.x) - 0.49;
	p += vec2(sin((time * 0.60) * 0.34), cos((time * 0.60) * 1.08)) * 0.13;
	p.x *= resolution.x / resolution.y;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.29;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.60) * -0.43, (time * 0.60) * 0.21)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.26 * sin(p.x * 3.06 + (time * 0.60) * 1.41) * sin(p.y * 1.73 - (time * 0.60) * 0.62);
	float lv = (h + (time * 0.60) * -0.09) * 12.8;
	float fc = fract(lv);
	float line = smoothstep(0.12, 0.0, min(fc, 1.0 - fc));
	float cc = clamp(0.5 + 0.5 * ((h * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.134, 0.095, 0.165), vec3(0.695, 0.976, 0.828), cc);
	col *= 1.0 - line * 0.82;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.946, 0.974, 1.034);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
