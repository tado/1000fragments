uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.81 + vec2(t * 1.12, -t * 1.12) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 22.59 - t * 3.14 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 35.32 - t * 3.14 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.30;
	p = rot2(time * 0.52) * p;
	p = rot2(p.y * -3.14 + time * 0.76) * p;
	p *= 1.63;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.98);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.74 + time * 0.02, vec3(0.53, 0.46, 0.50), vec3(0.31, 0.44, 0.40), vec3(1.33, 0.84, 1.25), vec3(0.47, 0.81, 0.31));
	col = fract(col * 2.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
