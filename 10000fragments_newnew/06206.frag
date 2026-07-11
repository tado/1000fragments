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
    float wr = length(p) + 0.35 * vnoise2(p * 3.74 + t * 1.49);
    v = sin(wr * 29.60 - t * 2.94 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 7.65 + time * 2.99) * 0.32;
	{ p = vec2(atan(p.y, p.x) * 2.72, length(p) * 5.82 - time * 0.43); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.99 + time * 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
