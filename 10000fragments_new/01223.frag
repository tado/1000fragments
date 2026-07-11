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

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.71 + ph), vnoise2(p * 1.71 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.71 + 1.75 * wq + vec2(1.7, 9.2) + t * 0.45),
                   vnoise2(p * 1.71 + 1.41 * wq + vec2(8.3, 2.8) - t * 0.93));
    v = vnoise2(p * 1.71 + 3.72 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.29), cos(time * 1.40)) * 0.15;
	float an = atan(p.y, p.x) + time * -0.68;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.21 / 3.1415927, 0.45 / r + time * 1.11);
	tv.x += tv.y * 0.40;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.42, 0.47, 0.52) * (0.17 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 1.28, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
