uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.29 + sr * 15.52 - t * 4.50 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.70;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.39 / 3.1415927, 1.27 / r - time * 2.26);
	tv.x += tv.y * 0.20;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.35 + time * 0.39, vec3(0.48, 0.48, 0.42), vec3(0.45, 0.38, 0.48), vec3(1.15, 0.72, 1.19), vec3(0.99, 0.29, 0.24));
	col *= clamp(r * 1.79, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.96 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
