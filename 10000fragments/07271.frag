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
    float petal = 0.63 + 0.17 * cos(sa * 3 + t * 1.88 + ph);
    v = sin((sr - petal) * 10.17);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	p = rot2(time * 0.52) * p;
	p = abs(p);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.51, -0.09) * sin(length(p) * 4.71 - time * 1.85) * 0.32;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.74 + time * 0.28, vec3(0.59, 0.57, 0.52), vec3(0.30, 0.42, 0.40), vec3(1.01, 0.73, 0.92), vec3(0.06, 0.81, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
