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
	p.y += sin(p.x * 2.16 + (time * 0.52) * 0.43) * 0.10;
	p.x *= resolution.x / resolution.y;
	p *= 1.28;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.76;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.52) * -0.23, (time * 0.52) * -0.26)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.11 * sin(p.x * 3.93 + (time * 0.52) * 0.61) * sin(p.y * 2.75 - (time * 0.52) * 1.43);
	float lv = (h + (time * 0.52) * -0.18) * 15.5;
	float fc = fract(lv);
	float line = smoothstep(0.11, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.048, 0.029, 0.145) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 0.93, 1.86) + lv * 1.11 + (time * 0.52) * 0.87)) * line;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col = clamp(col, 0.0, 1.0) * vec3(0.961, 1.006, 0.956) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
