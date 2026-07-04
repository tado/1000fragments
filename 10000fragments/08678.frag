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

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.13 + ph), vnoise2(p * 2.13 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.13 + 1.93 * wq + vec2(1.7, 9.2) + t * 1.15),
                   vnoise2(p * 2.13 + 2.83 * wq + vec2(8.3, 2.8) - t * 0.63));
    v = vnoise2(p * 2.13 + 1.39 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.49;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.89) * p * 13.88;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = mix(vec3(0.02, 0.07, 0.12), vec3(0.76, 0.76, 0.70), v);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
