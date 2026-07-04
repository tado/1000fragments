uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.49);
    float gsh = hash21(vec2(grow, floor(t * 6.05))) - 0.5;
    float gx = p.x + gsh * 0.30;
    v = sin(gx * 14.01 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.34));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.34), cos(time * 1.08)) * 0.21;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.91 / 3.1415927, 0.46 / r - time * 0.74);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.04, vec3(0.50, 0.48, 0.46), vec3(0.33, 0.33, 0.39), vec3(0.87, 1.32, 1.21), vec3(0.53, 0.27, 0.11));
	col *= clamp(r * 1.22, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.90 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
