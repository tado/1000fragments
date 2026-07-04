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
    float wr = length(p) + 0.38 * vnoise2(p * 3.05 + t * 1.04);
    v = sin(wr * 29.73 - t * 3.35 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.02));
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.59, 0.94) * sin(length(p) * 4.22 - time * 1.09) * 0.36;
	{ p = vec2(atan(p.y, p.x) * 2.77, length(p) * 4.69 - time * 0.48); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.90 + time * 0.24, vec3(0.43, 0.50, 0.56), vec3(0.40, 0.34, 0.47), vec3(1.31, 1.05, 1.25), vec3(0.41, 0.35, 0.53));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
