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
    v = sin(sa * 10.46 + sr * 4.46 - t * 3.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.17;
	p = abs(p) - 0.48;
	{ float fr = length(p); p *= 1.0 + -0.68 * fr * fr; }
	p.y += sin(p.x * 4.35 + time * 1.29) * 0.24;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.47 + time * 0.05, vec3(0.47, 0.44, 0.53), vec3(0.36, 0.31, 0.45), vec3(0.79, 1.13, 1.12), vec3(0.11, 0.51, 0.18));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
