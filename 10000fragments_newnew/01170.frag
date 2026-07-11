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
    vec2 wq = vec2(vnoise2(p * 4.84 + ph), vnoise2(p * 4.84 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.84 + 2.90 * wq + vec2(1.7, 9.2) + t * 0.33),
                   vnoise2(p * 4.84 + 2.27 * wq + vec2(8.3, 2.8) - t * 0.84));
    v = vnoise2(p * 4.84 + 3.07 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.51;
	p = rot2(time * 0.37) * p;
	p = fract(p * 2.74) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.49, length(p) * 2.16 - time * 0.54); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.84, 0.21, 0.49) * (0.11 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
