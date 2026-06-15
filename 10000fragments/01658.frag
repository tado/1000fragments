uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.73 * sin(mf + 3.0) + ph), cos(t * 0.73 * cos(mf + 3.0) + ph));
        ms += 0.055 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.07 + sr * 16.10 - t * 4.84 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 2.57 + time * 1.03) * p;
	p = rot2(p.y * 2.09 + time * 0.75) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.55);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.45 + time * 0.25, vec3(0.50, 0.52, 0.50), vec3(0.43, 0.41, 0.35), vec3(1.04, 0.71, 1.32), vec3(0.40, 0.60, 0.04));
	col = clamp((col - 0.5) * 1.83 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
