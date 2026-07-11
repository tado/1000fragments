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
    float petal = 0.43 + 0.25 * cos(sa * 8 + t * 0.88 + ph);
    v = sin((sr - petal) * 13.32);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.88 + t * 4.48 + ph) + sin(p.y * 10.87 - t * 4.48 + ph)
        + sin((p.x + p.y) * 4.67 + t * 4.48 + ph) + sin(length(p) * 13.01 - t * 4.48 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.37;
	{ p = vec2(atan(p.y, p.x) * 2.22, length(p) * 4.74 - time * 0.35); }
	p = rot2(time * -0.29) * p;
	p = fract(p * 2.26) - 0.5;
	p += vec2(0.08, -0.87) * sin(length(p) * 5.52 - time * 1.45) * 0.18;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.69);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.53 + time * 0.18, vec3(0.54, 0.45, 0.52), vec3(0.33, 0.46, 0.45), vec3(1.10, 0.71, 1.09), vec3(0.03, 0.85, 0.29));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
