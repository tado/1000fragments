uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.92;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.36)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 20.92 - t * 4.95 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p += vec2(sin((time * 0.51) * 0.49), cos((time * 0.51) * 0.95)) * 0.28;
	float an = atan(p.y, p.x) + (time * 0.51) * 0.72;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.05 / 3.1415927, 1.49 / r + (time * 0.51) * 0.92);
	float d = field(tv, (time * 0.51), 0.0);
	vec3 col = palette((d) * 0.66 + (time * 0.51) * 0.04, vec3(0.31, 0.26, 0.25), vec3(0.28, 0.30, 0.31), vec3(0.79, 0.51, 0.60), vec3(0.35, 0.54, 0.19));
	col *= clamp(r * 2.34, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col = clamp(col, 0.0, 1.0) * vec3(0.961, 1.017, 0.952) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
