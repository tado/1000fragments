uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.30);
    float gsh = hash21(vec2(grow, floor(t * 3.62))) - 0.5;
    float gx = p.x + gsh * 0.79;
    v = sin(gx * 19.48 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.66));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.42 / 3.1415927, 1.06 / r - time * 1.44);
	tv.x += tv.y * 0.17;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.42 + time * 0.11, vec3(0.60, 0.53, 0.56), vec3(0.39, 0.39, 0.44), vec3(1.23, 1.12, 0.73), vec3(0.15, 0.26, 0.58));
	col *= clamp(r * 1.14, 0.0, 1.0);
	col = clamp((col - 0.5) * 2.16 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
