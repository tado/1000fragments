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
    float wr = length(p) + 0.33 * vnoise2(p * 2.78 + t * 0.77);
    v = sin(wr * 17.68 - t * 0.84 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.46;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.51 / 3.1415927, 0.72 / r - time * 0.72);
	tv.x += tv.y * 0.26;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.55 + time * 0.67);
	col *= clamp(r * 2.28, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
