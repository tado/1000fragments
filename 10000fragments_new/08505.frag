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
    v = sin(sa * 2.33 + sr * 19.68 - t * 1.25 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.14 + vec2(t * 1.85, -t * 1.64) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = (floor(p * 22.4) + 0.5) / 22.4;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.37);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.95 + time * 0.08, vec3(0.52, 0.42, 0.59), vec3(0.46, 0.47, 0.45), vec3(0.98, 1.37, 0.99), vec3(0.06, 0.46, 0.51));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
