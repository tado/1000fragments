uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
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
	p *= 2.69;
	p = rot2(length(p) * 2.07 + (time * 0.57) * 0.64) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.00;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.57) * 0.18, (time * 0.57) * 0.41)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.21 * sin(p.x * 1.18 + (time * 0.57) * 0.94) * sin(p.y * 1.55 - (time * 0.57) * 0.96);
	float lv = (h + (time * 0.57) * -0.11) * 14.9;
	float fc = fract(lv);
	float line = smoothstep(0.06, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.013, 0.001, 0.059) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 0.72, 1.44) + lv * 1.50 + (time * 0.57) * 0.25)) * line;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.001, 0.994, 0.995) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
