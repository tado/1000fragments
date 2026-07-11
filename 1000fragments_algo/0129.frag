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
    vec2 wq = vec2(vnoise2(p * 3.86 + ph), vnoise2(p * 3.86 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.86 + 1.80 * wq + vec2(1.7, 9.2) + t * 0.61),
                   vnoise2(p * 3.86 + 1.09 * wq + vec2(8.3, 2.8) - t * 0.31));
    v = vnoise2(p * 3.86 + 3.05 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x);
	p *= 2.16;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * -1.62 + (time * 0.67) * 1.26) * p;
	float d = field(p, (time * 0.67), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.51, 0.58, 0.55) + vec3(0.10, 0.08, 0.11);
	col *= 0.83 + 0.14 * sin(gl_FragCoord.y * 2.17 + (time * 0.67) * 8.04);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(0.949, 0.980, 1.045) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
