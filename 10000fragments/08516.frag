uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.53, 0.0)) * 29.09 - t * 6.91 + ph);
    float mb = sin(length(p + vec2(0.53, 0.0)) * 15.36 - t * 6.91 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.97 * sin(mf + 3.0) + ph), cos(t * 0.97 * cos(mf + 3.0) + ph));
        ms += 0.055 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.40;
	p = rot2(time * 0.81) * p;
	{ float fr = length(p); p *= 1.0 + -0.43 * fr * fr; }
	p += vec2(-0.12, 0.56) * sin(length(p) * 4.98 - time * 1.58) * 0.20;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.87);
	float d = d1 + d2;
	vec3 col = palette(d * 1.14 + time * 0.08, vec3(0.48, 0.58, 0.41), vec3(0.50, 0.42, 0.37), vec3(0.70, 0.83, 1.25), vec3(0.63, 0.02, 0.42));
	col = fract(col * 1.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
