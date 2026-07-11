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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.13 + ph), vnoise2(p * 4.13 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.13 + 2.25 * wq + vec2(1.7, 9.2) + t * 0.86),
                   vnoise2(p * 4.13 + 3.87 * wq + vec2(8.3, 2.8) - t * 0.56));
    v = vnoise2(p * 4.13 + 3.74 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.40), cos(time * 1.02)) * 0.24;
	float an = atan(p.y, p.x) + time * -0.65;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.58 / 3.1415927, 0.81 / r + time * 1.01);
	tv.x += tv.y * 0.29;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.27 + time * 0.01, vec3(0.60, 0.41, 0.55), vec3(0.48, 0.49, 0.42), vec3(0.78, 0.70, 1.26), vec3(0.16, 0.39, 0.04));
	col *= clamp(r * 2.54, 0.0, 1.0);
	col = clamp((col - 0.5) * 2.09 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
