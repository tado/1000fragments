uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.74 - t * 5.84 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.63 * sin(mf + 3.0) + ph), cos(t * 1.63 * cos(mf + 3.0) + ph));
        ms += 0.038 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.26;
	p = rot2(2.48) * p;
	p += vec2(-0.52, -0.20) * sin(length(p) * 2.62 - time * 1.26) * 0.36;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.87);
	float d = d1 * d2;
	vec3 col = palette(d * 0.59 + time * 0.23, vec3(0.48, 0.57, 0.40), vec3(0.50, 0.44, 0.50), vec3(1.25, 1.04, 0.74), vec3(0.28, 0.03, 0.84));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
