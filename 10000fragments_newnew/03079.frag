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
    vec2 wq = vec2(vnoise2(p * 3.35 + ph), vnoise2(p * 3.35 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.35 + 1.41 * wq + vec2(1.7, 9.2) + t * 0.50),
                   vnoise2(p * 3.35 + 2.33 * wq + vec2(8.3, 2.8) - t * 0.74));
    v = vnoise2(p * 3.35 + 3.77 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.53; p = rot2(0.79) * p; }
	p *= 1.0 + 0.12 * sin(time * 4.45);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.21, 0.78, 0.52) * (0.18 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
