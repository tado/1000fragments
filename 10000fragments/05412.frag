uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 34.88 - t * 5.92 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 23.61 - t * 5.92 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.92, t * 2.21 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.13;
	p = rot2(p.y * 3.08 + time * 0.30) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 2.63, length(p) * 4.21 - time * 0.42); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.79);
	float d = d1 + d2;
	vec3 col = palette(d * 1.73 + time * 0.06, vec3(0.59, 0.43, 0.41), vec3(0.48, 0.46, 0.42), vec3(0.92, 0.92, 0.89), vec3(0.07, 0.94, 0.06));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
