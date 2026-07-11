uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.79 - t * 3.41 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.06 * sin(mf + 3.0) + ph), cos(t * 2.06 * cos(mf + 3.0) + ph));
        ms += 0.081 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.21;
	p = fract(p * 1.04) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.53, length(p) * 3.50 - time * 0.41); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.95);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.21 + time * 0.09, vec3(0.43, 0.45, 0.52), vec3(0.33, 0.40, 0.46), vec3(0.91, 1.07, 0.80), vec3(0.55, 0.42, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
