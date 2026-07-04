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
    float bx = p.x + (vnoise2(vec2(p.y * 3.08, t * 2.48)) - 0.5) * 1.41;
    v = exp(-abs(bx) * 11.43) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.64), cos(time * 0.54)) * 0.22;
	float an = atan(p.y, p.x) + time * 0.56;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.93 / 3.1415927, 1.01 / r - time * 0.74);
	tv.x += tv.y * 0.16;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.48, 1.16, 1.42) + vec3(0.22, 0.20, 0.15);
	col *= clamp(r * 1.28, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
