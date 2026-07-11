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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.40 + ph), vnoise2(p * 4.40 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.40 + 3.03 * wq + vec2(1.7, 9.2) + t * 0.67),
                   vnoise2(p * 4.40 + 3.37 * wq + vec2(8.3, 2.8) - t * 0.47));
    v = vnoise2(p * 4.40 + 2.95 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.96;
	p = (floor(p * 14.9) + 0.5) / 14.9;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.82 + time * 0.02);
	col = fract(col * 1.88);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
