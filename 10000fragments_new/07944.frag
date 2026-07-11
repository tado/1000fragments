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
    vec2 wq = vec2(vnoise2(p * 2.78 + ph), vnoise2(p * 2.78 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.78 + 1.78 * wq + vec2(1.7, 9.2) + t * 0.61),
                   vnoise2(p * 2.78 + 1.77 * wq + vec2(8.3, 2.8) - t * 1.10));
    v = vnoise2(p * 2.78 + 2.04 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.18), cos(time * 0.78)) * 0.10;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.44 / 3.1415927, 0.72 / r + time * 0.78);
	tv.x += tv.y * 0.33;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.28 + time * 0.28);
	col *= clamp(r * 2.87, 0.0, 1.0);
	col *= 0.88 + 0.16 * sin(gl_FragCoord.y * 2.91 + time * 9.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
