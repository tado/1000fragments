uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 4.02 * sin(t * 0.78) + t * 5.60 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.99 * sin(mf + 3.0) + ph), cos(t * 1.02 * cos(mf + 3.0) + ph));
        ms += 0.045 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.56;
	p *= 1.87;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.32);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.62 + time * 0.12, vec3(0.42, 0.55, 0.59), vec3(0.32, 0.39, 0.48), vec3(0.74, 1.08, 0.87), vec3(0.20, 0.41, 0.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
