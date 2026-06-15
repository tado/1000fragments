uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 15.49 - t * 4.26 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 16.74 - t * 4.26 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.08 - t * 3.57 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.94;
	p = rot2(0.68) * p;
	{ p = vec2(atan(p.y, p.x) * 1.62, length(p) * 2.24 - time * 0.54); }
	p = rot2(length(p) * -3.61 + time * 0.74) * p;
	{ float fr = length(p); p *= 1.0 + 0.76 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.72);
	float d = d1 * d2;
	vec3 col = palette(d * 0.53 + time * 0.19, vec3(0.47, 0.47, 0.54), vec3(0.44, 0.34, 0.46), vec3(1.30, 1.09, 1.38), vec3(0.68, 0.66, 0.78));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
