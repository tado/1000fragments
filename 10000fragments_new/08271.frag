uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.93 + sr * 17.19 - t * 3.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.18), cos(time * 1.27)) * 0.05;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.61 / 3.1415927, 0.40 / r + time * 2.96);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.05 + time * 0.09, vec3(0.40, 0.47, 0.40), vec3(0.35, 0.37, 0.33), vec3(1.13, 1.09, 1.37), vec3(0.42, 0.84, 0.32));
	col *= clamp(r * 1.87, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
