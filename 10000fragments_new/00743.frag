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
    vec2 wq = vec2(vnoise2(p * 3.97 + ph), vnoise2(p * 3.97 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.97 + 3.42 * wq + vec2(1.7, 9.2) + t * 0.64),
                   vnoise2(p * 3.97 + 2.82 * wq + vec2(8.3, 2.8) - t * 0.85));
    v = vnoise2(p * 3.97 + 3.16 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.63), cos(time * 0.84)) * 0.25;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.07 / 3.1415927, 1.07 / r + time * 1.45);
	tv.x += tv.y * 0.19;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.59 + time * 0.17);
	col *= clamp(r * 1.59, 0.0, 1.0);
	col *= 0.85 + 0.19 * sin(gl_FragCoord.y * 2.55 + time * 17.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
