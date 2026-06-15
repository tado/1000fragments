uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.97 * sin(mf + 3.0) + ph), cos(t * 1.97 * cos(mf + 3.0) + ph));
        ms += 0.025 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.13 + sr * 17.31 - t * 2.32 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.41;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.45);
	float d = d1 + d2;
	vec3 col = palette(d * 0.56 + time * 0.27, vec3(0.59, 0.58, 0.46), vec3(0.41, 0.47, 0.43), vec3(1.24, 1.29, 1.39), vec3(0.49, 0.72, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
