uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 21.28);
    float gsh = hash21(vec2(grow, floor(t * 9.93))) - 0.5;
    float gx = p.x + gsh * 1.10;
    v = sin(gx * 8.05 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.48));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.47;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.89 / 3.1415927, 1.35 / r - time * 1.20);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.23, vec3(0.45, 0.55, 0.47), vec3(0.42, 0.39, 0.43), vec3(0.70, 1.23, 0.85), vec3(0.59, 0.70, 0.45));
	col *= clamp(r * 2.43, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.90 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
