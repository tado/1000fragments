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
	p.y = abs(p.y) - 0.54;
	p *= 1.71;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.50;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.57) * -0.15, (time * 0.57) * -0.26)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.29 * sin(p.x * 1.26 + (time * 0.57) * 1.35) * sin(p.y * 3.51 - (time * 0.57) * 1.17);
	float lv = (h + (time * 0.57) * 0.10) * 10.9;
	float fc = fract(lv);
	float line = smoothstep(0.08, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.097, 0.020, 0.127) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(3.928, 5.412, 6.895) + lv * 1.90 + (time * 0.57) * 0.72)) * line;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(0.937, 0.984, 1.060);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
