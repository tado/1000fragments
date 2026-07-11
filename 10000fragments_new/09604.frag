uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.24 + t * 1.42 + ph) * 0.7;
    float wb = sin(p.y * 12.86 - t * 2.01 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.75;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.49;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.25 / 3.1415927, 0.80 / r + time * 1.76);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.10, vec3(0.40, 0.50, 0.59), vec3(0.40, 0.44, 0.30), vec3(1.13, 1.24, 0.87), vec3(0.19, 0.03, 0.89));
	col *= clamp(r * 1.55, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
