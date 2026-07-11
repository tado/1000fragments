uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.04);
    float gsh = hash21(vec2(grow, floor(t * 8.61))) - 0.5;
    float gx = p.x + gsh * 0.39;
    v = sin(gx * 7.19 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.43));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.37), cos(time * 0.96)) * 0.23;
	float an = atan(p.y, p.x) + time * -0.74;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.98 / 3.1415927, 0.61 / r + time * 0.85);
	tv.x += tv.y * 0.30;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.26, vec3(0.40, 0.44, 0.42), vec3(0.30, 0.37, 0.31), vec3(0.94, 1.03, 1.04), vec3(0.49, 0.34, 0.25));
	col *= clamp(r * 2.24, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
