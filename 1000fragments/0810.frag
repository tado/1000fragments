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
    float bx = p.x + (vnoise2(vec2(p.y * 2.36, t * 1.89)) - 0.5) * 0.73;
    v = exp(-abs(bx) * 6.25) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.43), cos(time * 1.08)) * 0.12;
	float an = atan(p.y, p.x) + time * 0.74;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.48 / 3.1415927, 0.75 / r + time * 2.11);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.85, 0.61, 1.09) + vec3(0.16, 0.09, 0.20);
	col *= clamp(r * 1.41, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
