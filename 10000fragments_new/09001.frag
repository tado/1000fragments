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
    vec2 wq = vec2(vnoise2(p * 2.12 + ph), vnoise2(p * 2.12 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.12 + 3.02 * wq + vec2(1.7, 9.2) + t * 0.50),
                   vnoise2(p * 2.12 + 3.00 * wq + vec2(8.3, 2.8) - t * 0.75));
    v = vnoise2(p * 2.12 + 3.54 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	p = fract(p * 1.43) - 0.5;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.47; p = rot2(1.56) * p; }
	p = rot2(1.04) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.22), field(p, time, 2.44));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
