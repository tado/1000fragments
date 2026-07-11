uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 12.73);
    float gsh = hash21(vec2(grow, floor(t * 3.21))) - 0.5;
    float gx = p.x + gsh * 0.93;
    v = sin(gx * 13.84 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.70));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.33), cos(time * 0.76)) * 0.21;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.03 / 3.1415927, 1.38 / r - time * 0.90);
	tv.x += tv.y * 0.42;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.28, vec3(0.42, 0.50, 0.50), vec3(0.37, 0.47, 0.31), vec3(1.17, 0.81, 1.02), vec3(0.97, 0.42, 0.06));
	col *= clamp(r * 1.14, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
