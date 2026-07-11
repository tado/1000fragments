uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 36.32 - t * 3.39 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 38.41 - t * 3.39 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.87 + sr * 17.59 - t * 3.73 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.15, length(p) * 3.68 - time * 0.40); }
	p = rot2(p.y * 2.49 + time * 0.89) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.30);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.27 + time * 0.12, vec3(0.41, 0.50, 0.50), vec3(0.38, 0.42, 0.40), vec3(0.97, 1.20, 0.72), vec3(0.79, 0.44, 0.89));
	col = clamp((col - 0.5) * 1.45 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
