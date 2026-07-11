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
    float petal = 0.45 + 0.25 * cos(sa * 8.0 + t * 2.92 + ph);
    v = sin((sr - petal) * 10.26);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.80));
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.24, vec3(0.59, 0.44, 0.57), vec3(0.42, 0.34, 0.46), vec3(1.03, 1.30, 1.19), vec3(0.27, 0.34, 0.15));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
