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
    v = sin(sa * 7.93 + sr * 22.32 - t * 3.56 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.76 * sin(mf + 3.0) + ph), cos(t * 1.76 * cos(mf + 3.0) + ph));
        ms += 0.088 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(1.67) * p;
	p = abs(p);
	p *= 1.98;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.41);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.85 + time * 0.14, vec3(0.49, 0.49, 0.46), vec3(0.44, 0.45, 0.36), vec3(1.38, 1.23, 1.21), vec3(0.98, 0.96, 1.00));
	col = mod(col * 2.59, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
