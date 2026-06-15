uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.76 + sr * 12.88 - t * 4.29 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.44, 0.0)) * 17.85 - t * 2.87 + ph);
    float mb = sin(length(p + vec2(0.44, 0.0)) * 14.02 - t * 2.87 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	p = rot2(length(p) * 3.78 + time * 0.46) * p;
	p *= 2.91;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.83);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.66 + time * 0.28, vec3(0.48, 0.60, 0.48), vec3(0.46, 0.40, 0.31), vec3(0.96, 1.21, 0.80), vec3(0.22, 0.84, 0.36));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
