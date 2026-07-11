uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.33 + sin(p.y * 3.00 + t * 0.93) * 4.78 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.17 * sin(mf + 3.0) + ph), cos(t * 2.17 * cos(mf + 3.0) + ph));
        ms += 0.093 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.81;
	{ p = vec2(atan(p.y, p.x) * 1.75, length(p) * 3.18 - time * 0.39); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.84);
	float d = d1 * d2;
	vec3 col = palette(d * 1.76 + time * 0.29, vec3(0.59, 0.42, 0.51), vec3(0.34, 0.34, 0.33), vec3(1.05, 1.05, 1.11), vec3(0.56, 0.62, 0.70));
	col = mod(col * 1.64, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
