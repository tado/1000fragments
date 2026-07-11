uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.47);
    float gsh = hash21(vec2(grow, floor(t * 9.05))) - 0.5;
    float gx = p.x + gsh * 0.98;
    v = sin(gx * 16.28 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.64));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.14 / 3.1415927, 0.89 / r - time * 0.55);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.18, vec3(0.47, 0.58, 0.47), vec3(0.34, 0.44, 0.37), vec3(1.40, 0.99, 0.80), vec3(0.04, 0.37, 0.22));
	col *= clamp(r * 2.50, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
