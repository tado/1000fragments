uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.20 * cos(sa * 7.0 + t * 0.82 + ph);
    v = sin((sr - petal) * 7.01);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.33;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.67 / 3.1415927, 1.12 / r - time * 2.70);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.20 + time * 0.22, vec3(0.58, 0.45, 0.48), vec3(0.35, 0.45, 0.43), vec3(0.75, 0.89, 1.25), vec3(0.60, 0.24, 0.76));
	col *= clamp(r * 2.35, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
