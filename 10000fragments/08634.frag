uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.39 * sin(mf + 3.0) + ph), cos(t * 2.39 * cos(mf + 3.0) + ph));
        ms += 0.043 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.91 - t * 1.97 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.87);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.10 + time * 0.01, vec3(0.50, 0.49, 0.53), vec3(0.42, 0.46, 0.39), vec3(0.88, 0.87, 1.00), vec3(0.83, 0.44, 0.77));
	col = fract(col * 1.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
