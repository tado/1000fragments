uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.27, 0.0)) * 30.88 - t * 1.85 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 22.04 - t * 1.85 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.43 + sr * 8.99 - t * 0.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 1.14 + time * 0.54) * p;
	p = fract(p * 1.57) - 0.5;
	p = abs(p);
	p = rot2(0.34) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.92);
	float d = d1 * d2;
	vec3 col = palette(d * 1.33 + time * 0.30, vec3(0.48, 0.42, 0.45), vec3(0.44, 0.47, 0.41), vec3(1.19, 0.81, 1.14), vec3(0.77, 0.41, 0.71));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
