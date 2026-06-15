uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.53 * sin(mf + 3.0) + ph), cos(t * 0.53 * cos(mf + 3.0) + ph));
        ms += 0.041 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.45 + sr * 13.76 - t * 4.30 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.44;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 2.00);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.44 + time * 0.09, vec3(0.56, 0.53, 0.49), vec3(0.37, 0.43, 0.37), vec3(0.98, 0.82, 1.27), vec3(0.97, 0.25, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
