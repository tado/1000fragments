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

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.65 + ph), vnoise2(p * 4.65 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.65 + 3.38 * wq + vec2(1.7, 9.2) + t * 0.64),
                   vnoise2(p * 4.65 + 2.96 * wq + vec2(8.3, 2.8) - t * 1.04));
    v = vnoise2(p * 4.65 + 2.63 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.67;
	p = sin(p * 1.15 + (time * 0.76) * 0.56) * 1.18;
	p += vec2(-0.11, 0.29) * sin(length(p) * 3.97 - (time * 0.76) * 1.14) * 0.28;
	p.y += sin(p.x * 7.78 + (time * 0.76) * 1.70) * 0.31;
	{ p = vec2(atan(p.y, p.x) * 1.46, length(p) * 5.40 - (time * 0.76) * 0.26); }
	float d = 0.5 + 0.5 * field(p, (time * 0.76), 0.0);
	vec3 col = mix(vec3(0.02, 0.10, 0.07), vec3(0.81, 0.69, 0.66), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.94));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(1.016, 0.951, 1.018) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
