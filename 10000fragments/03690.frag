uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.27 + vec2(t * 1.11, -t * 1.11) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.84 * sin(mf + 3.0) + ph), cos(t * 0.84 * cos(mf + 3.0) + ph));
        ms += 0.084 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.89;
	p *= 1.68;
	p = abs(p) - 0.78;
	{ float fr = length(p); p *= 1.0 + 0.43 * fr * fr; }
	p += vec2(-0.78, 0.34) * sin(length(p) * 2.42 - time * 1.27) * 0.30;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.91);
	float d = d1 * d2;
	vec3 col = palette(d * 1.53 + time * 0.16, vec3(0.52, 0.41, 0.41), vec3(0.45, 0.43, 0.36), vec3(1.21, 1.19, 0.71), vec3(0.63, 0.30, 0.76));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
