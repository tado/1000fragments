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
    vec2 wq = vec2(vnoise2(p * 3.57 + ph), vnoise2(p * 3.57 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.57 + 2.61 * wq + vec2(1.7, 9.2) + t * 1.07),
                   vnoise2(p * 3.57 + 1.95 * wq + vec2(8.3, 2.8) - t * 0.37));
    v = vnoise2(p * 3.57 + 3.76 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.33; p = rot2(0.64) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.32, 0.06, 0.39), vec3(0.50, 0.51, 0.84), d);
	col *= 0.88 + 0.18 * sin(gl_FragCoord.y * 1.58 + time * 4.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
