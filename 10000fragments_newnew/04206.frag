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
    vec2 wq = vec2(vnoise2(p * 3.24 + ph), vnoise2(p * 3.24 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.24 + 1.03 * wq + vec2(1.7, 9.2) + t * 0.62),
                   vnoise2(p * 3.24 + 3.10 * wq + vec2(8.3, 2.8) - t * 0.59));
    v = vnoise2(p * 3.24 + 3.15 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.56 / 3.1415927, 1.03 / r - time * 2.33);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.52 + time * 0.06);
	col *= clamp(r * 1.22, 0.0, 1.0);
	col = fract(col * 1.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
