uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.52);
    float gsh = hash21(vec2(grow, floor(t * 8.16))) - 0.5;
    float gx = p.x + gsh * 0.84;
    v = sin(gx * 12.81 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.49));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.44 / 3.1415927, 0.50 / r - time * 0.85);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.73 + time * 0.33, vec3(0.50, 0.51, 0.51), vec3(0.32, 0.31, 0.49), vec3(1.35, 1.04, 0.94), vec3(0.54, 0.90, 0.88));
	col *= clamp(r * 1.62, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.50 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
