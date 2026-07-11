uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.25 + vec2(t * 2.06, -t * 2.06) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.01 + vec2(t * 1.60, -t * 1.60) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.53) * p;
	p *= 3.01;
	p = abs(p) - 0.71;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.63);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.37 + time * 0.03, vec3(0.58, 0.41, 0.51), vec3(0.40, 0.45, 0.40), vec3(0.95, 1.40, 1.01), vec3(0.76, 0.91, 0.51));
	col = fract(col * 2.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
