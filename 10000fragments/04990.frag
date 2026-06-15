uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.66 * sin(mf + 3.0) + ph), cos(t * 0.66 * cos(mf + 3.0) + ph));
        ms += 0.062 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.66 + t * 0.81 + ph) + sin(p.y * 2.13 - t * 1.66 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.18;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.67);
	float d = d1 + d2;
	vec3 col = palette(d * 0.58 + time * 0.28, vec3(0.43, 0.45, 0.42), vec3(0.43, 0.38, 0.49), vec3(1.23, 0.97, 1.39), vec3(0.32, 0.80, 0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
