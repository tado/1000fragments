uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.86 + sin(p.y * 4.57 + t * 1.62) * 4.30 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 28.54 - t * 7.87 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 18.22 - t * 7.96 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.29; q2 = rot2(0.73) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.60);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 1.12 + time * 0.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
