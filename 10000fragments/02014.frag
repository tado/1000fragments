uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.76 + t * 1.91 + ph) + sin(p.y * 4.71 - t * 5.71 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.74 + sr * 9.84 - t * 2.31 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.35;
	p = rot2(length(p) * -3.54 + time * 0.68) * p;
	p = rot2(p.y * 1.33 + time * 0.17) * p;
	p = fract(p * 1.80) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.29, length(p) * 2.90 - time * 0.62); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.50);
	float d = d1 * d2;
	vec3 col = palette(d * 1.56 + time * 0.14, vec3(0.45, 0.59, 0.42), vec3(0.35, 0.35, 0.34), vec3(1.25, 0.88, 1.05), vec3(0.76, 0.83, 1.00));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
