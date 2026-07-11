uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.61);
    float gsh = hash21(vec2(grow, floor(t * 8.71))) - 0.5;
    float gx = p.x + gsh * 0.71;
    v = sin(gx * 9.35 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.76));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.52;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.57 / 3.1415927, 0.48 / r - time * 0.78);
	tv.x += tv.y * 0.12;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.34 + time * 0.29, vec3(0.49, 0.54, 0.42), vec3(0.43, 0.34, 0.49), vec3(1.10, 1.04, 1.34), vec3(0.07, 0.13, 0.30));
	col *= clamp(r * 2.85, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
