uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 23.64 - t * 7.25 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 35.83 - t * 7.25 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.78;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.46; p = rot2(1.94) * p; }
	p = rot2(2.62) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.22, vec3(0.55, 0.49, 0.46), vec3(0.33, 0.41, 0.40), vec3(0.72, 0.71, 1.10), vec3(0.92, 0.96, 0.85));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
