uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.32 + vec2(t * 2.10, -t * 2.10) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.91;
	p *= 3.25;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.56; p = rot2(0.86) * p; }
	p += vec2(-0.46, -0.51) * sin(length(p) * 2.57 - time * 0.80) * 0.26;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.91 + time * 0.11, vec3(0.55, 0.48, 0.51), vec3(0.44, 0.40, 0.47), vec3(1.36, 1.12, 0.73), vec3(0.58, 0.55, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
