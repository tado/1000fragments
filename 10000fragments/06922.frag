uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.29, t * 0.48 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 33.30 - t * 3.99 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 10.37 - t * 3.99 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.05) - 0.5;
	p = rot2(time * 1.07) * p;
	p = rot2(length(p) * -3.75 + time * 1.03) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.65);
	float d = d1 * d2;
	vec3 col = palette(d * 0.56 + time * 0.02, vec3(0.42, 0.55, 0.54), vec3(0.32, 0.47, 0.43), vec3(0.81, 0.90, 1.14), vec3(0.21, 0.24, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
