uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.44, 0.0)) * 22.16 - t * 3.22 + ph);
    float mb = sin(length(p + vec2(0.44, 0.0)) * 8.64 - t * 3.22 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.78;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.51; p = rot2(0.40) * p; }
	p = rot2(length(p) * 1.91 + time * 0.61) * p;
	p = rot2(1.50) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.19, vec3(0.59, 0.51, 0.50), vec3(0.34, 0.33, 0.32), vec3(1.18, 1.07, 1.23), vec3(0.26, 0.99, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
