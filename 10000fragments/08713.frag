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
    float petal = 0.37 + 0.16 * cos(sa * 7 + t * 2.83 + ph);
    v = sin((sr - petal) * 13.99);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.99 * sin(mf + 3.0) + ph), cos(t * 1.99 * cos(mf + 3.0) + ph));
        ms += 0.026 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.72;
	p = rot2(1.44) * p;
	{ p = vec2(atan(p.y, p.x) * 1.71, length(p) * 2.61 - time * 0.21); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.93);
	float d = d1 * d2;
	vec3 col = palette(d * 1.78 + time * 0.15, vec3(0.41, 0.49, 0.52), vec3(0.44, 0.41, 0.46), vec3(0.71, 1.21, 0.74), vec3(0.81, 0.44, 0.17));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
