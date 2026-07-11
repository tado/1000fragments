uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.97 + vec2(t * 2.26, -t * 1.77) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.72 + sr * 12.14 - t * 4.40 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.50; p = rot2(1.66) * p; }
	p = rot2(time * -1.00) * p;
	p = rot2(length(p) * -1.31 + time * 0.63) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.74);
	float d = d1 * d2;
	vec3 col = palette(d * 0.91 + time * 0.28, vec3(0.44, 0.53, 0.50), vec3(0.32, 0.38, 0.42), vec3(1.33, 1.20, 1.14), vec3(0.19, 0.76, 0.88));
	col *= 0.80 + 0.16 * sin(gl_FragCoord.y * 1.50 + time * 11.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
