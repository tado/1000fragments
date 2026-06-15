uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.27 + sr * 4.24 - t * 2.90 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.22 * sin(mf + 3.0) + ph), cos(t * 1.22 * cos(mf + 3.0) + ph));
        ms += 0.078 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.93;
	p += vec2(0.54, -0.37) * sin(length(p) * 5.84 - time * 1.83) * 0.17;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.20);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.54 + time * 0.23, vec3(0.43, 0.41, 0.59), vec3(0.41, 0.36, 0.35), vec3(1.32, 1.37, 1.36), vec3(0.99, 0.17, 0.84));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
