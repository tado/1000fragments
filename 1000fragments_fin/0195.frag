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
	p.x += p.y * -0.23;
	p.x *= resolution.x / resolution.y;
	p *= 0.99;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.55;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.86) * 0.22, (time * 0.86) * 0.10)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.29 * sin(p.x * 2.32 + (time * 0.86) * 1.63) * sin(p.y * 3.58 - (time * 0.86) * 1.71);
	float lv = (h + (time * 0.86) * -0.19) * 9.2;
	float fc = fract(lv);
	float line = smoothstep(0.10, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.058, 0.063, 0.085) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(3.949, 5.440, 6.931) + lv * 0.81 + (time * 0.86) * 0.30)) * line;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.020, 0.953, 1.004);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
