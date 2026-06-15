uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 17.44 - t * 7.66 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 26.23 - t * 7.66 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.19, 0.46) * sin(length(p) * 5.27 - time * 1.94) * 0.36;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.12; p = rot2(1.70) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.26, vec3(0.58, 0.52, 0.51), vec3(0.33, 0.40, 0.35), vec3(0.98, 1.22, 1.38), vec3(0.28, 0.02, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
