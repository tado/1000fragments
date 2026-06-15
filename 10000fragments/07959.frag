uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 36.89 - t * 3.41 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 33.90 - t * 3.41 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.38, 0.28) * sin(length(p) * 5.01 - time * 1.93) * 0.17;
	{ float fr = length(p); p *= 1.0 + -0.62 * fr * fr; }
	p = rot2(1.28) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.27, vec3(0.41, 0.44, 0.42), vec3(0.37, 0.44, 0.41), vec3(1.28, 1.38, 0.80), vec3(0.84, 0.35, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
