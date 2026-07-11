uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.08 + sin(p.y * 5.71 + t * 4.43) * 3.08 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.79 * sin(mf + 3.0) + ph), cos(t * 1.79 * cos(mf + 3.0) + ph));
        ms += 0.040 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.29);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.86 + time * 0.29, vec3(0.50, 0.60, 0.56), vec3(0.31, 0.37, 0.36), vec3(1.14, 0.82, 1.36), vec3(0.97, 0.61, 0.82));
	col = fract(col * 1.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
