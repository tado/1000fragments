uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.72);
    float gsh = hash21(vec2(grow, floor(t * 2.80))) - 0.5;
    float gx = p.x + gsh * 0.43;
    v = sin(gx * 7.66 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.83));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.82 / 3.1415927, 1.26 / r + time * 1.36);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.07, vec3(0.44, 0.42, 0.45), vec3(0.50, 0.47, 0.30), vec3(1.37, 1.38, 1.30), vec3(0.13, 0.91, 0.71));
	col *= clamp(r * 1.53, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
