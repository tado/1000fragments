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
    v = sin(sa * 3.30 + sr * 17.71 - t * 0.59 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.61 + sr * 23.79 - t * 4.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.21;
	p = rot2(1.29) * p;
	p += vec2(-0.52, -0.90) * sin(length(p) * 5.86 - time * 0.63) * 0.38;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.17);
	float d = d1 + d2;
	vec3 col = palette(d * 1.29 + time * 0.04, vec3(0.41, 0.59, 0.59), vec3(0.44, 0.45, 0.43), vec3(1.38, 1.29, 0.87), vec3(0.73, 0.35, 0.96));
	col = fract(col * 2.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
