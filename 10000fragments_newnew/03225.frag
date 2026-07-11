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
    vec2 wq = vec2(vnoise2(p * 2.33 + ph), vnoise2(p * 2.33 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.33 + 1.70 * wq + vec2(1.7, 9.2) + t * 0.31),
                   vnoise2(p * 2.33 + 2.47 * wq + vec2(8.3, 2.8) - t * 0.33));
    v = vnoise2(p * 2.33 + 3.95 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.36 / 3.1415927, 0.49 / r + time * 1.17);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.49, 0.51, 0.43) * (0.12 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 1.62, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.37 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
